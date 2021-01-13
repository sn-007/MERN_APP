const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
    },
    rec_name: {
		type: String,
		required: true
    },

	rec_email: {
		type: String,
		required: true
    },
    max_applications: {
        type: Number,
        required: true

    },

    num_positions : {
        type: Number,
        required: true

    },


	date_of_posting : {
		type: Date,
        required: true,
        default: Date.now()
    },
    deadline : {
        type: Date,
        required: true,
        default: Date.now()
    },
    skillset : [{
        type : String,
        default : ''
         }],
    jobType:{
        type:String,
        default : 'Full-Time'
    },
    duration: {
        type: Number,
        default: '6'
    },
    salary: {
        type: Number
    },
    rating: {

    }



});

module.exports = Job = mongoose.model("Jobs", JobSchema);
