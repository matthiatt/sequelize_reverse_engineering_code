// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

// Calling the installed modules that have been installed, that I want in my server connection.
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport"); // Require the passport module, and the file that the module is directly written to.

// Sets the port and the correct models to connect.
var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express(); // Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true })); // Needed to have the server connect. The 'urlencoded()' method - this encodes the information with UTF-8.
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // We need to use sessions to keep track of our user's login status
app.use(passport.initialize());
app.use(passport.session());

// Need to declare the routes here with the app perameters since it's called in the parameter of the function calling the module in the api file.
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing the SQL database by using 'sequelize' and connecting it by using the method 'sync()', which is followed by a promise.
// Next and finally I call the server to listen to everything in this file to connect everything together.
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT); // In dont know what that symbol means.
  });
});
