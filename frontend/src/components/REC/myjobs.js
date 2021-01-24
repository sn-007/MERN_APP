import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/recnavbar';
import  { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';





export default class MyJobs extends Component 
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
      var clss="";
      if(data.deadline < Date.now) clss="table-success";
      else clss="table-danger";
      

        return (
            
          <tr key={index} className={clss}>
            <td>{data.title}</td>
            <td>{data.number_of_applicants}</td>
            <td>{data.rem_positions}</td>
            <td>{data.date_of_posting.slice(0,10)}</td>
            <td>{data.deadline.slice(0,10)}</td>
          </tr>
        )
      

  }

  async componentDidMount()
  {
    var email=localStorage.getItem("email");
    const obj={"rec_email":email};
    console.log(obj);
    var str="http://localhost:4000/myjobs"
    var res=await axios.post(str,obj);
    this.setState({data:res.data});
    console.log(res.data);
    
  }
  
  render() {

    return (
      <div className="container">
          <Navbar/>
        
        <div className="table-responsive">
        <table class="table table-hover ">
        <thead class="thead-dark">
            <tr>
                
                <th scope="col">Title</th>
                <th scope="col">Applications</th>
                <th scope="col">Remaining Positions</th>
                <th scope="col">Date Posted</th>
                <th scope="col">Deadline</th>
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
