const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LoginSchema = new Schema({
	
    password: {
		type: String,
		required: true
    },

	email: {
		type: String,
		required: true
	},
	//0 for rec, 1 for applicant
	usertype:{
		type: Number,
		required: true
	}
})
module.exports = Login = mongoose.model("Logins", LoginSchema);