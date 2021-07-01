import React, {useState} from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const CreateRoom = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    function create() {
        const id = uuid();
        const wind = window.open(`/room/${id}`, "_blank");
        wind.focus();
    }

    return (
        <div>
        {user?(
        <button onClick={create}>Create room</button>
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