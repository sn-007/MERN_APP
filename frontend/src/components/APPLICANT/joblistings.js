import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/applicantnavbar';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "@material-ui/core/Radio";





export default class Alljobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      ftitle: "",
      lower: "",
      upper: "",
      sort: "0",
      sortd: "",
      ud:"",
      jobType: "",
      found: "",
      limit: "",
      danger:""
    };

    this.onChangedata = this.onChangedata.bind(this);
    this.onChangelimit = this.onChangelimit.bind(this);
    this.onChangeftitle = this.onChangeftitle.bind(this);
    this.onChangelower = this.onChangelower.bind(this);
    this.onChangeupper = this.onChangeupper.bind(this);
    this.onChangesort = this.onChangesort.bind(this);
    this.onChangesortd = this.onChangesortd.bind(this);
    this.onChangeud = this.onChangeud.bind(this);
    this.renderData = this.renderData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangejobType = this.onChangejobType.bind(this);
    this.onChangefound = this.onChangefound.bind(this);
    this.onChangedanger = this.onChangedanger.bind(this);


    this.updatedata = this.updatedata.bind(this);



  }
  onChangelimit(event) { this.setState({ limit: event.target.value }); }
  onChangedanger(event) { this.setState({ danger: event.target.value }); }
  onChangedata(event) { this.setState({ name: event.target.value }); }
  onChangeftitle(event) { this.setState({ ftitle: event.target.value }); }
  onChangelower(event) { this.setState({ lower: event.target.value }); }
  onChangeupper(event) { this.setState({ upper: event.target.value }); }
  onChangesort(event) { this.setState({ sort: event.target.value }); }
  onChangesortd(event) { this.setState({ sortd: event.target.value }); }
  onChangeud(event) { this.setState({ ud: event.target.value }); }
  onChangejobType(event) { this.setState({ jobType: event.target.value }); }
  onChangefound(event) { this.setState({ found: event.target.value }); }



  async updatedata(jobtitle) {
    localStorage.setItem("title", jobtitle);
    this.props.history.push("/applyforjob");
  }

  async componentDidMount() {
    if (localStorage.getItem("usertype") != "1") {

      this.props.history.push("/login");
      return;
    }
  }



  renderData(data, index) {
 
    var name = "Apply", clss = "btn btn-warning", dsb = false;
    if (this.state.limit === "true") {
      clss = "btn btn-danger";
      dsb = true;
      name=" AT YOUR LIMIT"
    }
    if (this.state.danger === "true") {
      clss = "btn btn-danger";
      dsb = true;
      name=":>nope<:"
    }

    if (data.found === "1") {
      name = "Applied";
      clss = "btn btn-success"
      dsb = true;
    }
  

    if (data.salary) {
      return (


        <tr key={index}>
          <td>{data.title}</td>
          <td>{data.salary}</td>
          <td>{data.rec_name}</td>
          <td>{data.rec_email}</td>
          <td>{data.jobType}</td>
          <td>{data.duration}</td>
          <td><button type="button" disabled={dsb} class={clss} onClick={() => this.updatedata(data.title)} >{name}</button></td>

        </tr>)
    }

  };

  async onSubmit(e) {
    e.preventDefault();
    var str = "http://localhost:4000/appfilters";

    var obj = {
      "title": this.state.ftitle,
      "sort": this.state.sort,
      "sortd": this.state.sortd,
      "jobType": this.state.jobType,
      "lower": this.state.lower,
      "upper": this.state.upper,
      "email": localStorage.getItem("email"),
      "ud":this.state.ud
    }

    var res = await axios.post(str, obj);
    if (res.data.includes("warning")) {
      alert("you cannot apply more than 10 jobs");
      this.setState({ limit: "true" });
    };
    if (res.data.includes("danger")) {
      alert("you are already selected");
      this.setState({ danger: "true" });
    };

    this.setState({ data: res.data });
    console.log(res.data);

  }

  render() {

    return (
      <div className="container">
        <Navbar />
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

          <div className="col">
            <div className="form-group">
              <label>Lower LIMIT: </label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={this.state.lower}
                onChange={this.onChangelower}
              />
            </div>
            <div className="form-group">
              <label>Upper LIMIT: </label>
              <input
                type="number"
                min="0"
                className="form-control"
                value={this.state.upper}
                onChange={this.onChangeupper}
              />
            </div>
            <div className="form-group">
              <label>Duration LIMIT: </label>
              <input
                type="number"
                min="0"
                max="7"
                className="form-control"
                value={this.state.ud}
                onChange={this.onChangeud}
              />
            </div>



          </div>


          <div className="form-group">
            <FormLabel component="legend">SORT: </FormLabel>
            <RadioGroup
              defaultValue={this.state.sort}
              aria-label="gender"
              name="customized-radios"
              onChange={this.onChangesort}
            >
              <div className="col">
                <FormControlLabel
                  value="0"
                  control={<StyledRadio />}
                  label="Ascending Salary"
                />
                <FormControlLabel
                  value="1"
                  control={<StyledRadio />}
                  label="Descending Salary"
                />
                <FormControlLabel
                  value="d0"
                  control={<StyledRadio />}
                  label="Ascending Duration"
                />
                <FormControlLabel
                  value="d1"
                  control={<StyledRadio />}
                  label="Descending Duration"
                />
              </div>
            </RadioGroup>
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
                <FormControlLabel
                  value="x"
                  control={<StyledRadio />}
                  label="BOTH"
                />
              </div>
            </RadioGroup>
          </div>


          <div className="form-group">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary"
            />
          </div>


        </form>






        <div className="table-responsive">
          <table class="table table-hover ">
            <thead class="thead-dark">
              <tr>

                <th scope="col">Title</th>
                <th scope="col">Salary</th>
                <th scope="col">Employer Name</th>
                <th scope="col">Email</th>
                <th scope="col">JobType</th>
                <th scope="col">Duration</th>
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
