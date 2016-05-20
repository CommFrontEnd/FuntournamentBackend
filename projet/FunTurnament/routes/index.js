var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("I am root");
});


router.get('/users', function(req, res, next) {
	daoSetDB(req.db, "Users");
	daoFindInTable({}, function(data) {
				console.log("data : "+data);
				res.send(JSON.stringify(data));
			});
});




//============================= DAO =============================

	var db;
	var collection;

	//ParamÃ©trer la base utilisÃ©e lors des prochaines commandes
	function daoSetDB(_db, _collection)
	{
		db = _db;
		collection = db.get(_collection);
	}

	//InsÃ©rer donnÃ©es dans la table
	//_data de la forme : [ {"id" : "value"},{...} ]
	function daoInsertInTable(_data, func)
	{
		collection.insert(		
			_data,		
			function(err, doc) {
				if(err) {
					func({ "erreur" : true, "message" : "Il y a un problÃ¨me pour insÃ©rer les donnÃ©es dans la base."});
				}
				else {
					func({ "erreur" : false, "message" : "succÃ¨s !" });
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


	module.exports = router;


module.exports = router;
