import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/applicantnavbar';
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
    this.renderData = this.renderData.bind(this);
    
    
  }

  onChangedata(event) {this.setState({ name: event.target.value });}
  
  renderData(data,index)
  {
      var clss;
      if(data.status==="pending"){clss="table-dark"}
      else if (data.status==="rejected"){clss="table-danger"}
      else if (data.status==="shortlisted"){clss="table-warning"}
      else clss="table-success"
        return (
        
            
          <tr key={index} class ={clss}>
            <td>{data.title}</td>
            <td>{data.salary}</td>
            <td>{data.rec_name}</td>
            <td>{data.status}</td>

          </tr>
        )
      

  }

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
        
        {/*<div>
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
        </div>*/}
  <div className="table-responsive">
        <table class="table table-hover ">
        <thead class="thead-dark">
            <tr>
                
                <th scope="col">Title</th>
                <th scope="col">Salary</th>
                <th scope="col">Name of Recruiter</th>
                <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>    
        {this.state.data.map(this.renderData)}
        </tbody>
    </table>
    </div>
      </div>
    );
  }
}
