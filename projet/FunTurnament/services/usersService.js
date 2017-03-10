var config = require('../config.js');
var dao = require('../dao/dao.js');

module.exports =  (function(){	
	'use strict';

	return {
		findAllUser : findAllUser,
		findByEmail : findByEmail,
		createUser : createUser,
		deleteUser : deleteUser,
		updateUser : updateUser
	};

	////////////
	function myDao(method, params){
		console.log("updateTable");
		console.log(_query);
		return dao.setDB(config.db.collections.user)[method](params);
	}

	function findAllUser() {
		return myDao("findInTable",{});
	}

	function deleteUser(params) {
		return findByEmail(params)
			.then(result => _isExist(result, true))
			.then(() => _doDeleteUserByEmail(params.email));
	}

	function findByEmail(params) {
		return myDao("findInTable",{email:params.email});
	}

	function createUser (user) {
		return _isUserValid(user)
			.then(() => findByEmail(user))
			.then(result => _isExist(result, true))
			.then(() => _doInsertUser(user));
	}

	function updateUser(user){
		return _isUserValid(user)
			.then(() => findById(user))
			.then(result => _isExist(result, false))
			.then(() => _doUpdateUser(user));
	}	

	function _isUserValid(user){
		return new Promise(function(resolve, reject){
			if(user.name && user.firstName && user.email && user.password && typeof user.isSII === 'boolean'){
				resolve();
			}else{
				reject({
					message : 'Un paramètre est invalide'
				});
			}
		});
	}

	// TODO : Mettre dans une classe util + ajouter message paramétré
	function _isExist(result, rejectIfFind, messageIfExist, messageIfNotExist){
		return new Promise(function(resolve, reject){
			if((result.length > 0 && rejectIfFind)) {
				reject({
					message : 'Elément existant'
				});
			}else if(result.length === 0 && !rejectIfFind){
				reject({
					message : 'Elément inexistant'
				});
			}else{
				resolve();
			}
		});
	}

	function _doInsertUser(user){
		return myDao("insertInTable", user);
	}

	function _doDeleteUserByEmail(email){
		return myDao("deleteInTable",{email:email});
	}

	function findById(user){
		return myDao("findInTable", {_id:user._id});
	}

	function _doUpdateUser(user) {
		return myDao("updateTable", {_id:user._id}, user);
	}

})();
