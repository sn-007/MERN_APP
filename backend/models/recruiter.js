const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecSchema = new Schema({
	
    name: {
		type: String,
		required: true
    },

	email: {
		type: String,
		required: true
    },
    phone: {
        type: Number,
        required: true

    },

    password : {
        type: String,
        required:true
    },

    bio:{type:String,required:false,default:"i am a Recruiter"},
    
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
    workers:[
        {
        name:{type:String, default:" ", required: false},
        email:{type:String, default:" ", required: false},
        doj:{type:Date,default:Date.now,required: false},
        jobType:{type:String,default:"WFH",required: false},
        title:{type:String,default:" ",required: false}
        }
    ]



});

module.exports = Rec = mongoose.model("Recs", RecSchema);
