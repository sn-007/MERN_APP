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
        required: false,
        default: Date.now
    },
    deadline : {
        type: Date,
        required: true,
        default: Date.now
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
   /* rating: {
        points:{
            type: Number,
            default:0
        },
        numofratings:{
            type: Number,
            default: 0
        }

    },*/
    applicants:
    [{
        email:{type:String, required:false},
        sop:{type:String,required:false},
        rating:{type:Number,required:false,default:0}
    }]



});

module.exports = Job = mongoose.model("Jobs", JobSchema);
