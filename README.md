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