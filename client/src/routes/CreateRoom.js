import React, {useState, useRef, useEffect} from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import io from "socket.io-client";
import axios from 'axios';

const CreateRoom = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const socketRef = useRef();
    var teamId = props.match.params.teamId;

    useEffect(() => {
        socketRef.current = io.connect("/");

        socketRef.current.emit("Team", {teamId});

        socketRef.current.on("chatMessage", (data) => {
            document.getElementById('messages').textContent += data.name + ':' + data.message + '\n';
        })
    })

    function create() {
        const id = uuid();
        const wind = window.open(`/room/${id}`, "_blank");
        wind.focus();
        //props.history.push(`/room/${id}`);
    }

    function SendMessage(){
        var message = document.getElementById('message').value;
        var name = user.result.name;

        //Message emitted after the user clicked the send button
        socketRef.current.emit("teamchat", {message, name, teamId});

        document.getElementById('message').value = '';

        var config = {
            method: 'post',
            url: `https://calm-savannah-53647.herokuapp.com/teams/chatMessage`,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                teamId,
                name,
                message
            }),
        }
        
        axios(config)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
        {user?(
            <div>
                <Button component={Link} to="/" variant="contained" color="primary">Home</Button>
                <button onClick={create}>Create room</button>
                <div id="chat">
                    <pre id="messages"></pre>
                    <textarea id="message" placeholder="Message" />
                    <button onClick={SendMessage} id="send">Send</button>
                </div>
            </div>
        ):
        (
        <div>
            <p>Please Login to continue</p>
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        </div>
        )
        }
        </div>
    );
};

export default CreateRoom;