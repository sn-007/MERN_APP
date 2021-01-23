import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './templates/Navbar';

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
    /*console.log("+++++++++++");
    console.log(localStorage.getItem("email"));
    console.log(localStorage.getItem("usertype"));
    
    if (localStorage.getItem("usertype") === 1 && localStorage.getItem("email")) this.props.history.push("/applicant");
    else if (localStorage.getItem("usertype") === 0 && localStorage.getItem("email")) 
    {
      console.log("dsas");
      this.props.history.push("/rec");
    } 
    else 
    {
      console.log("rtlogin");
      this.props.history.push("/login");
    }*/
  }
  
  

 async onSubmit(e) {
    
    e.preventDefault();
    const newLogin = {
      email: this.state.email,
      password: this.state.password
      
    };
    if(newLogin.email &&  newLogin.password){
    let str = "http://localhost:4000/login";
     let res= await  axios.post(str, newLogin);

      if (res.data.error) {
        alert("Wrong password or invalid email");
      }
      else 
      {
          alert("loginsucess");
          var usertype= await res.data.usertype.toString();                        
          var email = await res.data.email.toString();
          console.log("__________");

            console.log("came");
            localStorage.setItem("usertype", usertype);
            localStorage.setItem("email", email);
            console.log("setted");   
            if (localStorage.getItem("usertype") === 1 && localStorage.getItem("email")) this.props.history.push("/recregister");
      }
        console.log("+++++++++++");
        //localStorage.removeItem("usertype");
        //localStorage.removeItem("email");

        console.log(localStorage.getItem("email"));
        console.log(localStorage.getItem("usertype"));
        

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
