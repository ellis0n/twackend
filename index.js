require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
//Set Port to 3500
const PORT = process.env.PORT || 3500;
//Cors
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//Middleware
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const allowedOrigins = require("./config/allowedOrigins");

// Connect to database
connectDB();

app.use(logger);

// app.use(credentials);
app.use(cors(corsOptions));
// COOKIE MIDDLEWARE:
app.use(cookieParser());
// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());

// SERVE STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes:
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logout"));
app.use("/refresh", require("./routes/api/refresh"));

// Everything below here requires user to be verified
app.use(verifyJWT);
app.use("/pref", require("./routes/api/pref"));
app.use("/vote", require("./routes/api/vote"));
app.use("/scrape", require("./routes/api/scrape"));
app.use("/users", require("./routes/api/users"));

// app.use("/scrape", require("./routes/api/scrape"));

// 404
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 not found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// Error handler
app.use(errorHandler);

// Open connection to DB
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB database.");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
