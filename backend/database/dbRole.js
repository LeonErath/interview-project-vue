let Role = require("../model/roleSchema.js");

insertRole = role => new Role(role).save();

getAll = () =>
	Role.find({})
		.populate("rights")
		.exec();

getRole = id =>
	Role.findById({ _id: id })
		.populate("rights")
		.exec();

deleteRole = id => Role.deleteOne({ _id: id }).exec();

deleteAll = () => Role.deleteMany({}).exec();

updateRole = (id, role) => Role.updateOne({ _id: id }, role).exec();

module.exports = {
	deleteAll,
	insertRole,
	getAll,
	getRole,
	deleteRole,
	updateRole
};
