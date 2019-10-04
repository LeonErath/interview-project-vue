const dbRight = require("../database/dbRight");

const wrapAsync = fn => {
	return (req, res, next) => {
		// Make sure to `.catch()` any errors and pass them along to the `next()`
		// middleware in the chain, in this case the error handler.
		fn(req, res, next).catch(next);
	};
};

exports.getAll = wrapAsync(async (req, res, next) => {
	try {
		const rights = await dbRight.getAll();
		res.send(rights);
	} catch (err) {
		next(err);
	}
});

exports.create = wrapAsync(async (req, res, next) => {
	try {
		const right = await dbRight.insertRight(req.body);
		res.send(right);
	} catch (err) {
		next(err);
	}
});

exports.get = wrapAsync(async (req, res, next) => {
	try {
		const right = await dbRight.getRight(req.params.id);
		res.send(right);
	} catch (err) {
		next(err);
	}
});

exports.update = wrapAsync(async (req, res, next) => {
	try {
		const right = await dbRight.updateRight(req.params.id, req.body);
		res.send(right);
	} catch (err) {
		next(err);
	}
});

exports.delete = wrapAsync(async (req, res, next) => {
	try {
		await dbRight.deleteRight(req.params.id);
		res.send({ message: "deleted" });
	} catch (err) {
		next(err);
	}
});
