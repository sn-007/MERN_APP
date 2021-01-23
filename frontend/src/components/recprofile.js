import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './templates/recnavbar';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';





export default class RecProfile extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone:"",
      bio:""
    };

    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangebio = this.onChangebio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangename(event) {this.setState({ name: event.target.value });}
  onChangeemail(event) {this.setState({ email: event.target.value });}
  onChangephone(event) {this.setState({ phone: event.target.value });}
  onChangebio(event) {this.setState({ bio: event.target.value });}

  onSubmit(e)
  {
    e.preventDefault();
    this.props.history.push("/editrecprofile")

  }


  async componentDidMount()
  {
    var email=localStorage.getItem("email");
    //console.log(email);
    const obj={"email":email};
    var str="http://localhost:4000/recprofile"
    var res=await axios.post(str,obj);
    this.setState({
      name:res.data.name,
      email:email,
      phone:res.data.phone,
      bio:res.data.bio
    });
    
  }
  

 
  render() {

    
    

    return (
      <div className="container">
          <Navbar/>
          {/*<li><h5>Name:   {this.state.name}</h5></li>
          <li><h5>Email       :   {this.state.email}</h5></li>
          <li><h5>Phone      :   {this.state.phone}</h5></li>
          <li><h5>Bio      :   {this.state.bio}</h5></li>*/}

          <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Bio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>{this.state.name}</td>
              <td>{this.state.email}</td>
              <td>{this.state.phone}</td>
              <td>{this.state.bio}</td>
            </tr>
            
          </tbody>
        </table>
          
      <button  class="btn btn-warning" onClick={this.onSubmit} >UpdateProfile</button>
      </div>
    );
  }
}
