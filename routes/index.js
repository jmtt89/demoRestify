/* global __dirname:true */
   
var fs   = require('fs'),
    path = require('path'),
    loki = require('loki');

var Datastore = require('nedb')
  , users = new Datastore({ filename: 'users', autoload: true });
    
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
      require(path.join(__dirname, route))(server, logger);
    } catch (err) {
      throw new Error("Can't load '" + route + "' route");
    }
  });
};
