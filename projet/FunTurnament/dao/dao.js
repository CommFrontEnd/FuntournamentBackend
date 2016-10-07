//============================= DAO =============================
module.exports = (function(){
	'use strict';
	
	var db;
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
	function daoInsertInTable(_data, func)
	{
		collection.insert(		
			_data,		
			function(err, doc) {
				if(err) {
					func({ "erreur" : true, "message" : "Il y a un problème pour insérer les données dans la base."});
				}
				else {
					func({ "erreur" : false, "message" : "succès !" });
				}
		})
	}


	//Trouver des données dans la table en fonction d'un paramère
	//_param de la forme : {"id" : value}
	function daoFindInTable(_param, func)
	{
		collection.find(_param, function(e,docs){			
			func(docs);
		});
	}


	//Mettre à jour une donnee dans la table
	function daoUpdateTable(_query,_param, func)
	{
		collection.update(
			_query,
			_param,
			function (err, result) {
				if (err) func({ "erreur" : true, "message" : "Il y a un problème pour insérer les données dans la base."});
				}
			);
	}


	//Effacer la table en entrée
	// #DROPTABLE
	function daoEraseTable()
	{
		collection.drop();
	}

})();
