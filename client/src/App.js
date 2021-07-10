import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth/Auth";
import CreateRoom from "./routes/CreateRoom";
import Home from "./routes/Home";
import JoinTeam from "./routes/JoinTeam";
import Room from "./routes/Room";
import TeamForm from "./routes/TeamForm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/teams/:teamId" exact component={CreateRoom} />
        <Route path="/createteam" exact component={TeamForm} />
        <Route path="/jointeam" exact component={JoinTeam} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
