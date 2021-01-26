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





export default class Workers extends Component 
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
      
        return (
            
          <tr key={index} className="table-info">
            <td>{data.name}</td>
            <td>{data.doj.slice(0,10)}</td>
            <td>{data.title}</td>
            <td>{data.jobType}</td>
          </tr>
        )
      

  }

  async componentDidMount()
  {
   
      if (localStorage.getItem("usertype") != "0") {

          this.props.history.push("/login");
          return;
      }
  
    var email=localStorage.getItem("email");
    const obj={"email":email};
    console.log(obj);
    var str="http://localhost:4000/workers"
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
                
                <th scope="col">Name</th>
                <th scope="col">DOJ</th>
                <th scope="col">Title</th>
                <th scope="col">Job Type</th>


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
