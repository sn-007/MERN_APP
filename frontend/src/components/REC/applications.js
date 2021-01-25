import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from '../templates/recnavbar';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';





export default class MyJobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.onChangedata = this.onChangedata.bind(this);
        this.renderData = this.renderData.bind(this);
        this.updatedata = this.updatedata.bind(this);



    }

    onChangedata(event) { this.setState({ name: event.target.value }); }

    async updatedata(select, app_email, rec_email, title) {
        const obj = {
            "app_email": app_email,
            "title": title,
            "rec_email": rec_email,
            "select": select
        };
        console.log(obj);
        var str = "http://localhost:4000/shortlistacceptreject";
        var res = await axios.post(str, obj);
    }

    async componentDidMount() {
        if (localStorage.getItem("usertype") != "0") {

            this.props.history.push("/login");
            return;
        }
    }



    renderData(data, index) {
        var recmail = localStorage.getItem("email");
        if (data.name) {
            var tag1 = false, tag2 = false, tag3 = false;
            if (data.status === "accepted") { tag1 = true; tag2 = true; tag3 = true; }
            else if (data.status === "shortlisted") { tag1 = false; tag2 = true; tag3 = false; }

            return (

                <tr key={index}>
                    <td className="bg-warning">{data.name}</td>
                    <td className="bg-warning">{data.email}</td>
                    <td className="bg-warning">{data.date_of_application}</td>
                    <td className="bg-warning">{data.sop}</td>
                    <td className="bg-warning">{data.status}</td>

                    <td className="bg-info">
                        <button type="button " className="btn btn-success " disabled={tag1} onClick={() => this.updatedata("accepted", data.email, recmail, localStorage.getItem("title"))}>Accept</button>
                        <button type="button" className="btn btn-warning" disabled={tag2} onClick={() => this.updatedata("shortlisted", data.email, recmail, localStorage.getItem("title"))}>Shortlist</button>
                        <button type="button" className="btn btn-danger" disabled={tag3} onClick={() => this.updatedata("rejected", data.email, recmail, localStorage.getItem("title"))}>Reject</button>
                    </td>

                </tr>
            )

        }
    }

    async componentDidMount() {
        var title = localStorage.getItem("title");
        const obj = { "title": title };
        // console.log(obj);
        var str = "http://localhost:4000/findallapplications"
        var res = await axios.post(str, obj);
        this.setState({ data: res.data });
        //console.log(res.data);

    }

    render() {

        return (
            <div className="container">
                <Navbar />
                <h3>Applicant Details for {localStorage.getItem("title")}</h3>
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
