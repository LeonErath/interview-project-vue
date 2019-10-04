module.exports = function(router) {
	const account = require("../controller/accountController.js");

	router.post("/accounts", account.create);
	router.get("/accounts", account.getAll);
	router.get("/accounts/:id", account.get);
	router.put("/accounts/:id", account.update);
	router.delete("/accounts/:id", account.delete);
};
