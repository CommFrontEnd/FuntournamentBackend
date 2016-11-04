//============================= DAO =============================
module.exports = (function(){
	'use strict';
	
	var db ;
	var collection;
	
	return {
		daoSetDB : daoSetDB,
		daoInsertInTable : daoInsertInTable,
		daoFindInTable : daoFindInTable,
		daoUpdateTable : daoUpdateTable,
		daoEraseTable : daoEraseTable
	};

	//Paramétrer la base utilisée lors des prochaines commandes
	function daoSetDB(_db, _collection)
	{
		db = _db;
		collection = db.get(_collection);
	}

	//Insérer données dans la table
	//_data de la forme : [ {"id" : "value"},{...} ]
	function daoInsertInTable(_data)
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
	function daoFindInTable(_param)
	{
		return new Promise(function(resolve, reject){
			collection.find(
				_param,
				function(err, result) {
					if(err) {
						reject({"message" : "Aucune donnée ne correspond."});
					} else {
						resolve(result);
					}
			});
		});
	}


	//Mettre à jour une donnee dans la table
	function daoUpdateTable(_query,_param, func)
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
	function daoEraseTable()
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

})();
