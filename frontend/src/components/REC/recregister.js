import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/Navbar';

export default class CreateRec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      bio:""
    };

    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangebio = this.onChangebio.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangename(event) {
    this.setState({ name: event.target.value });
  }
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeemail(event) {
    this.setState({ email: event.target.value });
  }
  onChangephone(event) {
    this.setState({ phone: event.target.value });
  }
  onChangebio(event) {
    this.setState({ bio: event.target.value });
  }
  

  onSubmit(e) {
    console.log("insubmit loki vachindi bro");
    e.preventDefault();
    const newRec = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      bio:this.state.bio
    };
    if(newRec.name && newRec.email && newRec.phone && newRec.password && newRec.bio){
    let str = "http://localhost:4000/rec/register";
    axios.post(str, newRec).then(res => {
      console.log(res.data);
      if (res.data.error) {
        alert("Already existed ");
      }
      else alert("Created sucessfully, please login now ");
    });}
    else alert("empty fileds asshole !!!!!!")
    this.setState({
      name: "",
      email: "",
      phone: "",
      password: "",
      bio:""
    });
  }

  render() {
    return (
      <div className="container">
        <Navbar/>
        <p>This is the Form Creating a new recruiter</p>
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
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
            <label>Phone Number: </label>
            <input
              type="Number"
              min="1000000000"
              max="9999999999"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangephone}
            />
          </div>
          <div className="form-group">
            <label>BIO: </label>
            <input
              type="Text"
              maxLength="1000"
              className="form-control"
              value={this.state.bio}
              onChange={this.onChangebio}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create Recruiter"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
