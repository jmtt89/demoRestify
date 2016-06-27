module.exports = function(database, server, logger) {
  
  // Sample route
  server.get('/test', function (req, res, next) {
    res.send({ 'result': 'test' });      
    return next();
  });
  
};
