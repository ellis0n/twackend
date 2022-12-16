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

// Connect to database
connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// COOKIE MIDDLEWARE:
app.use(cookieParser());
// SERVE STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes:
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/auth", require("./routes/api/auth"));
app.use("/logout", require("./routes/api/logout"));
app.use("/scrape", require("./routes/api/scrape"));
app.use("/save", require("./routes/api/save")); // TODO: auth
app.use("/pref", require("./routes/api/pref")); // TODO: users
app.use("/users", require("./routes/api/users")); // TODO: auth
app.use(verifyJWT); // Everything below here requires user to be verified
// app.use("/save", require("./routes/api/save")); // Save ads

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
