module.exports = function(router) {
	const role = require("../controller/roleController.js");

	router.post("/roles", role.create);
	router.get("/roles", role.getAll);
	router.get("/roles/:id", role.get);
	router.put("/roles/:id", role.update);
	router.delete("/roles/:id", role.delete);
};
