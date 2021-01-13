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
    rating: {

    }



});

module.exports = Rec = mongoose.model("Recs", RecSchema);
