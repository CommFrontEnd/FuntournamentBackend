var dao = require('../dao/dao.js');

module.exports =  (function(){
	'use strict';

	return {
		findAllUser : findAllUser,
		findByEmail : findByEmail,
		createUser : createUser
	};

	////////////

	function findAllUser(db) {
		dao.daoSetDB(db, "Users");
		return dao.daoFindInTable({});
	}

	function findByEmail(db, params) {
		dao.daoSetDB(db, "Users");
		return dao.daoFindInTable({email:params.email});
	}

	function createUser (db, user) {
		dao.daoSetDB(db, "Users");
		return _isUserValid(user)
			.then(function(){
				return findByEmail(db, user.email);
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
			return dao.daoInsertInTable(user);
		}
		return null;
	}

})();
