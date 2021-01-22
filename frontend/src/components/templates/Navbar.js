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
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/recregister" className="nav-link">REG-REC</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/applicantregister" className="nav-link">REG-APP</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}