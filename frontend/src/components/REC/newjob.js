import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/recnavbar';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "@material-ui/core/Radio";

export default class ewJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        rec_name: "",
        max_applications: "",
        num_positions :"",
        deadline : "",
        skillset : "",
        jobType: "",
        duration: "",
        salary: ""
    };

    this.onChangetitle = this.onChangetitle.bind(this);
    this.onChangerec_name = this.onChangerec_name.bind(this);
    this.onChangemax_applications = this.onChangemax_applications.bind(this);
    this.onChangenum_positions = this.onChangenum_positions.bind(this);
    this.onChangedeadline = this.onChangedeadline.bind(this);
    this.onChangeskillset = this.onChangeskillset.bind(this);
    this.onChangejobType = this.onChangejobType.bind(this);
    this.onChangeduration=this.onChangeduration.bind(this);
    this.onChangesalary=this.onChangesalary.bind(this);


    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangetitle(event) {this.setState({ title: event.target.value });}
  onChangerec_name(event) {this.setState({ rec_name: event.target.value });}
  onChangemax_applications(event) {this.setState({ max_applications: event.target.value });}
  onChangenum_positions(event) {this.setState({ num_positions: event.target.value });}
  onChangedeadline(event) {this.setState({ deadline: event.target.value });}
  onChangeskillset(event) {this.setState({ skillset: event.target.value });}
  onChangesalary(event) {this.setState({ salary: event.target.value });}
  onChangejobType(event) {this.setState({ jobType: event.target.value });}
  onChangeduration(event) {this.setState({ duration: event.target.value });}
  
  async componentDidMount() {
    if (localStorage.getItem("usertype") != "0") {

        this.props.history.push("/login");
        return;
    }
}
  async onSubmit(e) {
    console.log("insubmit loki vachindi bro");
    e.preventDefault();
    const newJob = {
        "title":this.state.title,
        "max_applications":this.state.max_applications ,
        "num_positions" :this.state.num_positions,
        "rec_email":localStorage.getItem("email"),
        "rec_name":this.state.rec_name,
        "skillset" : this.state.skillset,
        "deadline" : this.state.deadline,
        "jobType": this.state.jobType,
        "duration": this.state.duration,
        "salary": this.state.salary
     
    };
    console.log(newJob);
    if(newJob.title  && newJob.rec_name && newJob.max_applications && newJob.num_positions&& newJob.deadline && newJob.skillset && newJob.duration && newJob.jobType&&newJob.salary)
    {
      let str = "http://localhost:4000/newjob";
      let res = await axios.post(str, newJob); 
      console.log(res.data);

      if (res.data.error) alert("check values ");
      else alert("JOb Posted ");
    }

    else alert("empty fileds asshole !!!!!!")

  }

  render() {
    return (
      <div className="container">
        <Navbar/>
        <p>This is the Form Creating a new Job</p>
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Recruiter Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.rec_name}
              onChange={this.onChangerec_name}
            />
          </div>

          <div className="form-group">
            <label>Recruiter Email: </label>
            <input
              type="email"
              className="form-control"
              value={localStorage.getItem("email")}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Job Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangetitle}
            />
          </div>

          <div className="form-group">
            <label>Salary: </label>
            <input
              type="Number"
              min="0"
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangesalary}
            />
          </div>
          <div className="form-group">
            <label>Duration </label>
            <input
              type="Number"
              min="1"
              max="7"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeduration}
            />
          </div>
          

          <div className="form-group">
            <FormLabel component="legend">JOB-TYPE: </FormLabel>
            <RadioGroup
              defaultValue={this.state.jobType}
              aria-label="gender"
              name="customized-radios"
              onChange={this.onChangejobType}
            >
              <div className="col">
                <FormControlLabel
                  value="full-time"
                  control={<StyledRadio />}
                  label="FULL-TIME"
                />
                <FormControlLabel
                  value="part-time"
                  control={<StyledRadio />}
                  label="PART-TIME"
                />
              </div>
            </RadioGroup>
          </div>

          
          <div className="form-group">
            <label>Skills required </label>
            <input
              type="text"
              className="form-control"
              value={this.state.skillset}
              onChange={this.onChangeskillset}
            />
          </div>

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
              value="Create Job"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
