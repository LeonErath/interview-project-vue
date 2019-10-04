let mongoose = require("mongoose");

let database = null;

async function startDatabase() {
	let mongoDB = `mongodb://localhost:27017/vue_interview`;
	mongoose.connect(mongoDB, { useNewUrlParser: true });
	database = mongoose.connection;
	database.on(
		"error",
		console.error.bind(console, "MongoDB connection error:")
	);
}

async function getDatabase() {
	if (!database) await startDatabase();
	return database;
}

async function closeDatabase() {
	try {
		await mongoose.disconnect();
	} catch (err) {
		throw err;
	}
}

module.exports = {
	getDatabase,
	startDatabase,
	closeDatabase
};
