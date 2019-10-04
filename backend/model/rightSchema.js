"use strict";
//import dependency
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let rightSchema = new Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Right", rightSchema);
