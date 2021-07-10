import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./Room.css";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { TextField, Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SendIcon from "@material-ui/icons/Send";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video className="styled" playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomId = props.match.params.roomId;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        //console.log(roomId);
        socketRef.current.emit("join room", roomId);
        //Receive data of all users from the server and then add them to the array
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userId,
              peer,
            });
            peers.push({
              peerID: userId,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const Obj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, Obj]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        //The peer is destroyed or deleted from the array and thus removed from the room
        socketRef.current.on("user left", (id) => {
          const Obj = peersRef.current.find((p) => p.peerID === id);
          if (Obj) {
            Obj.peer.destroy();
          }

          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });

    //Listening to the chat event thus receiving and the rendering the message
    socketRef.current.on("connect", () => {
      socketRef.current.on("chat", (data) => {
        console.log(user);
        document.getElementById("messages").textContent +=
          data.name + ":" + data.message + "\n";
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    //After receiving the signal, it is returned back
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  //Close the tab on exit
  function Exit() {
    window.close();
  }

  //If audio track enabled then disable it and vice versa
  function Mute() {
    userVideo.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
  }

  //If video track enabled then disable it and vice versa
  function VideoOn() {
    userVideo.current.srcObject
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
  }

  function SendMessage() {
    var message = document.getElementById("message").value;
    var name = user.result.name;

    //Message emitted after the user clicked the send button
    socketRef.current.emit("chat", { message, name });

    document.getElementById("message").value = "";
  }

  //Send an email to invite a user to join the meeting
  function Invite() {
    var email = document.getElementById("invite").value;
    var link = window.location.href;

    console.log(email);

    //Meeting Link shared on the email entered
    socketRef.current.emit("meet", { email, link });

    document.getElementById("invite").value = "";
  }

  return (
    <div className="main">
      <div className="main__left">
        <div className="container">
          <video
            className="styled"
            muted
            ref={userVideo}
            autoPlay
            playsInline
          />
          {peers.map((peer) => {
            return <Video key={peer.peerID} peer={peer.peer} />;
          })}
        </div>

        <div className="main__controls">
          <div className="main__controls__block">
            <button
              onClick={Mute}
              type="button"
              className="main__controls__button main__mute_button volume"
            >
              <VolumeOffIcon />
            </button>
            <button
              onClick={VideoOn}
              type="button"
              className="main__controls__button main__video_button volume"
            >
              <VideocamOffIcon />
            </button>
          </div>
          <div>
            <div className="main__controls__block">
              <TextField
                type="email"
                placeholder="Invite by email"
                variant="outlined"
                style={{ backgroundColor: "#fff" }}
                id="invite"
              />
              {/* <input type="email" id="invite"></input> */}
              <button
                onClick={Invite}
                className="main__controls__button volume"
              >
                <PersonAddIcon />
              </button>
              {/* <button onClick={Invite}>Invite</button> */}
            </div>
          </div>
          <div className="main__controls__block">
            <button
              onClick={Exit}
              type="button"
              className="main__controls__button leave_meeting volume"
            >
              <ExitToAppIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="main__right" style={{ maxWidth: "20%" }}>
        <div className="main__header">
          <h5>Chat</h5>
        </div>
        <div id="chat">
          <div className="main__chat_window">
            <pre id="messages" className="messages"></pre>
          </div>
          <div>
            <div
              className="main__message_container"
              style={{ position: "fixed", top: 665 }}
            >
              <textarea
                id="message"
                placeholder="Message"
                cols="30"
                style={{ padding: 5 }}
              />
              <button onClick={SendMessage} id="send">
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
