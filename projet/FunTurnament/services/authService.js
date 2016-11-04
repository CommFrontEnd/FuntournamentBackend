var dao = require('../dao/dao.js');

module.exports =  (function(){
	'use strict';

	return {
		authenticateUser : authenticateUser,
	};

	////////////

	function authenticateUser(db, userAuthentication) {
		dao.daoSetDB(db, "Users");
		return _isAuthenticationValid(userAuthentication).then(function(){
			return dao.daoFindInTable(db, {email:authentication.email, password:authentication.password});
		});
	}

	function _isAuthenticationValid(userAuthentication){
		return new Promise(function(resolve, reject){
			if(!!authentication.email && !!authentication.password){
				resolve();
			}else{
				reject({
					message : 'Les informations de connexion sont invalides'
				});
			}
		});
	}
})();