var express = require('express');
var router = express.Router();
var dao = require('../dao/dao.js');

/* GET users listing. */


//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files   <----

// CREER UN JOUEUR
router.put('/', function(req, res, next) {
	var user = req.body.user
	console.log(user);
	//vérifier unicité de l'email
	if(user.name != undefined && user.firstName != undefined && user.email != undefined && user.password != undefined
			&& (user.isSII === false || user.isSII === true)){
		daoSetDB(req.db, "Users");
		daoInsertInTable(user, function(data) {
		if(!data.erreur){
			res.send("Utilisateur ajouté en base");
		}else{
			res.send(data.message)
		}
	});
	}else{
		res.end("Un paramètre est invalide");
	}
});

router.get('/', function(req, res, next) {
	daoSetDB(req.db, "Users");
	daoFindInTable({}, function(data) {
				console.log("data : "+data);
				res.send(JSON.stringify(data));
			});
});

module.exports = router;
