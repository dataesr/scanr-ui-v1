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
- *Fonctionnalité(s)*:
  - Expose les données du RNSR en JSON

Ce service récupère les données des structures de recherche du Répertoire National des structures de recherche (RNSR ci-après) directement via une connexion à la base de donnée RNSR. Cette connexion passe par un tunnel SSH mis en place par la DNE entre le serveur applicatif et le serveur du RNSR. La connexion est sécurisé par identifiant et mot de passe coté RNSR.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que ses liens à d'autres organisations (tutelles, prédécesseurs, parents) et ses responsables.

<details>
  <summary>Voir le modèle de données complet</summary>

  ```json
  TODO
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

[*Github*](http://https://github.com/dataesr/sirene), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/sirene-fetcher), [*Swagger*](http://185.161.45.213/fetchers/sirene/doc)

- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Collecte de données, Transformation de données, Exposition API de données
- *Dépendances interne*: aucune
- *Dépendances externe*: API SIRENE.
- *Fonctionnalité(s)*:
  - Expose les données du répertoire SIRENE en JSON


Ce service récupère les données des organisations présentes dans le répertoire Sirene via l'[API](https://api.insee.fr/) mise en place par l'insee.

Le service récupère toute les données d'intéret pour scanR. Cela comprend les méta données de base des structures (label, identifiants, adresse), ainsi que des codes et libellés de nomenclatures (ie. catégories juridiques, code APE).

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
  	"id": {
  		"description": "Sirene id",
  		"type": "string",
  		"regex": REGEX_SIRENE
  	},
  	"dates": {
  		"type": "dict",
  		"schema": {
  			"start_date": {
  				"type": "datetime",
  				"nullable": true
  			},
  			"end_date": {
  				"description": "Closing date",
  				"type": "datetime",
  				"nullable": true
  			}
  		}
  	},
  	"level": {
  		"description": "Level of the structure",
  		"type": "string"
  	},
  	"type": {
  		"description": "Level of the structure",
  		"type": "string"
  	},
  	"nature": {
  		"description": "Nature of structure's supervision",
  		"type": "string"
  	},
  	"name": {
  		"type": "dict",
  		"schema": {
  			"label": {
  				"description": "Structure's name",
  				"type": "string",
  				"nullable": True
  			},
  			"acronym": {
  				"description": "Structure's acronym",
  				"type": "string",
                  "nullable": True
  			}
  		}
  	},
  	"human_ressources": {
  		"type": "dict",
  		"nullable": True,
  		"schema": {
  			"employees_slice": {
  				"description": "Structure's name",
  				"type": "string",
  				"nullable": true
  			},
  			"date": {
  				"description": "Structure's acronym",
  				"type": "string",
                  "nullable": true
  			}
  		}
  	},
  	"aliasses": {
  		"type": "list",
  		"schema": {
  			"type": "string",
  			"nullable": true
  		}
  	},
  	"input_address": {
  		"type": "string",
  	},
  	"city_code": {
  		"type": "string",
  	},
  	"category": {
  		"type": "string",
  	},
  	"siren": {
  		"type": "string"
  	},
  	"headquarter": {
  		"type": "boolean"
  	},
  	"siret": {
  		"type": "string"
  	},
  	"legal_category": {
  		"type": "string",

  	},
  	"naf_code": {
  			"type": "string"
  	}
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
- *Fonctionnalité(s)*:
  - Géocode une adresse d'entrée et renvoi une adresse complète et propre avec coordonnées (si trouvées).

Ce service expose une API de géocodage, qui utilise les services de adresse.gouv.fr et d'openstreetmap afin de géocoder une adresse postale. Elle renvoie une adresse géocodée dans le format adresse de #dataesr.

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
    "input_address": {
      "type": "string",
      "description": "Adresse renseignée dans le champs 'location' de l'API"
    },
    "housenumber": {
      "type": "string",
      "description": "Numéro de rue",
    },
    "street": {
      "type": "string",
      "description": "Nome de la voie",
    },
    "post_code": {
      "type": "string",
      "description": "Code postal",
    },
    "city_code": {
      "type": "string",
      "description": "Code commune -- seulement pour les adresses françaises et comme provider adress.data.gouv.fr"
    },
    "city": {
      "type": "string",
      "description": "Ville",
    },
    "country": {
      "type": "string",
      "description": "Pays -- France par default avec provider adress.data.gouv.fr",
    },
    "geocoded": {
      "type": "boolean",
      "description": "Un booléen -- True si le géocodage est un succès",
    },
    "score": {
      "type": "numeric",
      "description": "Score du géocodeur",
    },
    "precision": {
      "type": "string",
      "description": "Précision du résultat -- housenumber, street etc.",
    },
    "provider": {
      "type": "string",
      "description": "Fournisseur du service",
    },
    "coordinates": {
      "type": "object",
      "schema": {
        "lat": {
          "type": "numeric",
          "description": "latitude"
        },
        "lon": {
          "type": "numeric",
          "description": "longitude"
        }
      }
    }
  }
  ```
</details>
<br/>


### 3.4 Organisations

Voir sur [*Github*](http://https://github.com/dataesr/organizations), [*Docker*](http://https://hub.docker.com/repository/docker/dataesr/organizations), [*Swagger*](http://185.161.45.213/organizations/doc)

- *Stockage de données*: OUI
- *Acces mongo*: OUI
- *Missions*: Collecte de données, Transformation de données, Exposition API de données, Export de données
- *Dépendances interne*: aucune.
- *Dépendances externe*: Persons, Geocoder, Datastore.

Application dédiée aux organisations dans #dataesr. Elle est en charge:
1. du workflow de mise à jour automatique des documents liées aux organisations,
2. de l'exposition d'une API pour les données des organisations, et pour des fonction (notamment de matching d'organisation)
3. de l'export de ces données en une version compatible avec l'application scanR,

#### 3.4.1 Workflow de mise à jour et traitement des données.

de récupérer les données depuis les sources, d'identifier les changements apportés aux données dans es sources (via l'utilisation de snapshot des documents sources) et de mettre à jour les documents liés aux organisations en respectant des règles métier.


#### 3.4.2 APIs et export

Cette application expose une API RESTful de la collection 'organizations' qui est un ensemble de documents représentant des organisations. Le modèle de donnée retenu pour ces documents permet de gérer à la fois un historique des données et des conflits liés à la mise à jour de source que l'application n'a pas pu résoudre avec les règles métiers établies. Il appartient aux administrateurs des données de venir régler les conflits dans l'interface utilisateur, ou via des scripts utilisant l'API. Cette API permet toutes les opérations CRUD à savoir le GET, POST, PATCH et DELETE.

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
    "status": {
        "description": "status of the organizations",
        "type": "string",
        "unique": True
    },
    "id": {
        "description": "#dataESR organization identifier",
        "type": "string",
        "unique": True,
        "nullable": False
    },
    "bce": {
        "description": "UAI id",
        "type": "string",
        "regex": REGEX_UAI,
        "unique": True,
        "nullable": True
    },
    "grid": {
        "description": "grid.ac id",
        "type": "string",
        "regex": REGEX_GRID,
        "unique": True,
        "nullable": True
    },
    "rnsr": {
        "description": "RNSR id",
        "type": "string",
        "regex": REGEX_NNS,
        "unique": True,
        "nullable": True
    },
    "ed": {
        "description": "Doctoral School id",
        "type": "string",
        "regex": REGEX_ED,
        "unique": True,
        "nullable": True
    },
    "sirene": {
        "description": "Sirene id",
        "type": "string",
        "unique": True,
        "regex": REGEX_SIRENE,
        "nullable": True
    },
    "headquarter": {
        "type": "string"
    },
    "dataesr": {
        "description": "ESR id for additional organizations",
        "type": "string",
        "unique": True,
    },
    "rnsr_key": {
        "description": "ESR id for additional organizations",
        "type": "string",
        "unique": True,
    },
    "active": {
        "description": "is organization active?",
        "type": "boolean",
    },
    "foreign": {
        "description": "Is organization foreign?",
        "type": "boolean",
        "default": False
    },
    "types": {
        "description": "Organization's types",
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "forbidden_types": {
        "description": "All types forbidden for that organization.",
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "dates": {
        "description": "Start and closing dates",
        "type": "list",
        "schema": dates
    },
    "comment": {
        "description": "Commentaire sur la Organization",
        "type": "string",
        "example": "Peut être un doublon avec 199712586Y"
    },
    "names": {
        "description": "Names (fr, en) of the Organizations, associated \
            with its acronym -- Has history",
        "type": "list",
        "schema": name
    },
    "descriptions": {
        "description": "Descriptions (fr, en) -- Has history",
        "type": "list",
        "schema": description
    },
    "addresses": {
        "description": "Organization's addresses -- Has history",
        "type": "list",
        "schema": address
    },
    "alias": {
        "description": "Regroups all names, acronyms, and identifiers that \
            reference the Organization, either now or in the past",
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "keywords_en": {
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "keywords_fr": {
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "code_numbers": {
        "type": "list",
        "schema": {
            "type": "string"
        }
    },
    "logo": {
        "type": "string"
    },
    "nature_group": {
        "description": "Only for UAI organizations.",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "value": {
                    "description": "",
                    "type": "string",
                    "required": True,
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "legal_category": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "value": {
                    "type": "string",
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "nature": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "value": {
                    "description": "",
                    "example": "",
                    "type": "string"
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "sector": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "value": {
                    "type": "string",
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "websites": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "url": {
                    "description": "Organization's main website",
                    "example": "http://www.beta-umr7522.fr",
                    "type": "string",
                    "required": True,
                },
                "language": {
                    "description": "website language",
                    "type": "string",
                    "default": "fr",
                    "example": "en"
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "alive": {
                    "type": "boolean"
                },
                "meta": meta
            }
        }
    },
    "website_check": {
        "type": "dict",
        "schema": {
            "checked": {
                "type": "boolean"
            },
            "last_check": {
                "type": "datetime"
            }
        }
    },
    "emails": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "email": {
                    "description": "Organization's contact email",
                    "example": "blabla@unistra.fr",
                    "type": "string",
                    "required": True,
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "phones": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "phone": {
                    "description": "Organization's phone number",
                    "example": "03.88.xx.xx.xx",
                    "type": "string",
                    "required": True,
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "social_medias": {
        "description": "Organizations's social medias accounts",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "account": {
                    "description": "Account Id for the social media",
                    "type": "string",
                    "example": "beta_economics"
                },
                "social_media": {
                    "description": "Name of the social media",
                    "type": "string",
                    "example": "twitter"
                },
                "url": {
                    "description": "url of the social media page",
                    "type": "string",
                    "example": "https://twitter.com/beta_economics"
                },
                "language": {
                    "description": "social media language",
                    "type": "string",
                    "default": "fr",
                    "example": "en"
                },
                "status": {
                    "description": "Activity status of the Organization",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "default": "conflict",
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "contract": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "value": {
                    "type": "string",
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "thematics": {
        "description": '''#dataESR domains''',
        "type": "list",
        "schema": thematics
    },
    "badges": {
        "description": '''Specific markers for the Organization''',
        "type":  "list",
        "schema": {
            "type": "string"
        }
    },
    "focus": {
        "description": '''Specific markers for the Organization''',
        "type":  "list",
        "schema": {
            "type": "string"
        }
    },
    "panels": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "code": {
                    "type": "string",
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "start_date": {
                    "type": "datetime"
                },
                "end_date": {
                    "type": "datetime"
                },
                "meta": meta
            }
        }
    },
    "nace": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "code": {
                    "type": "string",
                },
                "status": {
                    "type": "string",
                    "allowed": ["main", "valid", "conflict"],
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "human_ressources": {
        "description": "Human and financial informations on the Organization",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "num_employees": {
                    "description": "Number of employees",
                    "type": "string",
                },
                "num_employees_slice": {
                    "description": "Number of employees",
                    "type": "string",
                },
                "num_researchers": {
                    "description": "Number of ...",
                    "type": "string",
                },
                "date": {
                    "description": "data validity date",
                    "type": "datetime"
                },
                "meta": meta
            }
        }
    },
    "external_links": {
        "description": "Organizations's external link",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "url": {
                    "description": "External url describing the ressource",
                    "type": "string",
                    "nullable": False
                },
                "type": {
                    "description": "Type of the external link",
                    "type": "string",
                },
                "language": {
                    "description": "Language of the website",
                    "type": "string",
                    "default": "fr"
                },
                "meta": meta
            }
        }
    },
    "external_ids": {
        "description": "Organizations's external ids",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "id": {
                    "description": "External id",
                    "type": "string",
                    "nullable": False
                },
                "type": {
                    "description": "Type of the external link",
                    "type": "string",
                    "nullable": False
                },
                "meta": meta
            }
        }
    },
    "evaluations": {
        "description": "Organizations's evaluations",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "evaluator": {
                    "description": "Entity that evaluated the Organization",
                    "type": "string",
                    "example": "HCERES"
                },
                "url": {
                    "description": "Url of the evaluation report",
                    "type": "string",
                    "example": "https://www.hceres.fr/content/ \
                        download/31935/488476/file/ \
                        C2018-EV-0673021V-DER-PUR180015254-019890-RF.pdf"
                },
                "year": {
                    "description": "Year of the avaluation",
                    "type": "string",
                    "example": "2017-2018"
                },
                "label": {
                    "description": "Label of the evaluation",
                    "type": "string",
                    "example": "Vague B"
                },
                "meta": meta
            }
        }
    },
    "leaders": {
        "type": "list",
        "description": "",
        "schema": {
            "type": "dict",
            "schema": {
                "id": {
                    "type": "string",
                },
                "href": {
                    "type": "string",
                },
                "identified": {
                    "type": "boolean"
                },
                "start_date": {
                    "type": "datetime"
                },
                "end_date": {
                    "type": "datetime"
                },
                "role": {
                    "type": "string"
                },
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "source_code": {
                    "type": "string"
                },
                "status": {
                    "description": "data status",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "predecessors": {
        "type": "list",
        "description": "List of Organization's higher level relations",
        "schema": {
            "type": "dict",
            "schema": {
                "id": {
                    "type": "string",
                },
                "href": {
                    "type": "string",
                },
                "identified": {
                    "type": "boolean"
                },
                "source_code": {
                    "type": "string",
                },
                "name": {
                    "type": "string",
                },
                "succession_date": {
                    "type": "datetime"
                },
                "succession_type": {
                    "type": "string"
                },
                "status": {
                    "description": "Data status.",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "supervisors": {
        "type": "list",
        "description": "List of Organization's higher level relations",
        "schema": {
            "type": "dict",
            "schema": {
                "id": {
                    "type": "string",
                },
                "href": {
                    "type": "string"
                },
                "start_date": {
                    "type": "datetime"
                },
                "end_date": {
                    "type": "datetime"
                },
                "supervision_type": {
                    "type": "string"
                },
                "source_code": {
                    "type": "string",
                },
                "identified": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string",
                },
                "status": {
                    "description": "Activity status of the Organization",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "parents": {
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "start_date": {
                    "type": "datetime"
                },
                "end_date": {
                    "type": "datetime"
                },
                "id": {
                    "type": "string",
                },
                "href": {
                    "type": "string",
                },
                "identified": {
                    "type": "boolean"
                },
                "source_code": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "exclusive": {
                    "type": "boolean"
                },
                "status": {
                    "description": "Activity status of the Organization",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    },
    "certifications": {
        "description": "",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "meta": meta,
                "certification_name": {
                    "description": "",
                    "type": "string",
                },
                "certification_type": {
                    "description": "",
                    "type": "string",
                },
                "certification_start_date": {
                    "description": "",
                    "type": "datetime",
                },
                "certification_end_date": {
                    "description": "",
                    "type": "datetime",
                }
            }
        }
    },
    "prizes": {
        "description": "",
        "type": "list",
        "schema": {
            "type": "dict",
            "schema": {
                "meta": meta,
                "prize_name": {
                    "description": "",
                    "type": "string"
                },
                "prize_institution": {
                    "description": "",
                    "type": "string"
                },
                "prize_url": {
                    "description": "",
                    "type": "string"
                },
                "prize_description": {
                    "description": "",
                    "type": "string"
                },
                "prize_date": {
                    "description": "",
                    "type": "datetime",
                },
                "prize_amount": {
                    "description": "",
                    "type": "float"
                },
            }
        }
    },
    "relations": {
        "type": "list",
        "description": "",
        "schema": {
            "type": "dict",
            "schema": {
                "id": {
                    "type": "string",
                },
                "href": {
                    "type": "string",
                },
                "identified": {
                    "type": "boolean"
                },
                "type": {
                    "type": "string",
                },
                "source_code": {
                    "type": "string",
                },
                "name": {
                    "type": "string",
                },
                "start_date": {
                    "type": "datetime"
                },
                "end_date": {
                    "type": "datetime"
                },
                "status": {
                    "description": "Activity status of the Organization",
                    "type": "string",
                    "allowed": ["valid", "conflict"],
                    "example": "valid",
                    "required": True,
                },
                "meta": meta
            }
        }
    }
}
  ```
</details>
<br/>

L'application expose aussi une API de matching, permettant d'identifier un document de la collection organisation à partir d'un nom d'organisation. Cette API combine moteur de recherche, et règles métiers afin de fournir (ou de ne pas fournir) un matching le plus qualitatif possible.

Une collection scanR est egalement exposée. Cette dernière est une vue des données présente dans la collection 'organizations' exportée avec un modèle de donnée utilisable dans scanR. C'est cette dernière API est est appelé lorsque les administrateurs viennent récupérer les données pour les transférer à la couche scanR backend gérée par SWORD.


### 3. UI

[*Github Repos*](http://https://github.com/dataesr/nginx), [*Docker image*](http://https://hub.docker.com/repository/docker/dataesr/nginx)
- *Stockage de données*: NON
- *Acces mongo*: NON
- *Missions*: Interface utilisateurs, Interface monitoring, Enrichissement de données
- *Dépendances interne*: Organisations, Persons, Publications, Patents, Projects, Datastore, Elasticsearch.
- *Dépendances externe*: aucune.

Interface utilisateur de l'application. Permet l'intervention sur certaines données afin de les enrichir ou de les corriger manuellement. Actuellement, l'intervention est possible principalement sur les organisations. Les autres corrections manuelles sont remontées à l'API via fichiers et scripts. Cette interface permet aussi de rechercher et d'explorer les données, de voir les données de monitoring et de log, de voir la documentation swagger des API et de lancer des tâches asyncrones.


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
