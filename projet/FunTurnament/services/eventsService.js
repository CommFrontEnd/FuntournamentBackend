var config = require('../config.js');
var dao = require('../dao/dao.js');

module.exports =  (function(){	
	'use strict';

	return {
		findAllEvent : findAllEvent,
		findEvent : findEvent,
		findByType : findByType,
		createEvent : createEvent,
		deleteEvent : deleteEvent,
		updateEvent : updateEvent
	};

	////////////

	function myDao(method, params, body){
		return dao.setDB(config.db.collections.event)[method](params, body);
	}

	function findAllEvent() {
		return myDao("findInTable",{});
	}

	function findEvent(params) {
		return _findById(params.id)
			.then(result => _isExist(result, false));
	}

	function findByType(params) {
		return myDao("findInTable",{type:params.type});
	}

	function createEvent (event) {
		return _isEventValid(event)
			.then(() => _doInsertEvent(event));
	}

	function deleteEvent(params) {
		return _findById(params.id)
			.then(result => _isExist(result, false))
			.then(() => _doDeleteEventById(params.id));
	}

	function updateEvent(params) {
		return _isEventValid(params)
			.then(() => _findById(params._id))
			.then(result => _isExist(result, false))
			.then(() => _doUpdateEvent(params));
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

	function _doInsertEvent(event){
		return myDao("insertInTable", event);
	}

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
				resolve(result);
			}
		});
	}

	function _doUpdateEvent(event) {
		myDao("updateTable",{_id:event._id}, event);
	}

	function _findById(id) {
		return myDao("findInTable",{_id:id});
	}

	function _doDeleteEventById(id){
		return myDao("deleteInTable",{_id:id});
	}

})();
