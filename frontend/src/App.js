import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Users/Profile'
import RecRegister from './components/recregister'
import AppRegister from './components/appregister'
import Login from './components/login'

function App() {
  return (
    <Router>
      <div className="container">
        
        
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/recregister" component={RecRegister}/>
        <Route path="/applicantregister" component={AppRegister}/>
      </div>
    </Router>
  );
}

export default App;
