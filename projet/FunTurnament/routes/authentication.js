var express = require('express');
var router = express.Router();
var authService = require('../services/authService.js');

/* GET users listing. */
var authenticationController = {

	authenticate : function(req, res, next) {

		authService.authenticateUser(req.db, req.body.authentication).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});
	}
}

	// AUTHENTICATE
router.post('/', authenticationController.authenticate);

module.exports = router;