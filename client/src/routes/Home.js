import React, { useState, useEffect } from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Toolbar, Button, Typography, Avatar} from '@material-ui/core';
import decode from 'jwt-decode';

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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
    }, [location])

    return(
        <div>
            <Toolbar>
                {user?(
                    <div>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography>{user.result.name}</Typography>
                        <Button component={Link} to="/create" variant="contained" color="primary">Start Meeting </Button>
                        <Button variant="contained" color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ):(
                    <div>        
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    </div>
                )

                }
            </Toolbar>
        </div>
    )
}

export default Home