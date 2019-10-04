const dbRole = require("../database/dbRole");

const wrapAsync = fn => {
	return (req, res, next) => {
		// Make sure to `.catch()` any errors and pass them along to the `next()`
		// middleware in the chain, in this case the error handler.
		fn(req, res, next).catch(next);
	};
};

exports.getAll = wrapAsync(async (req, res, next) => {
	try {
		const roles = await dbRole.getAll();
		res.send(roles);
	} catch (err) {
		next(err);
	}
});

exports.create = wrapAsync(async (req, res, next) => {
	try {
		const role = await dbRole.insertRole(req.body);
		res.send(role);
	} catch (err) {
		next(err);
	}
});

exports.get = wrapAsync(async (req, res, next) => {
	try {
		const role = await dbRole.getRole(req.params.id);
		res.send(role);
	} catch (err) {
		next(err);
	}
});

exports.update = wrapAsync(async (req, res, next) => {
	try {
		const role = await dbRole.updateRole(req.params.id, req.body);
		res.send(role);
	} catch (err) {
		next(err);
	}
});

exports.delete = wrapAsync(async (req, res, next) => {
	try {
		await dbRole.deleteRole(req.params.id);
		res.send({ message: "deleted" });
	} catch (err) {
		next(err);
	}
});
