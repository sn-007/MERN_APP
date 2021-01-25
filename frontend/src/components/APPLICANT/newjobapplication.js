import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/applicantnavbar';

export default class EditRec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sop: "",

        };


        this.onChangesop = this.onChangesop.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangesop(event) { this.setState({ sop: event.target.value }); }

    async onSubmit(e) {
        e.preventDefault();


        const newApplication =
        {
            "title": localStorage.getItem("title"),
            "sop": this.state.sop,
            "email": localStorage.getItem("email")

        };

        if (newApplication.sop) {
            let str = "http://localhost:4000/apply/newjob";
            let res = await axios.post(str, newApplication);

            if (res.data.error) alert("check values ");
            else { alert("JOb Applied "); this.props.history.push("/myapps"); }
        }

        else alert("empty fileds asshole !!!!!!")

    }

    render() {
        return (
            <div className="container">
                <Navbar />
                <p>This is the Form Updating a  Job</p>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>SOP </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.sop}
                            onChange={this.onChangesop}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Apply"
                            className="btn btn-primary"
                        />
                    </div>

                </form>
            </div>
        );
    }
}
