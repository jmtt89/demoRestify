module.exports = function(database, server, logger) {
  var users = database.users;
  
  //Login 
  server.get('/auth/:username/:password', function (req, res, next) {

    //Revisa si existe alguna dupla username,password registrada 
    users.findOne({ username: req.params.username , password: req.params.password }, function (err, doc) {
      if(!err){
        if(doc){
          //Respondes en consecuencia
          res.send(200,doc);
        }else{
          //404 -> Unauthorized
          res.send(401,req.params.username);
        }
      }else{
        //500 - > Internal Server Error
        res.send(500,err);
      }
      return next();
    });

  });
  
};