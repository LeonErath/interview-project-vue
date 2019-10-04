const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { startDatabase } = require("./database/mongo");

const app = express();

const router = express.Router();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/public", express.static(__dirname + "/public"));

const port = process.env.DB_PORT || 3005;

router.get("/", (req, res) => {
	res.send("API initialised");
});

require("./routes/accountRoute.js")(router);
require("./routes/roleRoute.js")(router);
require("./routes/rightRoute.js")(router);

app.use("/api", router);

// start the MongoDB instance
startDatabase().then(async () => {
	// start the server
	app.listen(port, () =>
		console.log(
			chalk.yellow(
				`[express] backend available on port`,
				chalk.underline(`http://localhost:${port}`)
			)
		)
	);
});
