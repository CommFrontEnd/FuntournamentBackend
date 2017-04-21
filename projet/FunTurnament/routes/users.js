var express = require('express');
var router = express.Router();
var userService = require('../services/usersService.js');


/* GET users listing. */
var userController = {

	createUser : function(req, res, next) {

		userService.createUser(req.body).then(function(data) {
			res.send("Utilisateur ajouté en base");
		}).catch(function(e){
			res.send(e.message);
		});	
		
	},

	findAllUser : function(req, res, next) {
			
		userService.findAllUser().then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},	

	findUser : function(req, res, next) {
		userService.findUser(req.params).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},

	deleteUser : function(req, res, next) {
		userService.deleteUser(req.params).then(function(data) {
			res.send("Utilisateur supprimé ");
		}).catch(function(e){
			res.send(e.message);
		}); 

	},

	updateUser : function(req, res, next) {

		userService.updateUser(req.body).then(function(data) {
			res.send("Utilisateur mis à jour en base");
		}).catch(function(e){
			res.send(e.message);
		});	
		
	}

}


////////////

function proxy(callback){
	return function(req, res, next){
		var _oldSend = res.send;
		res.send = function(_result){	
			var result = typeof _result === 'string' ? _result : JSON.stringify(_result);
					console.log("sordsti " +_result);
			return _oldSend(result);
		};

		callback();
	};
}


//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files   <----

// TODO
/*routes = {
	{ route : '/', method :'put', service : userController.createUser}
}*/

// CREER UN JOUEUR
router.post('/', userController.createUser);

// FIND ALL
router.get('/', userController.findAllUser);

// FIND BY EMAIL
router.get('/:email', userController.findUser);

// Supprimer UN JOUEUR
router.delete('/:email', userController.deleteUser);

// MAJ UN JOUEUR
router.put('/', userController.updateUser);

module.exports = router;
