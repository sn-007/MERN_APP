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
    }
})
module.exports = Login = mongoose.model("Logins", LoginSchema);