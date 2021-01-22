const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicantSchema = new Schema({
	
    name: {
		type: String,
		required: true
    },

	email: {
		type: String,
		required: true
    },
    education : 
    [
        {
            instiname: 
            {
                type: String,
                required: true
            },
            startyear:
            {
                type: Number,
                required:true
            },
            endyear:
            {
                type: String,
                required: false
            }
        
        }
    ],

    skillset : 
    [{type : String, default : ''}],
        
    password : {
        type: String,
        required:true
    },


    /*rating: {
        points:{
            type: Number,
            default:0
        },
        numofratings:{
            type: Number,
            default: 0
        }

    },*/
    jobsapplied:
    [{
        title:{type:String,  required:false},
        status:{type:String,  required:false, default:"pending"},
        date_of_application:{type:Date,  required:false, default:Date.now}
    }]



});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);
