// Declaring the db needs to require the models folder.
var db = require("../models");
var passport = require("../config/passport"); // Declaring the passport needs to require the config folder with the file following.

module.exports = function(app) {
  // Looking at this, I can guess that the 'post()' method is used to send data to a server to create/ a resource that is accessed. For here, I see the 'passport.authenticate' is in the middleweare folder, but I dont see why its linking to 'local'.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Setting up the post route that's connected to the api folder location , telling the information from the users input with the information to put it in the database by using the sequalize user model.
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() { // Making a promise to redirect 
        res.redirect(307, "/api/login");
      })
      .catch(function(err) { // this will error out if redirect fails.
        res.status(401).json(err);
      });
  });

  // Creating a ''get()' method to have access a user to be able to logout.
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Creating a route for user data to be able to be known to the client side of the server.
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({}); // Telling the server to respond back with json.
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id // if not, then this will send back this.
      });
    }
  });
};
