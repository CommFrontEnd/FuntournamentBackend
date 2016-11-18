var config = require('../config.js');
var dao = require('../dao/dao.js').setDB(config.db.collections.user);

module.exports =  (function(){
	'use strict';

	return {
		findAllUser : findAllUser,
		findByEmail : findByEmail,
		createUser : createUser
	};

	////////////

	function findAllUser() {
		return dao.findInTable({});
	}

	function findByEmail(params) {
		return dao.findInTable({email:params.email});
	}

	function createUser (user) {
		return _isUserValid(user)
			.then(function(){
				return findByEmail(user.email);
			})
			.then(function(data){
				return _doInsertUser(data, user);
			});
	}

	function _isUserValid(user){
		return new Promise(function(resolve, reject){
			if(!!user.name && !!user.firstName && !!user.email && !!user.password && typeof user.isSII === 'boolean'){
				resolve();
			}else{
				reject({
					message : 'Un paramètre est invalide'
				});
			}
		});
	}

	function _doInsertUser(data, user){
		console.log("inside _doInsertUser with data : " + data); 
		if(!data || data.length === 0 ){
			return dao.insertInTable(user);
		}
		return null;
	}

})();
