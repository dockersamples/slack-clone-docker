import React, { useState } from "react";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import Chat from "./component/Chat";
import Login from "./component/Login";
import { useStateValue } from "./stateProvider.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(false);
  return (
    // BEM naming convention
    <div className="App">
      <BrowserRouter>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <SideBar user={user} />

              <Switch>
                <Route path="/room/:roomID">
                  <Chat user={user} />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
