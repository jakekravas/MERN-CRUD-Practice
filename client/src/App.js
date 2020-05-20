import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AddNote from './components/pages/AddNote';
import PrivateRoute from "./components/routing/PrivateRoutes";

import AuthState from "./context/auth/AuthState";
import NoteState from "./context/notes/NoteState";
import setAuthToken from './utils/setAuthToken';

import './Bootstrap.css';
import './App.css';

if (localStorage.token){  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <NoteState>
        <Router>
          <Fragment>
            <Navbar/>
            <div className="container">
              <Switch>
                <PrivateRoute exact path = "/" component = {Home}/>
                <Route exact path = "/signup" component = {SignUp}/>
                <Route exact path = "/signin" component = {SignIn}/>
                <PrivateRoute exact path = "/addnote" component = {AddNote}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;