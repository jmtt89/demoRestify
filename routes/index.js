/* global __dirname:true */
   
var fs   = require('fs'),
    path = require('path'),
    Datastore   = require('nedb');

var DB = {};
DB.users = new Datastore({ filename: 'users.db', autoload: true });
DB.test  = new Datastore({ filename: 'test.db' , autoload: true });
// DB.users = new Datastore();
// DB.test  = new Datastore();


function initialize(server, logger) {
  
  server.get('/', function (req, res, next) {
    res.send({ 'message': 'Restify is online and operational.' });      
    return next();
  });
  
};

var routes = [
  'test',
  'authenticate',
  'user'
];

module.exports = function(server, logger) {
  initialize(server, logger);
  
  routes.forEach(function (route) {
    try {
      console.log(path.join(__dirname, route))
      require(path.join(__dirname, route))(DB, server, logger);
    } catch (err) {
      throw new Error("Can't load '" + route + "' route");
    }
  });
};
