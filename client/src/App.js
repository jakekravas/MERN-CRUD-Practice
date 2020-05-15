import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './Bootstrap.css';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container">
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/signup" component = {SignUp}/>
          <Route exact path = "/signin" component = {SignIn}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;