import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from './routes/Auth/Auth';
import CreateRoom from "./routes/CreateRoom";
import Home from './routes/Home';
import Room from "./routes/Room";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/create" exact component = {CreateRoom} />
        <Route path="/room/:roomID" component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;