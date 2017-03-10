

//============================= DAO =============================
module.exports = (function(){
	'use strict';

	//MONGODB
	//var mongo = require('mongodb');
	var monk = require('monk');
	var config = require('../config');
	var db = monk(config.db.connectionString);

	var collection;
	
	return {
		setDB : setDB,
		insertInTable : insertInTable	,
		findInTable : findInTable,	
		updateTable : updateTable,
		eraseTable : eraseTable,
		deleteInTable : deleteInTable
	};
	//Paramétrer la base utilisée lors des prochaines commandes
	function setDB(_collection)
	{
		collection = db.get(_collection);
		return this;
	}

	//Insérer données dans la table
	//_data de la forme : [ {"id" : "value"},{...} ]
	function insertInTable(_data)
	{
		return new Promise(function(resolve, reject){
			collection.insert(
				_data,
				function(err, result) {
					if(err) {
						reject({"message" : "Il y a un problème pour insérer les données dans la base."});
					} else {
						resolve();
					}
			});
		});

		
	}


	//Trouver des données dans la table en fonction d'un paramère
	//_param de la forme : {"id" : value}
	function findInTable(_param)
	{
		return new Promise(function(resolve, reject){
			console.log(_param);
			collection.find(
				_param,
				function(err, result) {
					console.log("findInTable :" + result);
					if(err) {
						reject({"message" : "Aucune donnée ne correspond."});
					} else {
						resolve(result);
					}
			});
		});
	}


	//Mettre à jour une donnee dans la table
	function updateTable(_query,_param, func)
	{
		return new Promise(function(resolve, reject){
			collection.update(
				_query,
				_param,
				function(err, result) {
					if(err) {
						reject({"message" : "Il y a un problème pour insérer les données dans la base."});
					} else {
						resolve();
					}
			});
		});
	}


	//Effacer la table en entrée
	// #DROPTABLE
	function eraseTable()
	{
		return new Promise(function(resolve, reject){
			collection.drop(
				function(err, result) {
					if(err) {
						reject({"message" : "Il y a un problème pour supprimer les données dans la base."});
					} else {
						resolve()
					}
			});
		});
	}

	function deleteInTable (_param){
		return new Promise(function(resolve, reject){
			collection.remove(
			_param,
				function(err, result) {
					if(err) {
						reject({"message" : "Aucune donnée à supprimer ne correspond."});
					} else {
						resolve(result);
					}
				}
			);
		});
	}

})();
