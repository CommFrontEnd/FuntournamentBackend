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


	//Trouver des donnÃ©es dans la table en fonction d'un paramÃ¨tre
	//_param de la forme : {"id" : value}
	function daoFindInTable(_param, func)
	{
		collection.find(_param, function(e,docs){			
			func(docs);
		});
	}


	//Mettre Ã  jour une donnÃ©e dans la table
	function daoUpdateTable(_query,_param, func)
	{
		collection.update(
			_query,
			_param,
			function (err, result) {
				if (err) func({ "erreur" : true, "message" : "Il y a un problÃ¨me pour insÃ©rer les donnÃ©es dans la base."});
				}
			);
	}


	//Effacer la table en entiÃ¨re
	// #DROPTABLE
	function daoEraseTable()
	{
		collection.drop();
	}

})();
