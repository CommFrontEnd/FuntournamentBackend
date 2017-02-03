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
		return dao.setDB(config.db.collections.event)[method].apply(null, params);
	}

	function findAllEvent() {
		return myDao("findInTable",{});
	}

	function findById(params) {
		return dao.findInTable({_id:params._id});
	}

	function findByType(params) {
		return dao.findInTable({type:params.type});
	}

	function createEvent (event) {
		return _isEventValid(event)
			.then(function(data){
				return _doInsertEvent(data, event);
			});
	}

	function deleteEvent(params) {
		return findById(params).then(function(){
			return dao.deleteInTable({_id:params._id});
		});
	}

	function updateEvent(params) {
		//TODO
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
				dao.insertInTable(event);
				resolve();
			}else{
				reject({
					message : 'Un événement existe déjà avec ce nom'
				});
			}
		});
	}

})();
