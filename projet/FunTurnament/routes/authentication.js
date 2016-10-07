var express = require('express');
var router = express.Router();
var dao = require('../dao/dao.js');

/* GET users listing. */
var authenticationController = {

	authenticate : function(req, res, next) {
		var authentication = req.body.authentication
		if(!authentication.email && !authentication.password){
			dao.daoSetDB(req.db, "Users");
			dao.daoFindInTable({email:authentication.email, password:authentication.password}, function(data) {
				res.send(JSON.stringify(data));
			});
		}else{
			res.send("Un paramètre est invalide");
		}
	}
}

	// AUTHENTICATE
router.post('/', authenticationController.authenticate);

module.exports = router;