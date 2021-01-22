import React, {Component} from 'react';
import axios from 'axios';
import Navbar from '../templates/Navbar';

export default class Home extends Component {


    render() {
        return (
            <div>
                <Navbar/>
            <h1>For starting the app you have to register bro!</h1>
           </div>
        )
    }
}