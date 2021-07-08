import React, { useState, useEffect } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Toolbar, Button, Typography, Avatar} from '@material-ui/core';
import decode from 'jwt-decode';
import axios from 'axios';
import Intro from '../components/Intro/Intro';
import SideBar from '../components/SideBar/SideBar';
import Card from '../components/Card/Card.js';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [teams, setTeams] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});

        history.push('/');

        setUser(null);
    };

    useEffect(() => {
        const token =  user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp*1000<new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

        if(user){
            var config = {
                method: 'post',
                url: `https://calm-savannah-53647.herokuapp.com/teams/getTeam`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    email: user.result.email,
                }),
            }
            axios(config)
                .then((res) => {
                    //console.log(res);
                    setTeams(res.data.result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [location])

    return(
        <div>
                {user?(
                    <div>
                        {/* <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography>{user.result.name}</Typography> */}
                        <Button component={Link} to="/createteam" variant="contained" color="primary">Create Team </Button>
                        <Button component={Link} to="/jointeam" variant="contained" color="primary">Join Team</Button>
                        <Button variant="contained" color="secondary" onClick={logout} >Logout</Button>
                        <div style={{display:'flex'}}>
                            <SideBar teams={teams} />

                            <div style={{display:'flex'}}>
                                {teams.map((team) => {
                                    var url = `/teams/${team.teamId}`
                                    return (
                                        <div>
                                            <a href={url} style={{textDecoration: 'none',  color:'inherit'}}>
                                                <Card name={team.name} key={team.teamId} url={url}/>
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ):(
                    <div>        
                        {/* <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button> */}
                        <Intro />
                    </div>
                )

                }
        </div>
    )
}

export default Home