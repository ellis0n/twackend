const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, "/public")));

// Serve a HTML file
app.get("^/$|/index(.html)?", (req, res) => {
  //Regex
  //res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Route handlers:
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    "hello world";
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
