import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/applicantnavbar'
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';





export default class AppProfile extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      education:[],
      skillset:[],
    };

    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangeeducation = this.onChangeeducation.bind(this);
    this.onChangeskillset = this.onChangeskillset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangename(event) {this.setState({ name: event.target.value });}
  onChangeemail(event) {this.setState({ email: event.target.value });}
  onChangeeducation(event) {this.setState({ education: event.target.value });}
  onChangeskillset(event) {this.setState({ skillset: event.target.value });}

  onSubmit(e)
  {
    e.preventDefault();
    this.props.history.push("/editappprofile")

  }


  async componentDidMount()
  {
    var email=localStorage.getItem("email");
    //console.log(email);
    const obj={"email":email};
    var str="http://localhost:4000/applicantprofile"
    var res=await axios.post(str,obj);
    this.setState({
      name:res.data.name,
      email:email,
      education:res.data.education,
      skillset:res.data.skillset
    });
    
  }
  

 
  render() {

    
    

    return (
      <div className="container">
          <Navbar/>
          <li><h5>Name:   {this.state.name}</h5></li>
          <li><h5>Email       :   {this.state.email}</h5></li>
          <li><h5>Skills      :   {this.state.skillset}</h5></li>
          <h4>Education Details</h4>
          <div>
        {this.state.education.map(function(d, idx){
         return (<li><h6 key={idx}>{d.instiname}, from {d.startyear} to {d.endyear}</h6></li>)
       })}
        </div>
      <button  class="btn btn-warning" onClick={this.onSubmit} >UpdateProfile</button>
      </div>
    );
  }
}
