---
title: "scanR data layer documentation"
authors: "A2_4"
date: "06-01-2020"
---

# scanR -- Documentation de l'application de collecte/traitement/stockage/export des données.

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


### 2.4 Instructions de lancement des services

L'application dans son ensemble peut être lancé via un fichier docker-compose.yml sur une seule machine avec la commande ```docker-compose up -d```. Un serveur nginx faisant office de reverse-proxy est lancé également, permettant à tous les services d'être accessible sur le port 80 (et/ou 443) d'une machine.


## 3. Description des services.

### 3.1 RNSR fetcher
[*Github*](https://github.com/dataesr/RNSR), [*Docker*](https://hub.docker.com/repository/docker/dataesr/rnsr-fetcher), [*Swagger*](http://185.161.45.213/fetchers/rnsr/doc)

- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: Base de donnée du RNSR.
- *Fonctionnalité(s)*:
  - Expose les données du RNSR en JSON

Ce service récupère les données des structures de recherche du Répertoire National des structures de recherche (RNSR ci-après) directement via une connexion à la base de donnée RNSR. Cette connexion passe par un tunnel SSH mis en place par la DNE entre le serveur applicatif et le serveur du RNSR. La connexion est sécurisé par identifiant et mot de passe coté RNSR.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que ses liens à d'autres organisations (tutelles, prédécesseurs, parents) et ses responsables.

Certaines données sont nettoyées avant l'exposition par l'API. Des dates sont réconciliées pour dédoublonner au maximum les entrée dans la base. Les adresses sont nettoyées.

L'application expose plusieurs routes permettant de récupérer des informations sur les structures de recherche, dans un format JSON adéquat pour l'application #dataesr. Des routes permettent également de récupérer les données pour une mise en forme CSV pour les jeux RNSR opendata. Pour plus de détails sur l'utilisation de l'API, rendez-vous sur la [documentation swagger](http://185.161.45.213/fetchers/rnsr/doc)


### 3.2 Sirene fetcher

[*Github*](https://github.com/dataesr/sirene), [*Docker*](https://hub.docker.com/repository/docker/dataesr/sirene-fetcher), [*Swagger*](http://185.161.45.213/fetchers/sirene/doc)

- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: API SIRENE.
- *Fonctionnalité(s)*:
  - Expose les données du répertoire SIRENE en JSON


Ce service récupère les données des organisations présentes dans le répertoire Sirene via l'[API](https://api.insee.fr/) mise en place par l'insee.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que des codes et libellés de nomenclatures (ie. catégories juridiques, code APE). Le modèle est détaillé ci-après.

Les données sont transformées dans une format plus 'lisible' et adéquat pour l'application #dataesr. Un mapping des type d'organisme est fait afin de coller à la nomenclature des types d'organisations de #dataesr.

L'application expose plusieurs routes permettant de récupérer des informations sur les organisations présentes dans le répertoire sirene, dans un format JSON adequat pour l'application #dataesr. Pour plus de détails, voir la [documentation swagger](http://185.161.45.213/fetchers/sirene/doc)


### 3.3 Geocoder
Voir sur: [*Github Repos*](https://github.com/dataesr/geocoder), [*Docker image*](https://hub.docker.com/repository/docker/dataesr/geocoder), [*Documentation*](http://185.161.45.213/geocode/doc)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: adresses.gouv.fr, openstreetmap.
- *Fonctionnalité(s)*:
  - Géocode une adresse d'entrée et renvoi une adresse complète et propre avec coordonnées (si trouvées).

Ce service expose une API de géocodage, qui utilise les services de adresse.gouv.fr et d'openstreetmap afin de géocoder une adresse postale. Elle renvoie une adresse géocodée dans le format adresse de #dataesr. Les champs renvoyé sont un mapping des champs revoyés par les adresse.gouv.fr et/ou openstreetmap.


### 3.4 Organisations
Voir sur [*Github*](https://github.com/dataesr/organizations), [*Docker*](https://hub.docker.com/repository/docker/dataesr/organizations), [*Swagger*](http://185.161.45.213/organizations/doc)

- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Collecte de données, Transformation de données, Exposition API de données, Export de données
- *Dépendances interne*: Persons, Geocoder, Datastore.
- *Dépendances externe*: aucune.

Application dédiée aux organisations dans #dataesr. Elle est en charge:
1. du workflow de mise à jour automatique des documents liées aux organisations,
2. de l'exposition d'une API pour les données des organisations, et pour des fonction (notamment de matching d'organisation)
3. de l'export de ces données en une version compatible avec l'application scanR,

#### 3.4.1 Workflow de mise à jour et traitement des données.

La mise à jour d'un document relatif à une organisation se fait avec le point d'entré `_update` qui prend un identifiant d'organisation comme paramètre. Le processus de mise à jour compare ensuite les données sources avec leur version datant de la dernière mise a jour qu'elle avait alors stocké dans des *snapshots*. les différences sont ensuite traitées champ par champ afin d'actualiser les données de l'organisation et la dernière version des données source est stockée dans les *snapshots* pour répéter le processus au prochain appel de l'API `_update`.

Si une seule source de donnée est identifiée pour cette organisation, la mise à jour est simplifiée et les logiques de traitement permettent une mise à jour sans conflit (par exemple, le nom d'une organisation n'ayant qu'un sirene sera mis à jour directement avec les données sirene). Les données précédentes seront conservés avec une date de fin correspondante à la date de la mise à jour. Ainsi, on peut garder un historique des changements opérés sur la base source. Si plusieurs source fournissent des données pour la même organisation, une gestion de conflit existe. Elle peut être soit automatique (par exemple, les champs `type` et `level` fourni par sirene sont systématiquement préféré à ceux fourni par grid) soit marquée comme conflictuelle grâce aux champs `status`. Une intervention est alors nécessaire de la part d'un administrateur de données (les adresses des deux sources ne coïncident pas. Faut-il en privilégier une ? Faut-il garder la deuxième comme adresse secondaire ?). Ces opérations peuvent être faite via l'interface utilisateur ou directement via l'API.

Des traitements sont appliqués et modifient les données source dans certains cas.
Lorsque c'est possible, un effort est fait pour dédoublonner certaines listes (par exemple si une organisation a deux fois une tutelle identique avec des dates successives, une jointure est faite entre les deux éléments pour réconcilier dates de début et dates de fin de relation).
Les adresses sont géocodées grâce à l'application Geocoder mais l'adresse brut est conservée.
Enfin, certains champs avec relations à d'autre structures ou à des personnes sont automatiquement rattaché l'objet correspondant dans #dataesr, lorsque cette opération est possible. Pour les `leaders`, par exemple, l'application utilise le point d'entré `_match` de l'application Persons afin de retrouver l'identifiant idref du leader. Les données bruts de la source sont conservées.
Ces opérations permettent ensuite à scanR de proposer une navigation fluide entre ses différents objets et d'agréger ces données pour des visualisations plus éclairantes.

Ces processus de mise à jour peuvent également être opérés en 'batch', et lancés depuis l'interface utilisateur. Par exemple, 'Raffraîchir RNSR' provoque un update de toutes les organisations ayant un identifiant RNSR et ajoute les nouvelles présentes dans la source.
La même chose peut être fait avec SIRENE et GRID.


#### 3.4.2 APIs et export

Cette application expose une API RESTful de la collection 'organizations' qui est un ensemble de documents représentant des organisations. Le modèle de donnée retenu pour ces documents permet de gérer à la fois un historique des données et des conflits liés à la mise à jour de source que l'application n'a pas pu résoudre avec les règles métiers établies. Il appartient aux administrateurs des données de venir régler les conflits dans l'interface utilisateur, ou via des scripts utilisant l'API. Cette API permet toutes les opérations CRUD à savoir le GET, POST, PATCH et DELETE.

L'application expose aussi une API de matching, permettant d'identifier un document de la collection organisation à partir d'un nom d'organisation. Cette API combine moteur de recherche, et règles métiers afin de fournir (ou de ne pas fournir) un matching le plus qualitatif possible.

Une collection scanR est également exposée. Cette dernière est une vue des données présente dans la collection 'organizations' exportée avec un modèle de donnée utilisable dans scanR. C'est cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD. L'export utilise certaines nomenclatures présentes dans l'application Datastore.


### 3.4 Projects
Voir sur: [*Github Repos*](https://github.com/dataesr/projects), [*Docker image*](https://hub.docker.com/repository/docker/dataesr/projects), [*Documentation*](http://185.161.45.213/projects/doc)
- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: Organizations
- *Fonctionnalité(s)*:
  - Expose les données de projets. Relie les participants à une organisation de #dataesr.

  Les données arrivent dans #dataesr via l'API de l'application. Une opération de matching avec les objets #dataesr est ensuite opérée.
  Cette application a deux collections principales: projets et participants exposés par API avec toutes les méthodes CRUD.

  Les données de projets sont traitées en amont par le département d'outils d'aide à la décision avec comme données source l'ANR, H2020, Parenariat Huber Curien, Casdar, FP7, Innovation2030. Un travail d'alignement des participants au projets et fait avec des méthodes diverses et variées:
   - utilisant des algorithmes de matching sur les nom, adresses,
   - manuels
   - utilisant des données d'organisme de recherche.

  Une collection scanR est également exposée. Cette dernière est une vue des données présente dans la collection 'families' exportée avec un modèle de donnée utilisable dans scanR. Les données présentes dans `participants` et `patents` sont également intégrés pôur chaque famille de brevet. Cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD.


### 3.5 Patents (inventions)
Voir sur: [*Github Repos*](https://github.com/dataesr/patents), [*Docker image*](https://hub.docker.com/repository/docker/dataesr/patents), [*Documentation*](http://185.161.45.213/patents/doc)
- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: Organizations
- *Fonctionnalité(s)*:
  - Expose les données d'inventions. Relie les participants à une organisation de #dataesr.

Les données arrivent dans #dataesr via l'API de l'application. Une opération de matching avec les objets #dataesr est ensuite opérée.

Les données de brevet sont traitées en amont par le département d'outils d'aide à la décision avec comme données source les données de PATSTAT et
de l'INPI. Toutes les informations principales sont tirées de PATSTAT : identifiants (numéros de familles DOCDB, numéros de publication, de dépôt), les dates (de dépôt, publication ou délivrance), les données sur les différents dépôts de la famille ainsi que les données sur les déposants et inventeurs. Les SIREN des déposants ont par contre comme source l'INPI ainsi qu'un recodage automatique et manuel. Dans la première version, les adresses des participants, le sexe et leur type (personne physique ou morale) ne sont pas disponibles mais sont prévus pour l'être par la suite.
Une attention particulière est portée au dédoublonnage des déposants et inventeurs (car ces informations sont disponibles par dépôt et elles sont rendues disponibles par famille, donc regroupées) et un matching de ces derniers avec les bases de données d'organisation et ou de personnes permet de relier invention et organisation.

Une collection scanR est également exposée. Cette dernière est une vue des données présente dans la collection 'families' exportée avec un modèle de donnée utilisable dans scanR. Les données présentes dans `participants` et `patents` sont également intégrés pôur chaque famille de brevet. Cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD.


### 3.6 Publications

Voir sur [*Github*](http://https://github.com/dataesr/publications), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/publications), [*Swagger*](http://185.161.45.213/publications/doc)

- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Collecte de données, Transformation de données, Exposition API de données, Export de données
- *Dépendances interne*: aucune.
- *Dépendances externe*: Persons, Projects, Organizations, Datastore, API de HAL.

Application dédiée aux publications dans #dataesr. Elle est en charge:
1. de l'exposition d'une API pour les données des publications (avec notamment la mise à jour des données venant de Unpaywall et de HAL)
2. de l'export de ces données en une version compatible avec l'application scanR,

#### 3.6.1 APIs et export

Cette application expose une API RESTful pour les collections suivantes :
 - 'publications' qui est un ensemble de documents représentant des publications.
 - 'notices_publications' qui contient le code HTML des pages web scrappées pour chaque doi
 - 'unpwayll_dump' qui contient les données issues du feed hebdomadaire de Unpaywall
 - 'openapc_dump' dump, pas utilisé à ce jour
 - 'opencitations_dump' dump, pas utilisé à ce jour

Cette API permet toutes les opérations CRUD à savoir le GET, POST, PATCH et DELETE.

De plus, deux points d'entrées spécifiques existent :
 - `/hal_publication` pour la collecte / mise à jour d'une publication venant de HAL (utilise l'API de HAL)
 - `/unpaywall_publication` pour la collecte / mise à jour d'une publication venant de Unpaywall (à partir de la collection 'unpaywall_dump')

Pour ces deux points d'entrées, les méta-données de publications sont collectées et transformées dans un format compatible avec le modèle de données des publications dans dataESR.
De plus, quand la page web du DOI a été scrappée (présente dans la collection 'notices_publications'), le code HTML est parsé (avec BeautifulSoup) pour enrichir les meta-données de la publication concernant les affiliations.

Enfin, le point d'entrée `/update` permet de fusionner toutes les informations disponibles concernant la publication. Ainsi, pour une publication déjà en base, par exemple si une donnée supplémentaire concernant les affiliations arrive (par l'un des deux endpoints précédents), la route 'update' se charge d'ajouter l'information sans pour autant créer de doublons. Par défaut, les routes 'hal_publication' et 'unpaywall_publication' appellent déjà la route 'update'.


Une collection scanR est également exposée. Cette dernière est une vue des données présente dans la collection 'publications' exportée avec un modèle de donnée utilisable dans scanR. C'est cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD.

### 3.7 Personnes

Voir sur [*Github*](http://https://github.com/dataesr/persons), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/persons), [*Swagger*](http://185.161.45.213/persons/doc)

- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Collecte de données, Transformation de données, Exposition API de données, Export de données
- *Dépendances interne*: aucune.
- *Dépendances externe*: API Idref, API ORCID

Application dédiée aux personnes dans #dataesr. Elle est en charge:
1. de l'exposition d'une API pour les données des personnes (avec notamment la mise à jour des données venant de IdRef et ORCID)
2. de l'export de ces données en une version compatible avec l'application scanR,

#### 3.7.1 APIs et export

Cette application expose une API RESTful pour les collections suivantes :
 - `/persons` qui est un ensemble de documents représentant des personnes.
 - `/notices_persons` qui contient le code XML des notices IdRef et Orcid
Cette API permet toutes les opérations CRUD à savoir le GET, POST, PATCH et DELETE.

La collection 'notices_persons' contient les informations disponibles dans les notices IdRef et Orcid. La correspondance entre les identifiants IdRef et Orcid est directement présente dans la fiche IdRef (le traitement de matching est effectué annuellement par l'ABES en charge d'IdRef).
La collection 'persons' contient les mêmes informations mises en forme selon le schéma de données dataESR.

De plus, un point d'entrée pour le matching existe :
 - `/persons/_match`
Il prend en entrée une liste de couples (nom, prénom). La procédure suivante est appliquée pour tenter de retrouver l'IdRef de chacun de ces nom/prénom :
1. On parcourt la liste des noms/prénoms, et pour chacun, s'il est possible de retrouver l'identifiant idref sans ambiguité (une et une seule correspondance exacte), l’identification de ce nom/prénom est faite.
2. Ensuite, pour les nom/prénom restants, pour ceux où il y a une ambiguïté (cas des homonymes), on utilise la liste des co-auteurs (issue du Sudoc, et dans les données IdRef) pour lever les ambiguïtés à partir des nom/prénom déjà identifiés dans l'étape 1.

Ce point d'entrée est utilisé pour attribuer l'identifiant idref aux auteurs des publications. Ce traitement est asynchrone et est effectué régulièrement sur les publications.

Une collection scanR est également exposée. Cette dernière est une vue des données présente dans la collection 'persons' exportée avec un modèle de donnée utilisable dans scanR. C'est cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD.


### 3.8 UI

[*Github Repos*](//https://github.com/dataesr/nginx), [*Docker image*](https://hub.docker.com/repository/docker/dataesr/nginx)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Interface utilisateurs, Interface monitoring, Enrichissement de données
- *Dépendances interne*: Organisations, Persons, Publications, Patents, Projects, Datastore, Elasticsearch.
- *Dépendances externe*: aucune.

Interface utilisateur de l'application. Permet l'intervention sur certaines données afin de les enrichir ou de les corriger manuellement. Actuellement, l'intervention est possible principalement sur les organisations. Les autres corrections manuelles sont remontées à l'API via fichiers et scripts. Cette interface permet aussi de rechercher et d'explorer les données, de voir les données de monitoring et de log, de voir la documentation swagger des API et de lancer des tâches asynchrones.


### 3.9 Elasticsearch, Filebeat, Metricbeat

Ces trois process sont chargés de la récupération et du stockage de métriques et de logs concernant l'application.


### 3.10 Nginx

- [*Github Repos*](https://github.com/dataesr/nginx)
- [*Docker image*](https://hub.docker.com/repository/docker/dataesr/nginx)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Mission*: Reverse proxy
- *Dépendances interne*: aucune.
- *Dépendances externe*: aucune.

Ce service sert de reverse proxy à toute l'application. Il écoute le port 80 de la machine sur laquelle est installée l'application et forward les requêtes vers le bon service. Il expose ainsi tous les service API, et en aucun cas ne permet un interfaçage direct avec la base de données.

Une authentification BASIC est nécessaire afin d'accéder aux services et celle ci est géré directement par nginx. Si l'authentification est valide, nginx transmet les requêtes aux services. Dans le cas contraire, il refuse les connexions.
