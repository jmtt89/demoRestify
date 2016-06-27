module.exports = function(database, server, logger) {
  var users = database.users;
  
  //Get all user info
  server.get('/user', function (req, res, next) {
    //Respondes todos los elementos en la Collecion de usuarios
    users.find({}).sort({ username: 1 }).exec(function (err, docs) {
      if(!err){
        res.send(200,docs);
      }else{
        res.send(500,err);
      }
      return next();
    });
  });
  
  //Get User Info 
  server.get('/user/:username', function (req, res, next) {
    //Regresa toda la informacion de algun usuario en particular por todo el username 
    users.findOne({ username: req.params.username }, function (err, doc) {
      if(!err){
        if(doc){
          //Respondes en consecuencia
          res.send(200,doc);
        }else{
          //404 -> Not Found
          res.send(404,req.params.username);
        }
      }else{
        //500 - > Internal Server Error
        res.send(500,err);
      }
      return next();
    });
  });  

  //Create new user
  server.post('/user', function (req, res, next) {

    var user = JSON.parse(req.body);

    //Creas el nuevo usuario, si el usuario existe se sobreescribe
    users.update({'username':user.username},user,{upsert:true,returnUpdatedDocs:true},function(err, numAffected, affectedDocuments, upsert){
      if(!err){
        res.send(200,affectedDocuments);
      }else{
        res.send(500,err);
      }
      return next();
    });
  });

  //Update User 
  server.put('/user/:username', function (req, res, next) {

    var user = JSON.parse(req.body);
    user.username = req.params.username;

    //Actualiza un usuario, si el usuario no existe lo
    users.update({'username':req.params.username},user,{upsert:true,returnUpdatedDocs:true},function(err, numAffected, affectedDocuments, upsert){
      if(!err){
        res.send(200,affectedDocuments);
      }else{
        res.send(500,err);
      }
      return next();
    });
  });

  //Delete User
  server.del('/user/:username', function (req, res, next) {

    // Remove one document from the collection
    // options set to {} since the default for multi is false
    db.remove({ username: req.params.username }, {}, function (err, numRemoved) {
      if(!err){
        res.send(200,'Deleted '+req.params.username);
      }else{
        res.send(500,err);
      }
      return next();
    });
  });
};
