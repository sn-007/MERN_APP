import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/Navbar';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      
    };

    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeemail(event) {
    this.setState({ email: event.target.value });
  }

  componentDidMount() {
    localStorage.removeItem("name");
    localStorage.removeItem("title");
    localStorage.removeItem("bio");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("usertype");

  }
  
  

 async onSubmit(e) {
    
    e.preventDefault();
    const newLogin = {
      email: this.state.email,
      password: this.state.password
      
    };
    if(newLogin.email &&  newLogin.password)
    {
      let str = "http://localhost:4000/login";
      let res= await  axios.post(str, newLogin);

      if (res.data.error) 
      {
        alert("Wrong password or invalid email");
        this.props.history.push(`/login`);
        return;
        
      }
      else 
      {
          //alert("loginsucess");
          var usertype= await res.data.usertype.toString();                        
          var email = await res.data.email.toString();
          console.log("__________");

            console.log("came");
            localStorage.setItem("usertype", usertype);
            localStorage.setItem("email", email);
            console.log("setted");   
            
            
            }
      
        //localStorage.removeItem("usertype");
        //localStorage.removeItem("email");
        const ut=localStorage.getItem("usertype");
        const em=localStorage.getItem("email");
        console.log(em);
        console.log(ut);
        
        
          console.log("+++++++++++");
          //return <Redirect to='/appprofile'  />;
          if(ut==='1')
          this.props.history.push(`/appprofile`);
          else if(ut==='0')
          this.props.history.push(`/recprofile`);
          else this.props.history.push(`/login`);

        
    }

    else alert("empty fileds asshole !!!!!!")
    this.setState({
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar/>
        
        <form onSubmit={this.onSubmit}>
        
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeemail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
