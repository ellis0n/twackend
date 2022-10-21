const express = require("express");
const app = express();
const path = require("path");
//Set Port to 3500
const PORT = process.env.PORT || 3500;
//Cors
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
//Middleware
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);
app.use(cors(corsOptions));

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// SERVE STATIC FILES
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes:
app.use("/", require("./routes/root"));
app.use("/ads", require("./routes/api/ads"));
app.use("/scrape", require("./routes/api/scrapi"));
app.use("/register", require("./routes/api/register"));
app.use("/auth", require("./routes/api/auth"));

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

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
