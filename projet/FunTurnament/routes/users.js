var express = require('express');
var router = express.Router();
var dao = require('../dao/dao.js');


/* GET users listing. */
var userController = {

	createUser : function(req, res, next) {
		var user = req.body.user
		//vérifier unicité de l'email
		if(!user.name && !user.firstName && !user.email && !user.password && typeof user.isSII === 'boolean'){
			dao.daoSetDB(req.db, "Users");
			dao.daoInsertInTable(user, function(data) {
				if(!data.erreur){
					res.send("Utilisateur ajouté en base");
				}else{
					res.send(data.message)
				}
			});
		}else{
			res.send("Un paramètre est invalide");
		}
	},

	findAllUser : function(req, res, next) {
		dao.daoSetDB(req.db, "Users");
		dao.daoFindInTable({}, function(data) {
			res.send(JSON.stringify(data));
		});
	},

	findByEmail : function(req, res, next) {
		dao.daoSetDB(req.db, "Users");
		dao.daoFindInTable({email:req.params.email}, function(data) {
			res.send(JSON.stringify(data));
		});
	}

}

//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files   <----

// TODO
/*routes = {
	{ route : '/', method :'put', service : userController.createUser}
}*/

// CREER UN JOUEUR
router.put('/', userController.createUser);

// FIND ALL
router.get('/', userController.findAllUser);

// FIND BY EMAIL
router.get('/:email', userController.findByEmail);

module.exports = router;
