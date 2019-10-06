let Right = require("../model/rightSchema.js");

insertRight = right =>
	Right.findOneAndUpdate(
		right,
		{},
		{ upsert: true, new: true, setDefaultsOnInsert: true }
	);
getAll = () => Right.find({}).exec();

getRight = id => Right.findById({ _id: id }).exec();

searchRight = obj => Right.find(obj).exec();

deleteRight = id => Right.deleteOne({ _id: id }).exec();

deleteAll = () => Right.deleteMany({}).exec();

updateRight = (id, right) => Right.updateOne({ _id: id }, right).exec();

module.exports = {
	deleteAll,
	insertRight,
	getAll,
	getRight,
	deleteRight,
	updateRight
};
