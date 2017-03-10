# FuntournamentBackend
Backend of Funtournament project

Pré-requis :
- installer node
- installer mongoDB
- modifier les paths dans "projet\start_mongo.bat"
- exécuter "npm install" pour installer toutes les dépendances définies dans "package.json"
- installer postman

Démarrage serveur + base :
- démarrer la base de données en exécutant le fichier de commande "projet\start_mongo.bat"
- se placer dans le répertoire "projet/FunTournament" et ouvrir une console Windows
- démarrer le serveur avec la commande "npm run startdev".

# Data Structures : 
user : 
- name (string)
- firstName (string)
- password (string)
- isSII (boolean)
- email (string)

team : 
- users (user[])
- score

event : 
- name 
- date (string ==> "DD/MM/YYYY")
- type (string ==> "foot", "bad", "babyfoot")
- teams (team[])

