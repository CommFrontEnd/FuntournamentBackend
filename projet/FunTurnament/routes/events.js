var express = require('express');
var router = express.Router();
var eventService = require('../services/eventsService.js');


/* GET events listing. */
var eventController = {

	createEvent : function(req, res, next) {

		eventService.createEvent(req.body).then(function(data) {
			res.send("Evénement ajouté en base");
		}).catch(function(e){
			res.send(e.message);
		});	
		
	},

	findAllEvent : function(req, res, next) {
			
		eventService.findAllEvent().then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},	

	findEvent : function(req, res, next) {
		eventService.findEvent(req.params).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},

	findByType : function(req, res, next) {
		eventService.findByType(req.params).then(function(data) {
			res.send(data);
		}).catch(function(e){
			res.send(e.message);
		});

	},

	deleteEvent : function(req, res, next) {
		eventService.deleteEvent(req.params).then(function(data) {
			res.send("Evénement supprimé ");
		}).catch(function(e){
			res.send(e.message);
		}); 

	},

	updateEvent : function(req, res, next) {
		eventService.updateEvent(req.body).then(function(data) {
			res.send("Evénement modifié ");
		}).catch(function(e){
			res.send(e.message);
		}); 
	}
}


////////////

//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files   <----

// TODO
/*routes = {
	{ route : '/', method :'put', service : eventController.createEvent}
}*/

// CREER UN EVENEMENT
router.post('/', eventController.createEvent);

// FIND ALL
router.get('/', eventController.findAllEvent);

// FIND BY ID
router.get('/:id', eventController.findEvent);

// FIND BY TYPE
router.get('/:type', eventController.findByType);

// SUPPRIMER UN EVENEMENT
router.delete('/:id', eventController.deleteEvent);

// MODIFICATION D'UN EVENEMENT
router.put('/', eventController.updateEvent);

module.exports = router;
