import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                   
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/recprofile" className="nav-link">Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/myjobs" className="nav-link">My Jobs</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/newjob" className="nav-link">NewJOB</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/workers" className="nav-link">My Employees</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Logout</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}