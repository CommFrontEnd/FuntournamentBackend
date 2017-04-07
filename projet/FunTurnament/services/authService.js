var config = require('../config.js');
var dao = require('../dao/dao.js')

module.exports =  (function(){
	'use strict';

	return {
		authenticateUser : authenticateUser,
	};

	////////////

	function myDao(method, params){
		return dao.setDB(config.db.collections.user)[method](params);
	}

	function authenticateUser(db, userAuthentication) {
		return _isAuthenticationValid(userAuthentication).then(function(){
			return myDao("findInTable",{email:userAuthentication.email, password:userAuthentication.password});
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