"use strict";
//import dependency
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let roleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	rights: [{ type: Schema.Types.ObjectId, ref: "Right" }]
});

module.exports = mongoose.model("Role", roleSchema);
