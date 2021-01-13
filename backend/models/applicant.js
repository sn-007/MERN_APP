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
                type: Number,
                required: false
            }
        
        }
    ],

    skillset : [{
        type : String,
        default : ''
         }],


    rating: {
        points:{
            type: Number,
            default:0
        },
        numofratings:{
            type: Number,
            default: 0
        }

    }



});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);
