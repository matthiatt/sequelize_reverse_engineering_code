// https://expressjs.com/en/guide/writing-middleware.html
// https://www.terlici.com/2014/08/25/best-practices-express-structure.html
// This is a middleware file structure that's responsible for having the ability to have restricting routes.  Resitricting routes are put in for limited access within a site, unless given permission.
module.exports = function(req, res, next) {
  // This executes when the user sucessfully logs in. From this point, the user has now logged in and now has been given access.
  if (req.user) {
    return next();
  }

  // This redirects the user back to the homepage when they dont successfully login.
  return res.redirect("/");
};
