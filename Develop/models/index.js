// https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/

// The purpose of using the 'use strict' command is to have a key value that shows which code should be executed using specifically "strict mode".
// With strict mode you can not use undeclared variables.
'use strict';
// Declaring the  modules to grab in this page from line 5 - 7.
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename); //The basename method is used to extract the file name from a fully qualified path, and in this case it's the module that's in this method perameter.
var env       = process.env.NODE_ENV || 'development'; // This is only possible one the path variable is set, which it is above, which is the module. (I believe).
var config    = require(__dirname + '/../config/config.json')[env]; // The method, 'require' is requiring information from the directory name with the root file connected to it, which is cat'd.
var db        = {}; // dont know why the space here is so dramatic.


// 'if()' statement that uses the perameters 'config.use_env_variable'. to tell the new perameters within the variable - that the new 'Sequelize' object, which is a constructor.
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
} // If false(lines 15-17) then I am guessing this is telling the server to sequalize the database to configure the given perameters listed.


// Calling the 'fs', which is declaring a filesystem module.  It is calling a method called 'readdirSync()'.
// "The fs.readdirSync() method is used to synchronously read the contents of a given directory. The method returns an array with all the file names or objects in the directory. The options argument can be used to change the format in which the files are returned from the method."
// In this case, the 'readdirSync()' method has a perameter of '__dirname' which is telling it that with the directory name, read it in an array.
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
