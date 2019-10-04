let Right = require("../model/rightSchema.js");

insertRight = right => new Right(right).save();

getAll = () => Right.find({}).exec();

getRight = id => Right.findById({ _id: id }).exec();

deleteRight = id => Right.deleteOne({ _id: id }).exec();

updateRight = (id, right) => Right.updateOne({ _id: id }, right).exec();

module.exports = {
	insertRight,
	getAll,
	getRight,
	deleteRight,
	updateRight
};
