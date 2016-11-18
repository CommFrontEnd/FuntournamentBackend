var config = require('../config.js');
var dao = require('../dao/dao.js').setDB(config.db.collections.user);

module.exports =  (function(){
	'use strict';

	return {
		authenticateUser : authenticateUser,
	};

	////////////

	function authenticateUser(db, userAuthentication) {
		return _isAuthenticationValid(userAuthentication).then(function(){
			return dao.findInTable({email:userAuthentication.email, password:userAuthentication.password});
		});
	}

	function _isAuthenticationValid(userAuthentication){
		return new Promise(function(resolve, reject){
			if(!!userAuthentication.email && !!userAuthentication.password){
				resolve();
			}else{
				reject({
					message : 'Les informations de connexion sont invalides'
				});
			}
		});
	}
})();