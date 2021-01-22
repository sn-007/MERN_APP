import React, {Component} from 'react';
import axios from 'axios';

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            For starting the app you have to register bro!
           </div>
        )
    }
}