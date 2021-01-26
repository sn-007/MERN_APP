import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/Navbar';

export default class CreateApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      education:[],
      skillset:[],
      instiname:"",
      startyear:"",
      endyear:"",
      skill:""
    };

    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangeeducation = this.onChangeeducation.bind(this);
    this.onChangeinstiname = this.onChangeinstiname.bind(this);
    this.onChangestartyear = this.onChangestartyear.bind(this);
    this.onChangeendyear = this.onChangeendyear.bind(this);
    this.onChangeskillset = this.onChangeskillset.bind(this);
    this.onChangeskill = this.onChangeskill.bind(this);
    

    this.onSubmit = this.onSubmit.bind(this);
    this.onPush = this.onPush.bind(this);
    this.onPush2 = this.onPush2.bind(this);
  }

  onChangename(event) {this.setState({ name: event.target.value });}
  onChangepassword(event) {this.setState({ password: event.target.value });}
  onChangeemail(event) {this.setState({ email: event.target.value });}
  onChangeeducation(event) {this.setState({ education: event.target.value });}
  onChangeinstiname(event) {this.setState({ instiname: event.target.value });}
  onChangestartyear(event) {this.setState({ startyear: event.target.value });}
  onChangeendyear(event) {this.setState({ endyear: event.target.value });}
  onChangeskillset(event) {this.setState({ skillset: event.target.value });}
  onChangeskill(event) {this.setState({ skill: event.target.value });}

  onPush(e){
    e.preventDefault();
    var temp=" ";
    alert("Added, you can add another instance aswell");
    if(! this.state.endyear) temp=" ";
    else  temp = this.state.endyear;
    const neweducation = {
        instiname: this.state.instiname,
        startyear: this.state.startyear,
        endyear:temp
      };
    var edobject=this.state.education;
    edobject.push(neweducation);
    this.setState({education:edobject});
    this.setState(  {
        instiname:"",
        startyear:"",
        endyear:""
      });
    }

    onPush2(e){
        e.preventDefault();
        alert("Added, you can add another instance as well");
        var newskill=this.state.skill;
        newskill=newskill+" ,";
        var skillobject=this.state.skillset;
        skillobject.push(newskill);
        this.setState({skillset:skillobject});
        this.setState(  {skill:""});
        }    
 

  onSubmit(e) {
    console.log("insubmit loki vachindi bro");
    e.preventDefault();
    const newApplicant = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      education:this.state.education,
      skillset:this.state.skillset
    };
    if(newApplicant.name && newApplicant.email && newApplicant.password ){
    let str = "http://localhost:4000/applicant/register";
    axios.post(str, newApplicant).then(res => {
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
        password: "",
        education:[],
        skillset:[],
        instiname:"",
        startyear:"",
        endyear:"",
        skill:""
    });
  }

  render() {

    return (
      <div className="container">
          <Navbar/>
        <p>This is the Form Creating a new applicant</p>
        
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
            <label>Institute Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.instiname}
              onChange={this.onChangeinstiname}
            />
          </div>
          <div className="form-group">
            <label>StartYear: </label>
            <input
              type="Number"
              min="1995" 
              max="2021"
              className="form-control"
              value={this.state.startyear}
              onChange={this.onChangestartyear}
            />
          </div>
          <div className="form-group">
            <label>EndYear: </label>
            <input
              type="Number"
              min="1995" 
              max="2030"
              className="form-control"
              value={this.state.endyear}
              onChange={this.onChangeendyear}
            />
          </div>
          <div className="form-group">
            <input
              type="button"
              value="Push"
              onClick={this.onPush}
              className="btn btn-secondary active"
            />
          </div>
          <div className="form-group">
            <label>Skill: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.skill}
              onChange={this.onChangeskill}
            />
          </div>

          <div className="form-group">
            <input
              type="button"
              value="Push"
              onClick={this.onPush2}
              className="btn btn-secondary active"
            />
          </div>
          
          <div className="form-group">
            <input
              type="submit"
              value="Create Applicant"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
