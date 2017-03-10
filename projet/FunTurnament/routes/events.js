var express = require('express');
var router = express.Router();
var eventService = require('../services/eventsService.js');


/* GET events listing. */
var eventController = {

	createEvent : function(req, res, next) {

		eventService.createEvent(req.body).then(function(data) {
			res.send("Evenement ajouté en base");
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

	findById : function(req, res, next) {
		eventService.findById(req.params).then(function(data) {
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
			res.send("Evenement supprimé ");
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

// CREER UN JOUEUR
router.post('/', eventController.createEvent);

// FIND ALL
router.get('/', eventController.findAllEvent);

// FIND BY ID
router.get('/:id', eventController.findById);

// FIND BY TYPE
router.get('/:type', eventController.findByType);

// Supprimer UN JOUEUR
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
