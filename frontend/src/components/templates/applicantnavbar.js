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
                                <Link to="/appprofile" className="nav-link">Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recregister" className="nav-link">My applications</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/applicantregister" className="nav-link">Jobs</Link>
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