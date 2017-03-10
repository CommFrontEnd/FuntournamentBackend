var config = require('../config.js');
var dao = require('../dao/dao.js');

module.exports =  (function(){	
	'use strict';

	return {
		findAllEvent : findAllEvent,
		findById : findById,
		findByType : findByType,
		createEvent : createEvent,
		deleteEvent : deleteEvent,
		updateEvent : updateEvent
	};

	////////////

	function myDao(method, params){
		return dao.setDB(config.db.collections.event)[method](params);
	}

	function findAllEvent() {
		return myDao("findInTable",{});
	}

	function findById(params) {
		return myDao("findInTable",{_id:params.id});
	}

	function findByType(params) {
		return myDao("findInTable",{type:params.type});
	}

	function createEvent (event) {
		return _isEventValid(event)
			.then(function(data){
				return _doInsertEvent(data, event);
			});
	}

	function deleteEvent(params) {
		return findById(params)
			.then(function(result){
				return _isExist(result, false);
			}).then(function(){
			return myDao("deleteInTable",{_id:params.id});
		});
	}

	function updateEvent(params) {
		return _isEventValid(params)
			.then(function(){
				return findById(params);
			})
			.then(function(result){
				return _isExist(result, false);
			})
			.then(function(){
				return _doUpdateEvent(params);
			});
	}

	function _isEventValid(event){
		return new Promise(function(resolve, reject){
			if(!!event.name && !!event.type){
				resolve();
			}else{
				reject({
					message : 'Un paramètre est invalide'
				});
			}
		});
	}

	function _doInsertEvent(data, event){
		return new Promise(function(resolve, reject){
			if(!data || data.length === 0 ){
				myDao("insertInTable",event);
				resolve();
			}else{
				reject({
					message : 'Un événement existe déjà avec ce nom'
				});
			}
		});
	}

	function _isExist(result, rejectIfFind){
		console.log("_isExist ==> Result = ");
		console.log(result);
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

	function _doUpdateEvent(event) {
		// TODO : Corriger bug d'enregistrement de la donnée en base
		myDao("updateTable",{event});
	}

})();
