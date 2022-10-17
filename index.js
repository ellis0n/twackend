const express = require("express");
const app = express();
const path = require("path");
const { logger } = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500;
const cors = require("cors")
const errorHandler = require('./middleware/errorHandler')

//custom middleware logger
app.use(logger)
//Cross-origin resource sharing
const whitelist = [ 
  'https://www.twack.com',
  'http://127.0.0.1:5500',
  'http://localhost:3500',
  'http://localhost:3500/'
]
const corsOptions = {
  origin: (origin, callback)=>{
    if (whitelist.indexOf(origin)  !== -1 || !origin){ //TODO delete !origin
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// BUILT-IN FORMDATA:
app.use(express.urlencoded({ extended: false }));

// BUILT-IN JSON DATA:
app.use(express.json());

// SERVE STATIC FILES
app.use('/', express.static(path.join(__dirname, "/public")));
app.use('/subdir', express.static(path.join(__dirname, "/public")));

app.use('/', require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
app.use('/users',require('./routes/api/users'));

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
