import React, {useState} from 'react';
import axios from 'axios';

const JoinTeam = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    function handleSubmit(e){
        e.preventDefault();

        var teamId = document.getElementById('teamId').value;
        var email = user.result.email;

        var config = {
            method: 'post',
            url: `https://calm-savannah-53647.herokuapp.com/teams/joinTeam`,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                teamId,
                email
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

        document.getElementById('teamId').value = '';

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" id="teamId"></input>
                <button type="submit">Join Team</button>
            </form>
        </div>
    )
}

export default JoinTeam;