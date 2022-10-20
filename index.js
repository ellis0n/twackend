const express = require("express");
const app = express();
const path = require("path");
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500;
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const errorHandler = require('./middleware/errorHandler')
const scrape = require('./controllers/scrape')

app.all(scrape)
app.use(logger)
app.use(cors(corsOptions))

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));
// BUILT-IN JSON DATA:
app.use(express.json());
// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, "/public")));
app.use('/', require('./routes/root'));
app.use('/ads',require('./routes/api/ads'));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts('json')) {
    res.json({error: "404 not found"})
  } else { 
  res.type('txt').send("404 Not Found")
};
});


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
