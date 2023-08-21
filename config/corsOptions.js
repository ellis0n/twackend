//Cross-origin resource sharing
const allowedOrigins = require("./allowedOrigins");
const corsOptions = {
	origin: (origin, callback) => {
		console.log(origin);
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			!origin ? console.log("postman") : console.log("origin: ", origin);
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

module.exports = corsOptions;

module.exports = corsOptions;
