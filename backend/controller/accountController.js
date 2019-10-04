const dbAccount = require("../database/dbAccount");

const wrapAsync = fn => {
	return (req, res, next) => {
		// Make sure to `.catch()` any errors and pass them along to the `next()`
		// middleware in the chain, in this case the error handler.
		fn(req, res, next).catch(next);
	};
};

exports.getAll = wrapAsync(async (req, res, next) => {
	try {
		const accounts = await dbAccount.getAll();
		res.send(accounts);
	} catch (err) {
		next(err);
	}
});

exports.create = wrapAsync(async (req, res, next) => {
	try {
		const account = await dbAccount.insertAccount(req.body);
		res.send(account);
	} catch (err) {
		next(err);
	}
});

exports.get = wrapAsync(async (req, res, next) => {
	try {
		const account = await dbAccount.getAccount(req.params.id);
		res.send(account);
	} catch (err) {
		next(err);
	}
});

exports.update = wrapAsync(async (req, res, next) => {
	try {
		const account = await dbAccount.updateAccount(req.params.id, req.body);
		res.send(account);
	} catch (err) {
		next(err);
	}
});

exports.delete = wrapAsync(async (req, res, next) => {
	try {
		await dbAccount.deleteAccount(req.params.id);
		res.send({ message: "deleted" });
	} catch (err) {
		next(err);
	}
});
