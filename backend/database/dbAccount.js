let Account = require("../model/accountSchema.js");

insertAccount = account => new Account(account).save();

getAll = () =>
	Account.find({})
		.populate({
			path: "roles",
			populate: { path: "rights", component: "Right" }
		})
		.exec();

getAccount = id =>
	Account.findById({ _id: id })
		.populate("roles")
		.exec();

deleteAccount = id => Account.deleteOne({ _id: id }).exec();

updateAccount = (id, account) => Account.updateOne({ _id: id }, account).exec();

module.exports = {
	insertAccount,
	getAll,
	getAccount,
	deleteAccount,
	updateAccount
};
