import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


import Home from './components/templates/Home'
import RecRegister from './components/REC/recregister'
import AppRegister from './components/APPLICANT/appregister'
import Login from './components/Users/login'
import AppProfile from './components/APPLICANT/applicantprofile'
import EditAppProfile from './components/APPLICANT/editappprofile'
import MyApplications from './components/APPLICANT/myapplications'
import Jobslist from "./components/APPLICANT/joblistings"
import RecProfile from "./components/REC/recprofile"
import EditRecProfile from "./components/REC/editrecprofile"


function App() {
  return (
    <Router>
      <div className="container">
        
        
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/appprofile" component={AppProfile}/>
        <Route path="/recprofile" component={RecProfile}/>
        <Route path="/recregister" component={RecRegister}/>
        <Route path="/applicantregister" component={AppRegister}/>
        <Route path="/editappprofile" component={EditAppProfile}/>
        <Route path="/editrecprofile" component={EditRecProfile}/>
        <Route path="/myapps" component={MyApplications}/>
        <Route path="/listjobs" component={Jobslist}/>


      </div>
    </Router>
  );
}

export default App;
