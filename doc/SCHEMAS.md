

<details>
  <summary>Voir le modèle de données complet</summary>

  ```json
  TODO
  {
    "id": {
      "type": "string",
      "description": "Identifiant RNSR de la structure de recherche",
      "regex": "^([0-9]{9}[A-Z]{1})$"
    },
    "description": {
      "type": "string",
      "description": "Description d'une structure de recherche."
    },
    "website": {
      "type": "string",
      "description": "Une URL du site web de la structure"
    },
    "type": {
      "type": "string",
      "description": "Secteur de la structure (toujours Structure de recherche ici)",
      "traitement": "Dérivé du code_nature suivant un mapping propre à #dataesr"
    },
    "level": {
      "type": "string",
      "description": "Type de structure",
      "traitement": "Dérivé du code_nature suivant un mapping propre à #dataesr"
    },
    "input_address": {
      "type": "string",
      "description": "Adresse de la structure",
      "traitement": null
    },
    "name": {
      "type": "string",
      "description": "Nom de la structure",
      "traitement": null
    },
    "dates": {
      "type": "object",
      "object": {
        "start_date": {
          "description": "Date de début de la structure",
          "traitement": "Les années de début des données sources sont remplacées une date (1 jan)"
        },
        "end_date": {
          "description": "Date de fin de la structure",
          "traitement": "Les années de début des données sources sont remplacées une date (31 déc)"
        }
      }
    },
    "email": {
      "type": "string",
      "description": "Mail de contact de la structure",
    },
    "phone": {
      "type": "string",
      "description": "Téléphone de contact de la structure",
      "traitement": null
    },
    "code_numbers": {
      "type": "list",
      "schema": {
        "type": "string",
        "description": "Label numéro d'une structure"
      }
    },
    "rnsr_domains": {
      "type": "list",
      "schema": {
        "type": "string",
        "description": "Domains de recherche des structures provenant des domaines scientifiques"
      }
    },
    "rnsr_themes": {
      "type": "list",
      "schema": {
        "type": "string",
        "description": "Domains de recherche des structures provenant des domaines d'application"
      }
    },
    "panels": {
      "type": "list",
      "schema": {
        "type": "object",
        "schema": {
          "code": {
            "type": "string",
            "description": "Code de panel ERC"
          },
          "end_date": {
            "type": "datetime",
            "description": "Panel ERC n'est plus associé à la structure depuis..."
          },
          "start_date": {
            "type": "datetime",
            "description": "Panel ERC associé à la structure depuis..."
          }
        }
        }
    },
    "leaders": {
      "type": "list",
      "description": "Dirigeants de la structure",
      "schema": {
        "type": "object",
        "schema": {
          "rnsr_key": {
            "type": "string",
            "description": "Identifiant du leader dans le RNSR"
          },
          "end_date": {
            "type": "datetime",
            "description": "Début d'exercice du leader"
          },
          "start_date": {
            "type": "datetime",
            "description": "Fin d'exercice du leader"
          },
          "role": {
            "type": "datetime",
            "description": "Role dans la structure"
          }
        }
      }
    },
    "predecessors": {
      "type": "list",
      "description": "Prédécesseur de la structure",
      "schema": {
        "type": "object",
        "schema": {
          "succession_type": {
            "type": "string",
            "description": "Type de succession"
          },
          "succession_date": {
            "type": "datetime",
            "description": "Date à laquelle s'est passé la succession"
          },
          "id": {
            "type": "string",
            "regex": "^([0-9]{9}[A-Z]{1})$",
            "description": "Identifiant RNSR du prédécesseur"
          }
        }
        }
    },
    "parents": {
      "type": "list",
      "description": "Parents de la structure",
      "schema": {
        "type": "object",
        "schema": {
          "id": {
            "type": "string",
            "regex": "^([0-9]{9}[A-Z]{1})$",
            "description": "Identifiant RNSR du parent"
          },
          "start_date": {
            "type": "datetime",
            "description": "Début de la relation"
          },
          "end_date": {
            "type": "datetime",
            "description": "Fin de la relation"
          },
          "exclusive": {
            "type": "boolean",
            "description": "true si la relation est exclusive"
          }
        }
      }
    },
    "supervisors": {
      "type": "list",
      "description": "Tutelles de la structure",
      "schema": {
        "type": "object",
        "schema": {
          "rnsr_key": {
            "type": "string",
            "description": "Identifiant RNSR de la tutelle"
          },
          "start_date": {
            "type": "datetime",
            "description": "Début de la relation"
          },
          "end_date": {
            "type": "datetime",
            "description": "Fin de la relation"
          },
          "supervision_type": {
            "type": "string",
            "description": "Type de supervision"
          },
          "name": {
            "type": "string",
            "description": "Nom de la tutelle"
          }
        }
      }
    },
    "doctoral_schools": {
      "type": "list",
      "description": "Ecole doctorales rattachées à la structure",
      "schema": {
        "type": "object",
        "schema": {
          "id": {
            "type": "string",
            "description": "Identifiant du l'école doctorale"
          },
          "end_date": {
            "type": "datetime",
            "description": "Fin de la relation"
          },
          "start_date": {
            "type": "datetime",
            "description": "Début de la relation"
          }
        }
      }
    }
  }
  ```
</details>
<br/>

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
  	"siren": {
  		"description": "Numéro d'identification siren",
  		"type": "string",
  		"regex": "^([0-9]{9})$"
  	},
  	"siren": {
  		"description": "Numéro d'identification siret (siret du siège au niveau du siren)",
  		"type": "string",
  		"regex": "^([0-9]{14})$"
  	},
  	"dates": {
  		"type": "object",
  		"schema": {
  			"start_date": {
  				"type": "datetime",
          "description": "Date de début de l'organisation",
  			},
  			"end_date": {
  				"description": "Closing date",
  				"type": "datetime",
          "description": "Date de fin de l'organisation",
  			}
  		}
  	},
  	"level": {
  		"type": "string",
      "description": "Type de la structure",
      "traitement": "Dérivé du code de catégorie juridique suivant un mapping propre à #dataesr"
  	},
  	"type": {
  		"type": "string",
      "description": "Secteur de la structure",
      "traitement": "Dérivé du code de catégorie juridique suivant un mapping propre à #dataesr"
  	},
  	"name": {
  		"type": "object",
  		"schema": {
  			"label": {
  				"description": "Nom de la structure",
  				"type": "string"
  			},
  			"acronym": {
  				"description": "Acronyme de la structure",
  				"type": "string"
  			}
  		}
  	},
  	"human_ressources": {
  		"type": "object",
  		"schema": {
  			"employees_slice": {
  				"description": "Code de tranche d'effectif",
  				"type": "string"
  			},
  			"date": {
  				"description": "Date de validité de la tranche d'effectif",
  				"type": "string"
  			}
  		}
  	},
  	"aliasses": {
  		"type": "list",
  		"schema": {
  			"type": "string",
        "description":"Autres (anciens) nom et dénominations de la structure",
  		}
  	},
  	"input_address": {
      "description": "Adresse de la structure",
  		"type": "string"
  	},
  	"city_code": {
  		"type": "string",
      "description": "Code commune de la structure"
  	},
  	"category": {
  		"type": "string",
      "description": "Catégorie de la structure dans SIRENE (PME, ETI, GE, TPE)"
  	},
  	"headquarter": {
  		"type": "boolean",
      "description": "true si le siret est un siège"
  	},
  	"legal_category": {
  		"type": "string",
      "description": "Code de catégorie juridique de la structure"
  	},
  	"naf_code": {
  			"type": "string",
        "description": "Code APE de la structure"
  	}
  }
  ```
</details>
<br/>

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
    "input_address": {
      "type": "string",
      "description": "Adresse renseignée dans le champs 'location' de l'API par l'utilisateur"
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

<details>
  <summary>Voir le modèle de donnée complets</summary>

  ```json
  {
  	"id": {
  		"type": "string",
  		"description": "Identifiant"
  	},
  	"status": {
  		"type": "string",
  		"description": "Status de l'organisation"
  	},
  	"bce": {
  		"type": "string",
  		"description": "Identifiant UAI de la BCE (si existant)"
  	},
  	"grid": {
  		"type": "string",
  		"description": "Identifiant dans la Base GRID.ac (si existant)"
  	},
  	"rnsr": {
  		"type": "string",
  		"description": "Identifiant dans le RNSR (si existant)"
  	},
  	"ed": {
  		"type": "string",
  		"description": "Identifiant d'école doctorale (si existant)"
  	},
  	"sirene": {
  		"type": "string",
  		"description": "Identifiant Sirene (si existant)"
  	},
  	"headquarter": {
  		"type": "string",
  		"description": "Est-ce un siège ? (complété uniquement pour les organisations ayant un sirene)"
  	},
  	"dataesr": {
  		"type": "string",
  		"description": "Identifiant dataesr pour les organisation non présentes dans une base source (si existant)"
  	},
  	"rnsr_key": {
  		"type": "string",
  		"description": "Identifiant d'institution dans le RNSR, permet le matching de tutelles (si existant)"
  	},
  	"active": {
  		"type": "boolean",
  		"description": "true si l'organisation est active?"
  	},
  	"foreign": {
  		"type": "boolean",
  		"description": "true si l'organisation est étrangère"
  	},
  	"types": {
  		"description": "Liste de secteur",
  		"type": "list",
  		"schema": {
  			"type": "string",
  			"description": "Secteur de l'organisation"
  		}
  	},
  	"forbidden_types": {
  		"description": "Liste de secteurs non autorisés pour une structure",
  		"type": "list",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"dates": {
  		"description": "Dates de début et fin d'une structure. ",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"start_date": {
  					"type": "datetime",
  					"description": "Date de début de la structure"
  				},
  				"end_date": {
  					"type": "datetime",
  					"description": "Date de fin de la structure"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				}
  			}
  		}
  	},
  	"comment": {
  		"type": "string",
  		"description": "Commentaire admin sur l'organisation"
  	},
  	"names": {
  		"type": "list",
  		"description": "Noms (fr, en) de l'organisations",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"start_date": {
  					"type": "datetime",
  					"description": "Date de début de validité du nom"
  				},
  				"end_date": {
  					"type": "datetime",
  					"description": "Date de fin de validité du nom"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				},
  				"name_fr": {
  					"type": "string",
  					"description": "Nom français de la structure"
  				},
  				"name_en": {
  					"type": "string",
  					"description": "Nom anglais de la structure"
  				},
  				"acronym_fr": {
  					"type": "string",
  					"description": "Acronyme français de la structure"
  				},
  				"acronym_en": {
  					"type": "string",
  					"description": "Acronyme anglais de la structure"
  				}
  			}
  		}
  	},
  	"descriptions": {
  		"description": "Descriptions (fr, en)",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"start_date": {
  					"type": "datetime",
  					"description": "Date de début de validité de la description"
  				},
  				"end_date": {
  					"type": "datetime",
  					"description": "Date de fin de validité de la description"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				},
  				"description_fr": {
  					"type": "string",
  					"description": "Description françaiss de la structure"
  				},
  				"description_en": {
  					"type": "string",
  					"description": "Description anglaise de la structure"
  				}
  			}
  		}
  	},
  	"addresses": {
  		"description": "Adresse de l'organisation",
  		"type": "list",
  		"schema": "address"
  	},
  	"alias": {
  		"description": "Regroupe tousles nom, acronymes et identifiant de l'organisation",
  		"type": "list",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"keywords_en": {
  		"type": "list",
  		"description": "Une liste de mot clés anglais",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"keywords_fr": {
  		"type": "list",
  		"description": "Une liste de mot clés français",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"code_numbers": {
  		"type": "list",
  		"description": "Une liste de label numéros. Uniquement pour les structures de recherche",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"logo": {
  		"type": "string",
  		"description": "Url du logo de l'organisation"
  	},
  	"legal_category": {
  		"type": "list",
  		"description": "Catégorie Juridique de l'organisation",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"value": {
  					"type": "string",
  					"description": "Code de catégorie juridique"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				}
  			}
  		}
  	},
  	"websites": {
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"url": {
  					"description": "Site web de l'organisation",
  					"type": "string"
  				},
  				"language": {
  					"description": "Language du site web",
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit et les sites web secondaires"
  				},
  				"alive": {
  					"type": "boolean",
  					"description": "true if website has been tested alive"
  				}
  			}
  		}
  	},
  	"website_check": {
  		"type": "object",
  		"description": "Dernière fois que l'existence d'un site à été recherché",
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
  		"description": "Emails de contact de l'organisation",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"email": {
  					"description": "Email de contact",
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit et les emails secondaires"
  				}
  			}
  		}
  	},
  	"phones": {
  		"type": "list",
  		"description": "Numéro de téléphone de contact de l'organisation",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"phone": {
  					"description": "Téléphone",
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit et les téléphones secondaires"
  				}
  			}
  		}
  	},
  	"social_medias": {
  		"description": "Réseaux sociaux des organisations",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"account": {
  					"description": "Compte de l'organisation",
  					"type": "string"
  				},
  				"social_media": {
  					"description": "Réseau social",
  					"type": "string"
  				},
  				"url": {
  					"description": "Url de l'organisation sur le réseau social",
  					"type": "string"
  				},
  				"language": {
  					"description": "Language du réseau social",
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit et les réseaux sociaux secondaires"
  				}
  			}
  		}
  	},
  	"thematics": {
  		"description": "#dataESR domains",
  		"type": "list",
  		"schema": "thematics"
  	},
  	"badges": {
  		"description": "Une liste permettant de marquer les organisations pour grouper le requêtage",
  		"type": "list",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"focus": {
  		"description": "Une liste permettant de marquer les organisations pour grouper le requêtage",
  		"type": "list",
  		"schema": {
  			"type": "string"
  		}
  	},
  	"panels": {
  		"type": "list",
  		"description": "Liste de panel ERC",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"code": {
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit et les panels secondaires"
  				},
  				"start_date": {
  					"type": "datetime"
  				},
  				"end_date": {
  					"type": "datetime"
  				}
  			}
  		}
  	},
  	"nace": {
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"code": {
  					"type": "string"
  				},
  				"status": {
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				}
  			}
  		}
  	},
  	"human_ressources": {
  		"description": "Information sur les effectifs",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"num_employees": {
  					"description": "Nombre d'employés",
  					"type": "string"
  				},
  				"num_employees_slice": {
  					"description": "Nombre d'employés (tranche d'effectif)",
  					"type": "string"
  				},
  				"num_researchers": {
  					"description": "Nombre de chercheurs",
  					"type": "string"
  				},
  				"date": {
  					"description": "Date de validité des données",
  					"type": "datetime"
  				}
  			}
  		}
  	},
  	"external_links": {
  		"description": "Liens externes de l'organisation (portail HAL)",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"url": {
  					"description": "URL",
  					"type": "string"
  				},
  				"type": {
  					"description": "Type de lien",
  					"type": "string"
  				},
  				"language": {
  					"description": "langue du lien",
  					"type": "string"
  				}
  			}
  		}
  	},
  	"external_ids": {
  		"description": "Identifiants externes",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"id": {
  					"description": "Identifiant externe",
  					"type": "string"
  				},
  				"type": {
  					"description": "Type d'identifiant",
  					"type": "string"
  				}
  			}
  		}
  	},
  	"evaluations": {
  		"description": "Rapport d'évaluation des organisations",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"evaluator": {
  					"description": "Agence d'évaluation",
  					"type": "string"
  				},
  				"url": {
  					"description": "Lien du rapport d'évaluation",
  					"type": "string"
  				},
  				"year": {
  					"description": "Année de l'évaluation",
  					"type": "string"
  				},
  				"label": {
  					"description": "Label de l'évaluation",
  					"type": "string"
  				}
  			}
  		}
  	},
  	"leaders": {
  		"type": "list",
  		"description": "",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"id": {
  					"type": "string"
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
  					"type": "string",
  					"description": "Status de la donnée permettant la gestion de conflit"
  				}
  			}
  		}
  	},
  	"predecessors": {
  		"type": "list",
  		"description": "List of Organization's higher level relations",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"id": {
  					"type": "string"
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
  				"succession_date": {
  					"type": "datetime"
  				},
  				"succession_type": {
  					"type": "string"
  				},
  				"status": {
  					"description": "Data status.",
  					"type": "string"
  				}
  			}
  		}
  	},
  	"supervisors": {
  		"type": "list",
  		"description": "List of Organization's higher level relations",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"id": {
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
  					"type": "string"
  				},
  				"identified": {
  					"type": "boolean"
  				},
  				"name": {
  					"type": "string"
  				},
  				"status": {
  					"description": "Activity status of the Organization",
  					"type": "string",
  					"allowed": [
  						"valid",
  						"conflict"
  					],
  					"example": "valid"
  				}
  			}
  		}
  	},
  	"parents": {
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"start_date": {
  					"type": "datetime"
  				},
  				"end_date": {
  					"type": "datetime"
  				},
  				"id": {
  					"type": "string"
  				},
  				"href": {
  					"type": "string"
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
  					"allowed": [
  						"valid",
  						"conflict"
  					],
  					"example": "valid",
  					"required": true
  				}
  			}
  		}
  	},
  	"certifications": {
  		"description": "",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"certification_name": {
  					"description": "",
  					"type": "string"
  				},
  				"certification_type": {
  					"description": "",
  					"type": "string"
  				},
  				"certification_start_date": {
  					"description": "",
  					"type": "datetime"
  				},
  				"certification_end_date": {
  					"description": "",
  					"type": "datetime"
  				}
  			}
  		}
  	},
  	"prizes": {
  		"description": "",
  		"type": "list",
  		"schema": {
  			"type": "object",
  			"schema": {
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
  					"type": "datetime"
  				},
  				"prize_amount": {
  					"description": "",
  					"type": "float"
  				}
  			}
  		}
  	},
  	"relations": {
  		"type": "list",
  		"description": "",
  		"schema": {
  			"type": "object",
  			"schema": {
  				"id": {
  					"type": "string"
  				},
  				"href": {
  					"type": "string"
  				},
  				"identified": {
  					"type": "boolean"
  				},
  				"type": {
  					"type": "string"
  				},
  				"source_code": {
  					"type": "string"
  				},
  				"name": {
  					"type": "string"
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
  					"allowed": [
  						"valid",
  						"conflict"
  					],
  					"example": "valid"
  				}
  			}
  		}
  	}
  }
  ```
</details>
<br/>

<details>
  <summary>Voir le modèle de donnée des projets</summary>

  ```json
  {
      "id": {
          "type": "string"
      },
      "type": {
          "type": "string"
      },
      "stage": {
          "type": "string"
      },
      "status": {
          "type": "string"
      },
      "name": {
          "type": "object",
          "schema": {
              "default": {
                  "type": "string"
              },
              "fr": {
                  "type": "string"
              },
              "en": {
                  "type": "string"
              },
              "modified_by": {
                  "type": "string"
              },
              "modified_at": {
                  "type": "string"
              },
              "source": {
                  "type": "string"
              }
          }
      },
      "description": {
          "type": "object",
          "schema": {
              "default": {
                  "type": "string"
              },
              "fr": {
                  "type": "string"
              },
              "en": {
                  "type": "string"
              },
              "modified_by": {
                  "type": "string"
              },
              "modified_at": {
                  "type": "string"
              },
              "source": {
                  "type": "string"
              }
          }
      },
      "acronym": {
          "type": "string"
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
      "comment": {
          "description": "Commentaire sur le projet",
          "type": "string"
      },
      "year": {
          "type": "integer"
      },
      "signature_date": {
          "type": "datetime"
      },
      "start_date": {
          "type": "datetime"
      },
      "end_date": {
          "type": "datetime"
      },
      "budget_total": {
          "type": "number"
      },
      "dg_code": {
          "type": "string",
          "description": ""
      },
      "budget_financed": {
          "type": "number"
      },
      "duration": {
          "type": "integer"
      },
      "source_url": {
          "type": "string"
      },
      "project_website": {
          "type": "list",
          "schema": {
              "type": "string"
          }
      },
      "number_participant": {
          "type": "integer"
      },
      "thematics": {
          "description": "#dataESR domains",
          "type": "list",
          "schema": "thematics"
      },
      "call_code": {
          "type": "string"
      },
      "call_date": {
          "type": "datetime"
      },
      "call_name": {
          "type": "string"
      },
      "call_year": {
          "type": "string"
      },
      "topic_code": {
          "type": "string"
      },
      "topic_name": {
          "type": "string"
      },
      "msca_code": {
          "type": "string",
          "description": ""
      },
      "msca_name": {
          "type": "string",
          "description": ""
      },
      "action": {
          "description": "#dataESR domains",
          "type": "list",
          "schema": {
              "type": "object",
              "schema": {
                  "code": {
                      "type": "string"
                  },
                  "name": {
                      "type": "string"
                  },
                  "level": {
                      "type": "string"
                  }
              }
          }
      },
      "priorities": {
          "description": "EU priorities",
          "type": "list",
          "schema": {
              "type": "object",
              "schema": {
                  "code": {
                      "type": "string"
                  },
                  "name": {
                      "type": "string"
                  },
                  "level": {
                      "type": "string"
                  }
              }
          }
      },
      "panels": {
          "description": "#dataESR domains",
          "type": "list",
          "schema": {
              "type": "string"
          }
      },
      "persons": {
          "type": "list",
          "description": "",
          "schema": {
              "type": "dict",
              "schema": {
                  "id": {
                      "type": "string",
                  },
                  "identified": {
                      "type": "boolean"
                  },
                  "role": {
                      "type": "string"
                  },
                  "first_name": {
                      "type": "string"
                  },
                  "last_name": {
                      "type": "string"
                  }
              }
          }
      },
      "focus": {
          "description": "all focus",
          "type": "list",
          "schema": {
              "type": "string"
          }
      },
      "badges": {
          "description": "all badges",
          "type": "list",
          "schema": {
              "type": "string"
          }
      },
      "similar_projects": {
          "description": "all badges",
          "type": "list",
          "schema": {
              "type": "string"
          }
      },
      "related_projects": {
          "description": "all badges",
          "type": "list",
          "schema": {
              "type": "string"
          }
      }
  }
  ```
</details>
<details>
  <summary>Voir le modèle de donnée des participations</summary>

  ```json
  {
      "id": {
          "type": "string"
      },
      "identified": {
          "type": "boolean"
      },
      "project_id": {
          "type": "string"
      },
      "project_type": {
          "type": "string"
      },
      "pic_id": {
          "type": "string"
      },
      "pic_id_2": {
          "type": "string"
      },
      "vat_id": {
          "type": "string"
      },
      "participant_id": {
          "type": "string"
      },
      "participant_id_0": {
          "type": "string"
      },
      "organizations_id": {
          "type": "string"
      },
      "pme": {
          "type": "string"
      },
      "stage": {
          "type": "string"
      },
      "acronym": {
          "type": "string"
      },
      "acronym_source": {
          "type": "string"
      },
      "participates_as": {
          "type": "string"
      },
      "global_costs": {
          "type": "string"
      },
      "funding": {
          "type": "string"
      },
      "funding_share": {
          "type": "string"
      },
      "role": {
          "type": "string"
      },
      "name": {
          "type": "string"
      },
      "name_source": {
          "type": "string"
      },
      "status": {
          "type": "string"
      },
      "participant_order": {
          "type": "string"
      },
      "participant_type_code": {
          "type": "string"
      },
      "participant_type_name": {
          "type": "string"
      },
      "website": {
          "type": "string"
      },
      "address": {
          "type": "object",
          "schema": {
              "address": {
                  "type": "string"
              },
              "city": {
                  "type": "string"
              },
              "post_code": {
                  "type": "string"
              },
              "country": {
                  "type": "string"
              },
              "country_code": {
                  "type": "string"
              },
              "country_level_2": {
                  "type": "string"
              },
              "country_level_1": {
                  "type": "string"
              }
          }
      }
  }
  ```
</details>


<details>
  <summary>Voir le modèle de donnée des Invention</summary>

  ```json
  {
    "id": {
        "description": "Identifiant de la famille - docdb_family_id de patstat",
        "type": "string"
    },
    "title_fr": {
        "description": "Titre français du premier dépôt",
        "type": "string"
    },
    "title_en": {
        "description": "Titre anglais du premier dépôt",
        "type": "string"
    },
    "title_default": {
        "description": "Titre par défaut du premier dépôt, quand il n'y a pas de français ou anglais",
        "type": "string"
    },
    "title_default_language": {
        "description": "Langue du titre par défaut",
        "type": "string"
    },
    "abstract_fr": {
        "description": "Résumé français du premier dépôt",
        "type": "string"
    },
    "abstract_en": {
        "description": "Résumé anglais du premier dépôt",
        "type": "string"
    },
    "abstract_default": {
        "description": "Résumé par défaut du premier dépôt, quand il n'y a pas de français ou anglais",
        "type": "string"
    },
    "abstract_default_language": {
        "description": "Langue du Résumé par défaut",
        "type": "string"
    },
    "is_granted": {
        "description": "vaut 1 si au moins 1 des demandes de cette famille a été brevetée",
        "type": "boolean"
    },
    "date_first_granted": {
        "description": "date du premier brevet délivré dans la famille",
        "type": "datetime"
    },
    "is_international": {
        "description": "vaut 1 s'il y a eu un dépôt international",
        "type": "boolean"
    },
    "is_oeb": {
        "description": "vaut 1 s'il y a eu un dépôt à l'OEB",
        "type": "boolean"
    },
    "earliest_application_date": {
        "description": "date de premier dépôt",
        "type": "datetime"
    },
    "earliest_publication_date": {
        "description": "date de première publication",
        "type": "datetime"
    },
    "patents_count": {
        "description": "Nombre de demandes de brevets dans la famille",
        "type": "integer"
    },
    "design_patents_count": {
        "description": "Nombre de dessins dans la famille",
        "type": "integer"
    },
    "utility_models_count": {
        "description": "Nombre de modèles d'utilité dans la famille",
        "type": "integer"
    },
    "inpadoc_family_id": {
       "description": "identifiant INPADOC de la famille élargie à laquelle appartient la famille DOCDB",
       "type": "string"
    }
  }
  ```
</details>
<details>
  <summary>Voir le modèle de donnée des brevets</summary>

  ```json
  {
    "id": {
        "description": "Identifiant EPODOC de la demande",
        "type": "string"
    },
    "patent_family_id": {
        "description": "Patent family the patent belongs to.",
        "type": "string"
    },
    "original_application_number": {
        "description": "Numéro de dépôt original",
        "type": "string"
    },
    "publication_number": {
        "description": "Numéro de publication",
        "type": "string"
    },
    "is_priority": {
      "description": "Ce dépôt est un dépôt prioritaire de la famille (1 oui/0 non)",
      "type": "boolean"
    },
    "office": {
        "description": "Office de dépôt de propriété industrielle (string 2)",
        "type": "string"
    },
    "industrial_property_type": {
        "description": "Type de propriété industrielle : brevet (PI), dessin (DP) ou modèle d'utilité (UM)",
        "type": "string"
    },
    "application_type": {
        "description": "Type de dépôt : brevet princeps, brevet de perfectionnement ",
        "type": "string"
    },
    "application_date": {
        "description": "Date de dépôt de la demande",
        "type": "datetime"
    },
    "publication_date": {
        "description": "Date de publication à 18 mois",
        "type": "datetime"
    },
    "granted": {
        "description": "délivrance Y/N",
        "type": "boolean"
    },
    "granted_date": {
        "description": "Date de délivrance",
        "type": "datetime"
    },
    "granted_publication_number": {
        "description": "Numéro de publication de la délivrance",
        "type": "string"
    },
    "title": {
        "description": "Titre de la demande de PI",
        "type": "string"
    },
    "title_language": {
        "description": "Langue du titre (string 2)",
        "type": "string"
    },
    "abstract": {
        "description": "Résumé de l'invention",
        "type": "string"
    },
    "abstract_language": {
        "description": "Langue du résumé (string 2)",
        "type": "string"
    },
    "technologies": {
        "description": "technologies",
        "type": "list",
        "schema": {
            "type": "object",
            "schema": {
                "classification": {
                    "description": "type de classification : CPC (cooperative patent classification), IPC (international patent classification,DE (domaine emergent)",
                    "type": "string"
                },
                "niveau": {
                    "description": " Niveau de la classification",
                    "type": "string"
                },
                "code": {
                    "description": "code par exemple D01D 5/10",
                    "type": "string"
                },
                "libelle": {
                    "description": "libelle du code de classification",
                    "type": "string"
                }
            }
        }
    }
  }
  ```
</details>
<details>
  <summary>Voir le modèle de donnée des participants</summary>

  ```json
  {
      "id": {
          "description": "Unique participation identifier",
          "type": "string"
      },
      "id_patent": {
          "description": "Identifiant de la demande de brevet - numero epodoc de patstat",
          "type": "string"
      },
      "id_participant": {
          "description": "Identifiant du participant brut - person_id de patstat",
          "type": "string"
      },
      "id_dataesr": {
          "description": "dataesr id",
          "type": "string"
      },
      "id_identified": {
          "description": "dataesr id",
          "type": "string"
      },
      "participates_as": {
          "description": "les rôles du participant : déposant, inventeur ...",
          "type": "list",
          "schema": {
              "type": "object",
              "schema": {
                   "role": {
                      "description": "deposant, inventeur, titulaire ...",
                      "type": "string"
                  },
                  "seq": {
                      "description": "ordre d'inscription du déposant ou de l'inventeur",
                      "type": "integer"
                  },
                  "date_part_debut": {
                      "description": "date début participation : changement de titulaire, licensié",
                      "type": "datetime"
                  },
                  "date_part_fin": {
                      "description": "date fin participation : changement de titulaire (cession)",
                      "type": "datetime"
                  }
              }
          }
      },
      "name_source": {
          "description": "Name provided by the source",
          "type": "string"
      },
      "name_corrected": {
          "description": "Name provided by the source",
          "type": "string"
      },
      "first_name": {
          "description": "Prénom",
          "type": "string"
      },
      "last_name": {
          "description": "Nom",
          "type": "string"
      },
      "sexe": {
          "description": "sexe F/M",
          "type": "string"
      },
      "company_name": {
          "description": "libelle entreprise",
          "type": "string"
      },
      "type": {
          "description": "personne physique (PP) ou personne morale (PM) ",
          "type": "string"
      },
      "address_source": {
          "description": "Adresse source",
          "type": "string"
      },
      "address_corrected": {
          "description": "Adresse source",
          "type": "string"
      },
      "country_source": {
          "description": "Pays déclaré du participant",
          "type": "string"
      },
      "country_corrected": {
          "description": "Pays déclaré du participant",
          "type": "string"
      },
      "post_code": {
          "description": "Code postal",
          "type": "string"
      },
      "city_code": {
          "description": "code_commune",
          "type": "string"
      },
      "id_external": {
          "description": "identifiants extérieurs du participant",
          "type": "list",
          "schema": {
              "type": "object",
              "schema": {
                  "id_type": {
                      "description": "source de l'identifiant du participant (siren,orchid,idref)",
                      "type": "string"
                  },
                  "id_value": {
                      "description": "valeur de l'identifiant",
                      "type": "string"
                  }
              }
          }
      }
  }
  ```
</details>
