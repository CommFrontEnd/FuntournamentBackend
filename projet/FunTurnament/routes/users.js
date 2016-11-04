var express = require('express');
var router = express.Router();
var userService = require('../services/usersService.js');


/* GET users listing. */
var userController = {

	createUser : function(req, res, next) {

		userService.createUser(req.db, req.body).then(function(data) {
			res.send("Utilisateur ajouté en base");
		}).catch(function(e){
			res.send(e.message);
		});
		
	},

	findAllUser : function(req, res, next) {

		userService.findAllUser(req.db).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},

	findByEmail : function(req, res, next) {

		userService.findByEmail(req.db,req.params).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	}

}


////////////

function proxy(callback){
	return function(req, res, next){
		var _oldSend = res.send;
		console.log("sorti");
		res.send = function(_result){
			var result = typeof _result === 'string' ? _result : JSON.stringify(_result);
					console.log("sordsti");
			return _oldSend(result);
		}
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
router.get('/:email', userController.findByEmail);

module.exports = router;
