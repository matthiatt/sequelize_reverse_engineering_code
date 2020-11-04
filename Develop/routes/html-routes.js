// Starting by calling the file to use by declaring path to indicate what the purpose of the variable is.
var path = require("path");

// The variable is declaring a path to the middleware folder. So it's calling for authentication for when a user is loged in and verified.
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Calling the whole function with the module, which had a perameter of 'app'.
module.exports = function(app) {

  // the function is getting the information the user has submitted.
  app.get("/", function(req, res) {
    // declaring an 'if' statement to have the server require the user information to give permissons.
    if (req.user) {
      res.redirect("/members"); // Redirects access to members to this area.
    }
    res.sendFile(path.join(__dirname, "../public/signup.html")); // Response is sending the 'sendFile()' method.
  }); // Then setting the path to join a directory name, followed by the location within a string.

  // Telling the app perameter to get the login page.
  app.get("/login", function(req, res) {
    // Declaring 'if' statement so a user can be redirected to the member page, if they have access to the page already from being a member.
    if (req.user) {
      res.redirect("/members"); // Redirect to members page.
    }
    res.sendFile(path.join(__dirname, "../public/login.html")); // Response is sending the 'sendFile()' method.
    // Then setting the path to join a directory name, followed by the location within a string.
  });

  // Telling the server to get the members page that's been authenticated with the users information.  Then to send the file that was prompted with a response.
  // Then telling the path to join in correlation with the directory name with the place in it.
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
