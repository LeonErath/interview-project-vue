module.exports = function(router) {
	const right = require("../controller/rightController.js");

	router.post("/rights", right.create);
	router.get("/rights", right.getAll);
	router.get("/rights/:id", right.get);
	router.put("/rights/:id", right.update);
	router.delete("/rights/:id", right.delete);
};
