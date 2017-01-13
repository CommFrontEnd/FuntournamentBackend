var config = require('../config.js');
var dao = require('../dao/dao.js').setDB(config.db.collections.user);

module.exports =  (function(){	
	'use strict';

	return {
		findAllUser : findAllUser,
		findByEmail : findByEmail,
		createUser : createUser,
		deleteUser : deleteUser
	};

	////////////

	function findAllUser() {
		return dao.findInTable({});
	}

	function deleteUser(params) {
		return findByEmail(params).then(function(){
			return dao.deleteInTable({email:params.email});
		});
	}

	function findByEmail(params) {
		return dao.findInTable({email:params.email});
	}

	function createUser (user) {
		return _isUserValid(user)
			.then(function(){
				return findByEmail(user);
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
		return new Promise(function(resolve, reject){
			if(!data || data.length === 0 ){
				dao.insertInTable(user);
				resolve();
			}else{
				reject({
					message : 'Un utilisateur existe déjà avec cet email'
				});
			}
		});
	}

})();
