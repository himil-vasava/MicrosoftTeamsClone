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

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomId);
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

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div className="container">
            <video className ="styled" muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
        </div>
    );
};

export default Room;