var db = new loki('loki.json');
var users = db.addCollection('users');

module.exports = function(server, logger) {
  
  //Get all user info
  server.get('/user', function (req, res, next) {
    //Respondes todos los elementos en la Collecion de usuarios
    res.send(200,users.data);
    return next();
  });
  
  //Get User Info 
  server.get('/user/:username', function (req, res, next) {

  	//Obtienes el username && password
  	var username = req.params.username;

  	//Validas con la Base de Datos
  	var status = 404; //404 -> Not Found

  	var user = users.find({'username':username}) //Busca el usuario en la DB

  	//Si el usuario existe
  	if(user){
  		status = 200;
  	}

  	//Respondes en consecuencia
    res.send(status,user);      
    return next();
  });  

  //Create User Info 
  server.post('/user/:username', function (req, res, next) {

    //Obtienes el username
    var username = req.params.username;

    //Consigues toda la data del usuario traida en el Body
    var newUser = req.body;

    //Agregas la informacion del username
    newUser.username = req.params.username;


    users.update({'username':username},newUser,{upsert:true},function(err, numAffected, affectedDocuments, upsert){
      if(!err){

      }else{
        
      }
    });


    //Busca el usuario en la DB
    var user = users.find()

    //Si el usuario no existe, lo creas
    if(!user){
      users.insert(newUser, function (err, newDoc) {
        //Respondes en consecuencia
        res.send(200,newDoc);      
        return next();
      });
    }else{
      //Responder si el usuario existe
      //406 -> Not Acceptable
      var error = "User "+username+" already exist use PUT instead"
      res.send(406,error);
      return next();
    }
  });

  //Set User Info 
  server.put('/user/:username', function (req, res, next) {

    //Obtienes el username
    var username = req.params.username;

    //Validas con la Base de Datos
    var status = 404; //404 -> Not Found
    var error = "User "+username+" not exist use POST instead"

    //Busca el usuario en la DB
    var user = users.find({'username':username})

    //Si el usuario existe, lo actualizas
    if(user){
      status = 200;

      //Actualizas la informacion que viene el body
      for (var key in req.body){
        if (typeof req.body[key] !== 'function') {
          user[key] = req.body[key];
        }
      }

      
    }

    //Respondes en consecuencia
    res.send(status,status==200?user:error);      
    return next();

    //Si el usuario no existe, lo creas
    if(!user){
      users.insert(newUser, function (err, newDoc) {
        //Respondes en consecuencia
        res.send(200,newDoc);      
        return next();
      });
    }else{
      //Responder si el usuario existe
      //406 -> Not Acceptable
      var error = "User "+username+" already exist use PUT instead"
      res.send(406,error);
      return next();
    }
  });

  //Delete User
  server.del('/user/:username', function (req, res, next) {

    //Obtienes el username
    var username = req.params.username;

    //Validas con la Base de Datos
    var status = 404; //404 -> Unauthorized (por defecto)

    var user = users.find({'username':username}) //Busca el usuario en la DB

    //Si el usuario existe eliminalo, 
    if(user){
      status = 200;
      users.remove(user);
    }

    //Respondes en consecuencia
    res.send(status,user);
    return next();
  });
};
