const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		console.log("origin: ", origin);
		res.set("Access-Control-Allow-Origin", "http://localhost:3000");
		res.set("Access-Control-Allow-Credentials", true);
	}
	next();
};

module.exports = credentials;
