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
<<<<<<< HEAD
				return findByEmail(user);
			})
			.then(function(){
				return findById(user); // TODO remlacer par isExist => cf delete
=======
				console.log(user);
				return findByEmail(user);
			})
			.then(function(){
				return _isExist(user);
>>>>>>> 8d40eba701c1da8ce860cf889febe639f1018f40
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

	// TODO : Mettre dans une classe util + ajouter message paramétré
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
			if(!data || data.length === 0 ){ // TODO : supprimer test
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
		//TODO si appelé par route => ajouter isExist
		return dao.findInTable({email:params._id});
	}

	function _doUpdateUser(data,user) {
		if(!data || data.length === 0 ){ // TODO : supprimer test
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
