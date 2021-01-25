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
      var clss="",today= new Date(), temp=data.deadline;
      var year = today.getFullYear().toString(),month=today.getMonth(),day=today.getDate().toString();
      month=month+1;
      month=month.toString();
      if(month < "10") month= "0"+month;
      if(day < "10") day="0"+day;
      var present= year+'-'+month+'-'+day;
      var yt=temp.slice(0,4).toString(),mt=temp.slice(5,7).toString(),dt=temp.slice(8,10).toString() ;
      var dline=yt+'-'+mt+'-'+dt;
      if(dline > present) clss="table-success";
      else clss="table-danger";
      
        return (
            
          <tr key={index} className={clss}>
            <td>{data.title}</td>
            <td>{data.number_of_applicants}</td>
            <td>{data.rem_positions}</td>
            <td>{data.date_of_posting.slice(0,10)}</td>
            <td>{data.deadline.slice(0,10)}</td>
            <td><button type="button" class="btn btn-warning" onClick={ ()=>this.updatedata(data.title)}>update</button></td>
            <td><button type="button" class="btn btn-info" onClick={ ()=>this.updatedata2(data.title)}>Info</button></td>
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
                <th scope="col">Applied</th>
                <th scope="col">Remaining Positions</th>
                <th scope="col">Date Posted</th>
                <th scope="col">Deadline</th>
                <th scope="col">Edit</th>
                <th scope="col">look</th>


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
