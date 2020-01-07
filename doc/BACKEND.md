---
title: "scanR data layer documentation"
authors: "A2_4"
date: "06-01-2020"
---

# scanR data layer documentation.

## 1. Introduction.

scanR est une application web permettant d'explorer la recherche et l'innovation française. Plus précisément, il s'agit d'une combinaison de quatre moteurs de recherche respectivement construit en indexant des données structurées et semi-structurées relatives à quatre types d'objets:
  - des organisations accueillant, favorisant ou finançant de la R&D (ci-après structures ou organisations),
  - des financements ou des projets de recherche,
  - des productions scientifiques (brevets, publications, thèses),
  - des auteurs de productions scientifiques.

L'application globale se décompose en trois couches principales.

  1. le front-office, chargé de produire une interface utilisateur à l'application. Elle est intégralement gérée et dévellopée par le département d'outil d'aide à la décision du ministère de l'enseignement supérieur de la recherche et de l'innovation.

  2. le back-office, chargée d'indexer les données dans un moteur de recherche et de fournir des api pour le requètage du moteur pour une servir l'application front-office. Ce service est opéré intégralement par le préstataire du ministère, le groupe SWORD.

  3. dataESR, l'application chargée de collecter les données, de les transformer, de les enrichir, de les corriger et de les exposer. Cette couche, plus générale que les deux autres exclusivement dévolue à scanR, est décrite plus en détail dans le présent document.


## 2. Architecture générale.

L'application est segmentée en plusieurs services conteneurisés et stocke les données sur une instance mongoDB.
Chaque micro-service a une responsabilité limité à son propre périmètre et la défaillance d'un service ne provoque pas la destruction de toute l'application. Néanmoins, certains services interconnectés peuvent ne pas être complètement opérationnel si un service dépendant est indisponible.
Chaque service peut avoir une ou plusieurs missions parmis les suivantes:
  - Collecte de données,
  - Transformation de données,
  - Enrichissement de données,
  - Exposition API de données,
  - Export de données,
  - Interface utilisateur,
  - Reverse proxy.

Aucune donnée stocké par l'application


### 2.1 Base de données.

L'application stocke l'intégralité de ses données sur une instance mongoDB. Cette instance peut être distante ou installée sur la même machine (comme c'est le cas sur notre serveur). La configuration de connexion à cette instance mongoDB se fait grâce au fichier .env des services qui l'utilisent. Chaque service, s'il a besoin de stocker des données, est responsable d'une ou plusieurs collection auxquelles il est le seul à pouvoir accéder. Il propose si nécessaire des API pour que d'autres processus ou d'autres services puisse modifier ou lire ses données. La base de donnée n'est donc pas directement accessible depuis l'extérieur.

### 2.2 Services de l'application.

L'application comporte 13 services qui sont détaillées dans la partie 3 de ce document:
  - nginx -- reverse proxy pour les autres applications
  - geocoder --  Permet le geocodage d'adresses
  - persons -- Gère les personnes/auteurs
  - organizations -- Gère les organisations
  - publications -- Gère les publications
  - patents -- Gère les brevets/inventions
  - projects -- Gère les projets/financements
  - rnsr-fetcher -- 
  - sirene-fetcher
  - ui -- Interface utilisateur d'administration de données et monitoring
  - filebeat -- ETL pour les logs des applications
  - metricbeat -- ETL pour les metriques des applications
  - elasticsearch -- stockage et API pour les logs et les métriques



### 2.3 Technologies utilisées.

Python, avec [flask](https://flask.palletsprojects.com/en/1.1.x/) pour les services web, [celery](http://www.celeryproject.org/) pour les services asyncrones. Les API utilisent le framework [EVE](http://docs.python-eve.org/en/stable/) pour exposer les données de façon 'RESTful'.

Docker et docker-compose sont utilisées pour construire les applications dans des conteneurs.

ReactJS pour les interfaces utilisateur.

Elasticsearch stock et les métriques d'utilisation et les logs des applications fourni par Metricbeat et Filebeat


### 2.3 Instructions de lancement des services

L'application dans son ensemble peut être lancé via un fichier docker-compose.yml sur une seule machine avec la commande ```docker-compose up -d```. Un serveur nginx faisant office de reverse-proxy est lancé également, permettant à tous les services d'être accessible sur le port 80 (et/ou 443) d'une machine.


## 3. Description des services.

### 3.1 RNSR fetcher
[*Github*](http://https://github.com/dataesr/RNSR), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/rnsr-fetcher), [*Swagger*](http://185.161.45.213/fetchers/rnsr/doc)

- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: Base de donnée du RNSR.

Ce service récupère les données des structures de recherche du Répertoire National des structures de recherche (RNSR ci-après) directement via une connexion à la base de donnée RNSR. Cette connexion passe par un tunnel SSH mis en place par la DNE entre le serveur applicatif et le serveur du RNSR. La connexion est sécurisé par identifiant et mot de passe coté RNSR.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que ses liens à d'autres organisations (tutelles, prédécesseurs, parents) et ses responsables.

<details>
  <summary>Voir le modèle de données complet</summary>

  ```json
  {
    "id": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule.",
      "traitement": null
    },
    "description": {
      "type": "string",
      "description": "Description d'une structure de recherche.",
      "traitement": null
    },
    "website": {
      "type": "string",
      "description": "Une URL du site web de la structure",
      "traitement": null
    },
    "type": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "level": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "input_address": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "name": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "dates": {
      "type": "object",
      "object": {
        "start_date": {
          "description": "9 chiffres plus 1 lettre majuscule",
          "traitement": null
        }
        "end_date": {
          "description": "9 chiffres plus 1 lettre majuscule",
          "traitement": null
        }
      }
    },
    "email": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "phone": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "code_numbers": {
      "type": "list(string)",
      "description": "9 chiffres plus 1 lettre majuscule",
      "traitement": null
    },
    "rnsr_domains": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "source": "table: struct, champ: num_nat_struct",
      "traitement": null
    },
    "rnsr_themes": {
      "type": "string",
      "description": "9 chiffres plus 1 lettre majuscule",
      "source": "table: struct, champ: num_nat_struct",
      "traitement": null
    },
    "panels": fields.List(fields.Nested(activities)),
    "predecessors": fields.List(fields.Nested(predecessors)),
    "doctoral_schools": fields.List(fields.Nested(doctoral_schools)),
    "supervisors": fields.List(fields.Nested(supervisors)),
    "parents": fields.List(fields.Nested(parents)),
    "leaders": fields.List(fields.Nested(leaders))
  }
  ```
</details>
<br/>

Certaines données sont nettoyées avant l'exposition par l'API. Des dates sont réconciliées pour dédoublonner au maximum les entrée dans la base. Les adresses sont nettoyées.

L'application expose plusieurs routes permettant de récupérer des informations sur les structures de recherche, dans un format JSON adéquat pour l'application #dataesr. Des routes permettent également de récupérer les données pour une mise en forme CSV pour les jeux RNSR opendata. Pour plus de détails sur l'utilisation de l'API, rendez-vous sur la [documentation swagger](http://185.161.45.213/fetchers/rnsr/doc)


### 3.2 Sirene fetcher

![image](https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png)[*Github*](http://https://github.com/dataesr/sirene), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/sirene-fetcher), [*Swagger*](http://185.161.45.213/fetchers/sirene/doc)

- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: API SIRENE.


Ce service récupère les données des organisations présentes dans le répertoire Sirene via l'[API](https://api.insee.fr/) mise en place par l'insee.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que des codes et libellés de nomenclatures (ie. catégories juridiques, code APE).

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
    "name": "blah"
  }
  ```
</details>
<br/>


Les données sont transformées dans une format plus 'lisible' et adéquat pour l'application #dataesr. Un mapping des type d'organisme est fait afin de coller à la nomenclature des types d'organisations de #dataesr.

L'application expose plusieurs routes permettant de récupérer des informations sur les organisations présentes dans le répertoire sirene, dans un format JSON adequat pour l'application #dataesr. Pour plus de détails, voir la [documentation swagger](http://185.161.45.213/fetchers/sirene/doc)


### 3.3 Geocoder
Voir sur: [*Github Repos*](http://https://github.com/dataesr/geocoder), [*Docker image*](http://https://hub.docker.com/repository/docker/dataesr/geocoder), [*Documentation*](http://185.161.45.213/geocode/doc)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: adresses.gouv.fr, openstreetmap.

Ce service expose une API de géocodage, qui utilise les services de adresse.gouv.fr et d'openstreetmap afin de géocoder une adresse postale. Elle renvoie une adresse géocodée dans le format adresse de #dataesr.

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
    "name": "blah"
  }
  ```
</details>
<br/>


### 3.4 Organisations

Voir sur [*Github*](http://https://github.com/dataesr/organizations), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/organizations), [*Swagger*](http://185.161.45.213/organizations/doc)

- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Collections Mongo*: organizations, tasks, scanr, snapshots_{fetcher}, grid
- *Missions*: Collecte de données, Transformation de données, Exposition API de données, Export de données
- *Dépendances interne*: aucune.
- *Dépendances externe*: Persons, Geocoder, Datastore.

Application dédiée aux organisations dans #dataesr.



### 3. UI

- [*Github Repos*](http://https://github.com/dataesr/nginx)
- [*Docker image*](http://https://hub.docker.com/repository/docker/dataesr/nginx)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Mission*: Interface utilisateurs, Interface monitoring, Enrichissement de données
- *Dépendances interne*: Organisations, Persons, Publications, Patents, Projects, Datastore, Elasticsearch.
- *Dépendances externe*: aucune.


### Elasticsearch, Filebeat, Metricbeat

Ces trois process sont chargés de la récupération et du stockage de métriques et de logs concernant l'application.


### Nginx

- [*Github Repos*](http://https://github.com/dataesr/nginx)
- [*Docker image*](http://https://hub.docker.com/repository/docker/dataesr/nginx)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Mission*: Reverse proxy
- *Dépendances interne*: aucune.
- *Dépendances externe*: aucune.

Ce service sert de reverse proxy à toute l'application. Il écoute le port 80 de la machine sur laquelle est installée l'application et forward les requètes vers le bon service. Il expose ainsi tous les service API, et en aucun cas ne permet un interfaçage direct avec la base de données.

Une authentification BASIC est nécessaire afin d'accéder aux services et celle ci est géré directement par nginx. Si l'authentification est valide, nginx transmet les requètes aux services. Dans le cas contraire, il refuse les connexions.
