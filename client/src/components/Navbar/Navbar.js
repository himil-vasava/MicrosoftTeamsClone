import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import { v1 as uuid } from "uuid";
import "./Navbar.css";
import LockIcon from "@material-ui/icons/Lock";

function Navbar({ room }) {
  const [inputSearch, setInputSearch] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    window.location.reload();

    setUser(null);
  };

  function create() {
    const id = uuid();
    const wind = window.open(`/room/${id}`, "_blank");
    wind.focus();
    //props.history.push(`/room/${id}`);
  }
  return (
    <div className="header">
      <div className="header_left">
        <Link to="/">
          <img
            className="header_logo"
            src="/assets/Capture10-removebg-preview.png"
            alt=""
            style={{ height: "40px" }}
          />
        </Link>
      </div>
      {!room ? (
        <div className="header_center">
          <input
            type="text"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
          />
          <Link to={`serach/${inputSearch}`}>
            <SearchIcon className="header_searchbutton" />
          </Link>
        </div>
      ) : null}
      <div className="header_right account">
        <Button onClick={create}>
          <VideoCallIcon />
        </Button>
        <Avatar alt={user.result.name} src={user.result.imageUrl}>
          {user.result.name.charAt(0)}
        </Avatar>
        <Button onClick={logout}>
          <LockIcon />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
