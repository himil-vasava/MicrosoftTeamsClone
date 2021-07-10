import React, { useState, useRef, useEffect } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import io from "socket.io-client";
import axios from "axios";
import "./CreateRoom.css";
import Navbar from "../components/Navbar/Navbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SendIcon from "@material-ui/icons/Send";

const CreateRoom = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const socketRef = useRef();
  const [chat, setChat] = useState([]);
  var teamId = props.match.params.teamId;
  var pageNumber = 5;

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.emit("Team", { teamId });

    //If a message is received then display on the screen
    socketRef.current.on("chatMessage", (data) => {
      console.log(data, user);
      let el = document.createElement("LI");
      if (data.name != user.result.name) {
        el.className = "message left";
        el.innerHTML = `<strong>${data.name} </strong>: ${data.message}`;
      } else {
        el.className = "message right";
        el.innerHTML = `${data.message}`;
      }
      let parent = document.getElementById("Wise");
      parent.appendChild(el);
    });

    //If user is logged in then get the chats corresponding to the team
    if (user) {
      var config = {
        method: "post",
        url: `https://calm-savannah-53647.herokuapp.com/teams/getChat`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          teamId,
          pageNumber,
        }),
      };
      axios(config)
        .then((res) => {
          var arr = res.data.result;

          setChat(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function SendMessage() {
    var message = document.getElementById("message").value;
    var name = user.result.name;

    //Message emitted after the user clicked the send button
    socketRef.current.emit("teamchat", { message, name, teamId });

    document.getElementById("message").value = "";

    var config = {
      method: "post",
      url: `https://calm-savannah-53647.herokuapp.com/teams/chatMessage`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        teamId,
        name,
        message,
      }),
    };

    axios(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Send email for invite to join the team
  function Invite() {
    var email = document.getElementById("invite").value;

    console.log(email);

    socketRef.current.emit("teamInvite", { email, teamId });

    document.getElementById("invite").value = "";
  }

  return (
    <div>
      {user ? (
        <div>
          <Navbar room="true" />
          <div style={{ display: "flex", marginLeft: 10 }}>
            <div>
              <TextField
                type="email"
                id="invite"
                placeholder="Invite by email"
                style={{ backgroundColor: "#fff", paddingLeft: 10 }}
              />
              {/* <input type="email" id="invite"></input> */}
              <button onClick={Invite}>
                <PersonAddIcon />
              </button>
            </div>
          </div>
          <div className="chat-container chat-rep">
            <ul className="chat">
              {chat.map((item) => {
                if (item.sender == user.result.name) {
                  return (
                    <li className="message right">
                      <p>{item.message}</p>
                    </li>
                  );
                } else {
                  return (
                    <li className="message left">
                      <p>
                        <strong>{item.sender}</strong> : {item.message}
                      </p>
                    </li>
                  );
                }
              })}
            </ul>
            <ul className="chat" id="Wise">
              {/* <li className="message right">
                            <p id="messages"></p>
                        </li> */}
            </ul>
          </div>
          <div id="chat" style={{ display: "flex" }}>
            <textarea
              id="message"
              placeholder="Message"
              className="text_input"
              cols="100"
              autoFocus
            />
            <button onClick={SendMessage} id="send">
              <SendIcon />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please Login to continue</p>
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
