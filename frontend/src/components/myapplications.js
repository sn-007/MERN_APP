import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './templates/applicantnavbar';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';





export default class MyApplications extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      data:[]
    };

    this.onChangedata = this.onChangedata.bind(this);
    
  }

  onChangedata(event) {this.setState({ name: event.target.value });}
  

  async componentDidMount()
  {
    var email=localStorage.getItem("email");
    const obj={"email":email};
    var str="http://localhost:4000/myapps"
    var res=await axios.post(str,obj);
    this.setState({data:res.data});
    
  }
  
  render() {

    return (
      <div className="container">
          <Navbar/>
        
        <div>
        {this.state.data.map(function(d, idx)
        {
         return (
            <ol> <h3 key={idx}>
                <ul>title: {d.title}</ul>
                <ul>salary:{d.salary} </ul>
                <ul>Recruiter Name:{d.rec_name}</ul>
                <ul>Status:{d.status}</ul>
                </h3>
            </ol>
        )

       })}
        </div>
      </div>
    );
  }
}
