import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import Home from './components/Common/Home'
import Navbar from './components/templates/Navbar'
import RecRegister from './components/recregister'
import AppRegister from './components/appregister'
import Login from './components/login'
import AppProfile from './components/applicantprofile'
import EditAppProfile from './components/editappprofile'

function App() {
  return (
    <Router>
      <div className="container">
        
        
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/appprofile" component={AppProfile}/>
        <Route path="/recregister" component={RecRegister}/>
        <Route path="/applicantregister" component={AppRegister}/>
        <Route path="/editappprofile" component={EditAppProfile}/>

      </div>
    </Router>
  );
}

export default App;
