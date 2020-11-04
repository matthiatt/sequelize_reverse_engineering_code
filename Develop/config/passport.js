// Calling on the modules that will be used here on this page.
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy; // 'Strategy' is acting as a contructor here.
var db = require("../models");

// Next, in order to get a login area - this will have to include a username, email, and password. I have to tell the module 'passport' to use a 'Local Strategy' constructor. The 'use' method is telling us that the passport module will use a new constructor, which is 'LocalStrategy', which in return will ask the user to input thier email. which is prompted below.
passport.use(new LocalStrategy(
  {
    usernameField: "email" // To state myself again, I am stating here that the user will use thier email as thier username.
  },
  // The next thing I want to accomplish is to get the email and password established. To do this I need to pass them as parameters within the function I want to execute. The 'done()' method is a callback that you need to call once you are done with your work.  When the user inputs thier information then this code will execute. Also, 'done()' is a promise like the 'then()' method.
  function(email, password, done) {
    db.User.findOne({
      where: {
        email: email
      }
      // The 'then()' method is there to promise a return if the field [username] is empty or invalid.  It will return a statement saying "Incorrect email".  Also, the user must be placed within the database, as it states within the perameters of the function being called here.
    }).then(function(dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // The next thing I must accomplish would be the same thing again, as I did for the username setting, but this time with the password setting if the user inputs a blank field or an invalid awnser that the database can't find/connect to.  If the user leaves the field blank, or the information they entered is false, then they will get a message saying, "Incorrect password".
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // Making a promise 'done()' method which will return the user if false.
      return done(null, dbUser);
    });
  }
));

// 'serializeUser()' determines which data of the user object should be stored in the session. The result of the 'serializeUser()' method is attached to the session.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
// Going back, the user id is saved.  Now since the id is saved. Now we know the id is in the session and is later used to retrieve the whole object via the 'deserializeUser()' method/function.
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// This is how we need to export the configured passport.
module.exports = passport;
