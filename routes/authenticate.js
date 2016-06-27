module.exports = function(server, logger) {
  
  //Login 
  server.get('/auth/:username/:password', function (req, res, next) {

  	//Obtienes el username && password
  	var username = req.params.username;
  	var password = req.params.password;

  	//Validas con la Base de Datos
  	var status = 401; //401 -> Unauthorized (por defecto)

  	var user = users.find({'username':username}) //Busca el usuario en la DB

  	//Si el usuario existe y tiene el password correcto, 
  	if(user && user.password == password){
  		status = 200;
  	}

  	//Respondes en consecuencia
    res.send(status,{ 'Authenticate': status == 200 });      
    return next();
  });
  
};