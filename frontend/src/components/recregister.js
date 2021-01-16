import React, { Component } from "react";
import axios from "axios";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "@material-ui/core/Radio";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class CreateRec extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
    };

    this.onChangename = this.onChangename.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangename(event) {
    this.setState({ name: event.target.value });
  }
  onChangepassword(event) {
    this.setState({ password: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  onChangephone(event) {
    this.setState({ phone: event.target.value });
  }
  componentDidMount() {
}

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.type);
    const newRec = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
    };
    let str = "http://localhost:5000/user/rec/register";
    axios.post(str, newRec).then(res => {
      console.log(res.data);
      if (res.data.error) {
        alert("Already existed or Empty fields ");
      }
    });
    this.setState({
      name: "",
      email: "",
      phone: "",
      password: ""
    });
  }

  render() {
    return (
      <div className="container">
        
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
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="type"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number: </label>
            <input
              type="Number"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangephone}
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
