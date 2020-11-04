// Didn't think we had to do to much on this file since this is teaching us a type of module to use with password authentication.

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", { // the variable is creating a constructor 'User' to the parameter in the function called (line 6). This is then called by a 'define()' method that is followed by the string "user" and then followed by an object bracket; this encases the email data parameters needed to be created.
  // This is saying that the email must be unique, one of a kind. meaning, the user may only have one account associated to them with that specific and unique email once verified.
  // Also the email can not be empty nor can it not exist, it must be an existing email. When I say existing I mean that it must be an email that is real and operational.
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Same thing here as stated with the email, still inside the object 'User', which I just explained from lines 7 - 9.
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
