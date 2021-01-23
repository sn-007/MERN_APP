import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './templates/applicantnavbar';





export default class Alljobs extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      ftitle:"",
      lower:"",
      upper:"",
      sort:""
    };

    this.onChangedata = this.onChangedata.bind(this);
    this.onChangeftitle = this.onChangeftitle.bind(this);
    this.onChangelower = this.onChangelower.bind(this);
    this.onChangeupper = this.onChangeupper.bind(this);
    this.onChangesort=this.onChangesort.bind(this);
    this.renderData = this.renderData.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    
    
  }

  onChangedata(event) {this.setState({ name: event.target.value });}
  onChangeftitle(event) {this.setState({ ftitle: event.target.value });}
  onChangelower(event) {this.setState({ lower: event.target.value });}
  onChangeupper(event) {this.setState({ upper: event.target.value });}
  onChangesort(event) {this.setState({ sort: event.target.value });}
  
  renderData(data,index)
  {
        return (
        
            
          <tr key={index}>
            <td>{data.title}</td>
            <td>{data.salary}</td>
            <td>{data.rec_name}</td>
            <td>{data.rec_email}</td>
            <td>{data.jobType}</td>
            <td>{data.duration}</td>

          </tr>) };

  async onSubmit(e)
  {
      e.preventDefault();
    var str="http://localhost:4000/appfilters";
    var obj={"title":this.state.ftitle}
    var res=await axios.post(str,obj);
    this.setState({data:res.data});
    
  }
  
  render() {

    return (
      <div className="container">
          <Navbar/> 
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.ftitle}
              onChange={this.onChangeftitle}
            />
          </div>
         
          <div className="form-group">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary"
            />
          </div>
        </form>







        <table class="table table-hover ">
        <thead class="thead-dark">
            <tr>
                
                <th scope="col">Title</th>
                <th scope="col">Salary</th>
                <th scope="col">Employer Name</th>
                <th scope="col">Email</th>
                <th scope="col">JobType</th>
                <th scope="col">Duration</th>
            </tr>
        </thead>
        <tbody>    
        {this.state.data.map(this.renderData)}
        </tbody>
</table>

















      </div>
    );
  }
}
