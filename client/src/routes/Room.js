import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import './Room.css';

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video className="styled" playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomId = props.match.params.roomId;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            //console.log(roomId);
            socketRef.current.emit("join room", roomId);
            //Receive data of all users from the server and then add them to the array
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userId => {
                    const peer = createPeer(userId, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userId,
                        peer,
                    })
                    peers.push({
                        peerID: userId,
                        peer
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const Obj = {
                    peer, 
                    peerID: payload.callerID
                }

                setPeers(users => [...users, Obj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
            
            //The peer is destroyed or deleted from the array and thus removed from the room
            socketRef.current.on("user left", id => {
                const Obj = peersRef.current.find(p => p.peerID===id);
                if(Obj){
                    Obj.peer.destroy();
                }

                const peers = peersRef.current.filter(p => p.peerID!==id);
                peersRef.current = peers;
                setPeers(peers);
            });
        })

        //Listening to the chat event thus receiving and the rendering the message
        socketRef.current.on("connect", () => {
            socketRef.current.on("chat", (data) => {
                console.log(user);
                document.getElementById('messages').textContent += data.name + ':' + data.message + '\n';
            })
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        //After receiving the signal, it is returned back
        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function Exit(){
        window.close();
    }

    function Mute(){
        userVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = !track.enabled);
    }

    function VideoOn(){
        userVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = !track.enabled);
    }

    function SendMessage(){
        var message = document.getElementById('message').value;
        var name = user.result.name;

        //Message emitted after the user clicked the send button
        socketRef.current.emit("chat", {message, name});

        document.getElementById('message').value = '';
    }

    function Invite(){
        var email = document.getElementById('invite').value;
        var link = window.location.href;

        console.log(email);

        socketRef.current.emit("meet", {email, link});

        document.getElementById('invite').value = '';
    }

    return (
        <div>
            <div className="container">
                <video className ="styled" muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer) => {
                    return (
                        <Video key={peer.peerID} peer={peer.peer} />
                    );
                })}
            </div>
            <div id="chat">
                <pre id="messages"></pre>
                <textarea id="message" placeholder="Message" />
                <button onClick={SendMessage} id="send">Send</button>
            </div>
            <div>
                <input type="email" id="invite"></input>
                <button onClick={Invite}>Invite</button>
            </div>
            <button onClick={Mute} type="button" className="buttons">MUTE</button>
            <button onClick={VideoOn} type="button" className="buttons">VIDEO</button>
            <button onClick={Exit} type="button" className="buttons">EXIT</button>
        </div>
    );
};

export default Room;