const mongoose = require("mongoose");
const dbRight = require("./dbRight");
const dbAccount = require("./dbAccount");
const dbRole = require("./dbRole");
const data = require("./data.json");

let mongoDB = `mongodb://mongodb/vue_interview`;

mongoose.connect(mongoDB, { useNewUrlParser: true });

const database = mongoose.connection;

database.on("error", console.error.bind(console, "MongoDB connection error:"));

dbAccount.deleteAll();
dbRight.deleteAll();
dbRole.deleteAll();

Promise.all(
	data.accounts.map(account => {
		if (account.roles.length !== 0) {
			return Promise.all(
				account.roles.map(role => {
					if (role.rights.length !== 0) {
						return Promise.all(
							role.rights.map(right => {
								return dbRight.insertRight(right);
							})
						).then(rights => {
							role.rights = rights;
							return dbRole.insertRole(role);
						});
					} else {
						return dbRole.insertRole(role);
					}
				})
			).then(roles => {
				account.roles = roles;
				return dbAccount.insertAccount(account);
			});
		} else {
			return dbAccount.insertAccount(account);
		}
	})
)
	.then(data => {
		database.close();
	})
	.catch(err => {
		database.close();
	});
