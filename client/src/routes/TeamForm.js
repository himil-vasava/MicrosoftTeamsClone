import React, {useState} from 'react';
import { v1 as uuid } from "uuid";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const TeamForm = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    function handleSubmit(e){
        e.preventDefault();
        const teamId = uuid();

        props.history.push(`/teams/${teamId}`);

        const teamName = document.getElementById('teamName').value;
        var array = [];
        array.push(user.result.email);

        var config = {
            method: 'post',
            url: `http://localhost:8000/teams/createTeam`,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                id: teamId,
                teamName,
                array,
                email: user.result.email,
            }),
        }
        console.log(config);
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
            <form onSubmit={handleSubmit}>
                <input type="text" id="teamName" name="teamName"></input>
                <button type="submit">Create Team</button>
            </form>
        </div>
    )
}

export default TeamForm;