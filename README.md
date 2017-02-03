# FuntournamentBackend
Backend of Funtournament project

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

Démarrage serveur + base :

- démarrer la base de données en exécutant le fichier de commande "projet\start_mongo.bat"

- se placer dans le répertoire "projet/FunTournament" et ouvrir une console Windows
- avant le premier lancement, exécuter "npm install" pour installer toutes les dépendances définies dans "package.json"
- démarrer le serveur avec la commande "npm run startdev".


Le serveur est alors lancé et accessible sur le port 3000. Le répertoire routes contient les contrôleurs.