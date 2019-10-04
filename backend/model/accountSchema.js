"use strict";
//import dependency
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let accountSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	telephone: {
		type: String,
		required: true
	},
	roles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
});

module.exports = mongoose.model("Account", accountSchema);
