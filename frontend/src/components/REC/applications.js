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
    this.updatedata=this.updatedata.bind(this);
    this.updatedata2=this.updatedata2.bind(this);
    
    
  }

  onChangedata(event) {this.setState({ name: event.target.value });}

  async updatedata(jobtitle)
  {
    localStorage.setItem("title",jobtitle);
    this.props.history.push("/updatejob");
  }

  async updatedata2(jobtitle)
  {
    localStorage.setItem("title",jobtitle);
    this.props.history.push("/applications");
  }
  
  renderData(data,index)
  {
      if( data.name){
      
        return (
            
          <tr key={index}>
            <td className="bg-warning">{data.name}</td>
            <td className="bg-warning">{data.email}</td>
            <td className="bg-warning">{data.date_of_application}</td>
            <td className="bg-warning">{data.sop}</td>
            <td className="bg-warning">{data.status}</td>
            
            <td className="bg-info">
                <button type="button" className="btn btn-success" onClick={ ()=>this.updatedata(data.title)}>Accept</button>
                <button type="button" className="btn btn-warning" onClick={ ()=>this.updatedata(data.title)}>Shortlist</button>
                <button type="button" className="btn btn-danger" onClick={ ()=>this.updatedata2(data.title)}>Reject</button>
            </td>

          </tr>
        )
      
        }
  }

  async componentDidMount()
  {
    var title=localStorage.getItem("title");
    const obj={"title":title};
    console.log(obj);
    var str="http://localhost:4000/findallapplications"
    var res=await axios.post(str,obj);
    this.setState({data:res.data});
    console.log(res.data);
    
  }
  
  render() {

    return (
      <div className="container">
          <Navbar/>
        <h3>Applicant Details</h3>
        <div className="table-responsive">
        <table class="table table-hover ">
        <thead class="thead-dark">
            <tr>
                
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Applied on </th>
                <th scope="col">SOP</th>
                <th scope="col">Status</th>
                <th scope="col">Recruit</th>

               

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
