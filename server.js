var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Set up Router
var router = express.Router();

require("./config/routes")(router);

// Set up a static folder (public) for our web app
app.use(express.static(__dirname + "/public"));

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(
  db,
  function(error) {
    if (error) {
      console.log(error);
    } else {
      console.log("mongoose connection is successfull!");
    }
  }
);

// Set the app to listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port:" + PORT);
});
