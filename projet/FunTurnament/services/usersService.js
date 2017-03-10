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
		return dao.setDB(config.db.collections.user)[method](params);
	}

	function findAllUser() {
		return myDao("findInTable",{});
	}

	function deleteUser(params) {
		return findByEmail(params).then(function(result){
				return _isExist(result, false);
			})
			.then(function(){
				return myDao("deleteInTable",{email:params.email});
			});
	}

	function findByEmail(params) {
		return myDao("findInTable",{email:params.email});
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

	function updateUser(user){
		return _isUserValid(user)
			.then(function(){
				console.log(user);
				return findByEmail(user);
			})
			.then(function(){
				return _isExist(user);
			})
			.then(function(data){
				return _doUpdateUser(data, user);
			});
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

	function _isExist(result, rejectIfFind){
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

	function _doInsertUser(data, user){
		return new Promise(function(resolve, reject){
			if(!data || data.length === 0 ){
				myDao("insertInTable", user);
				resolve();
			}else{
				reject({
					message : 'Un utilisateur existe déjà avec cet email'
				});
			}
		});
	}

	function findById(){
		//TODO reject si non trouvé
		return dao.findInTable({email:params._id});
	}

	function _doUpdateUser(data,user) {
		if(!data || data.length === 0 ){
			// TODO finish update
				myDao("updateTable",{user});
				resolve();
			}else{
				reject({
					message : 'Un utilisateur existe déjà avec cet email'
				});
			}
	}

})();
