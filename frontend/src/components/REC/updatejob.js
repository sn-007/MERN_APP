import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/recnavbar';

export default class EditRec extends Component {
  constructor(props) {
    super(props);

    this.state = {
        max_applications:"",
        num_positions:"",
        deadline:"",
        delete:"0"
    };

    this.onChangemax_applications = this.onChangemax_applications.bind(this);
    this.onChangenum_positions = this.onChangenum_positions.bind(this);
    this.onChangedeadline = this.onChangedeadline.bind(this);
    this.onChangedelete = this.onChangedelete.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.ondelete = this.ondelete.bind(this);
  }

  onChangemax_applications(event) {this.setState({ max_applications: event.target.value });}
  onChangenum_positions(event) {this.setState({ num_positions: event.target.value });}
  onChangedeadline(event) {this.setState({ deadline: event.target.value });}
  onChangedelete(event) {this.setState({ delete: event.target.value });}
async ondelete()
{
  const newdel = {"delete":"1","title":localStorage.getItem("title")};
  let str = "http://localhost:4000/jobupdate";
      let res = await axios.post(str, newdel); 
      if(!res.error){alert("deleted")}
      this.props.history.push("/myjobs");
  
}
  async onSubmit(e) {
    e.preventDefault();
    
    console.log("came");
    const newJob = 
    {
         "title":localStorage.getItem("title"),
        "max_applications":this.state.max_applications ,
        "num_positions" :this.state.num_positions,
        "deadline" : this.state.deadline,
        "delete":this.state.delete
     
    };
    console.log(newJob);
    if(newJob.title  && newJob.max_applications && newJob.num_positions&& newJob.deadline )
    {
      let str = "http://localhost:4000/jobupdate";
      let res = await axios.post(str, newJob); 
      console.log(res.data);

      if (res.data.error) alert("check values ");
      else {alert("JOb updated ");this.props.history.push("/myjobs");}
    }

    else alert("empty fileds asshole !!!!!!")

  }
  async componentDidMount() {
    if (localStorage.getItem("usertype") != "0") {

        this.props.history.push("/login");
        return;
    }
}

  render() {
    return (
      <div className="container">
        <Navbar/>
        <h4>This is the Form Updating/deleting a  Job</h4>
        
        <form onSubmit={this.onSubmit}>
          

          <div className="form-group">
            <label>Deadline </label>
            <input
              type="date"
              className="form-control"
              value={this.state.deadline}
              onChange={this.onChangedeadline}
            />
          </div>

          <div className="form-group">
            <label>Applications Limit </label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={this.state.max_applications}
              onChange={this.onChangemax_applications}
            />
          </div>

          <div className="form-group">
            <label>Positions Available </label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={this.state.num_positions}
              onChange={this.onChangenum_positions}
            />
          </div>

          
          
          <div className="form-group">
            <input
              type="submit"
              value="update Job"
              className="btn btn-primary btn-warning"
            />

          </div>
          
        </form>
        <button type="button" class="btn btn-danger float-right" onClick={ this.ondelete}>Delete Job</button>
      </div>
    );
  }
}
