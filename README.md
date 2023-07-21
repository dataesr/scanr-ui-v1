# scanR source code
[![Discord Follow](https://dcbadge.vercel.app/api/server/dkcww8vs?style=flat)](https://discord.gg/dkcww8vs)
![https://img.shields.io/github/v/release/dataesr/scanr](https://img.shields.io/github/v/release/dataesr/scanr)
![Build](https://github.com/dataesr/scanr/actions/workflows/staging.yml/badge.svg)

Run the app :
- cd scanR
- npm install && npm run build

# API Documentation

Some example of search request (POST) using python:

```python
import requests
```
scanR offers two types of endpoints:
 - a **search endpoint** (POST), that takes as inputs
   1. a query
   2. filters to limit the scope
   3. fields to be returned
 - a **direct object access endpoint** (GET), that takes as input an identifier

There is a search endpoints (POST) for each of the 4 types of objects:
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/structures/search
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/persons/search
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/projects/search
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/publications/search

There is a direct access object endpoint (GET) also for the 4 types of objects:
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/structures/structure/{identifier}
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/persons/{identifier}
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/projects/{identifier}
 - https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/publications/{identifier}

The filters in the SEARCH endpoints are deeply lined with the objects schemas.
The schemas can be seen in the swagger https://scanr-api.enseignementsup-recherche.gouv.fr/api/swagger-ui.htm (GET endpoints)

## 1. Search for entities


```python
url_structures = "https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/structures/search"

# search query
my_query = "drone"

# filters to limit the results
# here for example only the structures with a badge label 'GIFAS',
# located in Pays de la Loire but not in Angers nor Nantes
my_filters = {
    'badges.label.fr': {
        'type': 'MultiValueSearchFilter',
        'op': 'any',
       'values': ['GIFAS', 'GICAN', 'GICAT']},

      'address.localisationSuggestions': {
          'type': 'MultiValueSearchFilter',
           'op': 'all',
           'values': ['Pays de la Loire']},

        'address.city': {
          'type': 'MultiValueSearchFilter',
           'op': 'not_all',
           'values': ['Angers', 'Nantes']},
}

# list of the fields returned by the API
sourceFields = ["id", "label.default"]

params = {
        'pageSize': 50,
        'query': my_query,
        'filters': my_filters,
        'sourceFields': sourceFields
}

scanr_outputs = requests.post(url_structures, json=params).json()
print("{} resultats".format(scanr_outputs.get('total')))
scanr_outputs.get('results')
```

    3 resultats





    [{'highlights': [{'type': 'websites.webPages.content',
        'value': 'uniquely tailored to the needs of the rapidly growing <strong>drone</strong> market - for land, airborne or naval applications'}],
      'value': {'id': '326889979', 'label': {'default': 'ARTUS'}}},
     {'highlights': [{'type': 'websites.webPages.content',
        'value': 'rigides…) ainsi que de navires autonomes de type <strong>drone</strong>. Les logiciels créés constitueront une nouvelle'}],
      'value': {'id': '487891012', 'label': {'default': 'EMC2'}}},
     {'highlights': [{'type': 'websites.webPages.content',
        'value': 'locaux de vie et opérationnels et le stockage d’un <strong>drone</strong> aérien. Enfin Defendseas est conçu pour intégrer'}],
      'value': {'id': '439067612',
       'label': {'default': "CHANTIERS DE L'ATLANTIQUE"}}}]



## 2. Search for authors


```python
url_persons = "https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/persons/search"

my_query = "\"open access\" | \"open science\" | \"science ouverte\""
my_filters = {
    "awards.label":
        {
            "type":"MultiValueSearchFilter",
            "op":"any",
            "values":["Médaille d'argent du CNRS","Médaille d'or du CNRS","Médaille de cristal du CNRS",
                      "Médaille de bronze du CNRS", "Lauréat de l'Institut universitaire de France"]
        }       
}

params = {
   "pageSize":500,
   "query": my_query,

   "sourceFields":[
      "id", "fullName"
   ],
   "filters": my_filters
   }

scanr_outputs = requests.post(url_persons, json=params).json()
print("{} resultats".format(scanr_outputs.get('total')))
scanr_outputs.get('results')
```

    21 resultats





    [{'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Snapshots of three <strong>open access</strong> business models'}],
      'value': {'id': 'idref139753753', 'fullName': 'Marin Dacos'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': '<strong>Open science</strong> resources for the discovery and analysis of'}],
      'value': {'id': 'idref081586736', 'fullName': 'Éric Karsenti'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': '<strong>Open science</strong> resources for the discovery and analysis of'}],
      'value': {'id': 'idref052460029', 'fullName': 'Jean Weissenbach'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'bibliographic/metric tool for open citations and <strong>open science</strong>'}],
      'value': {'id': 'idref197349692', 'fullName': 'Stéphane Pouyllau'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'JASPAR 2020: update of the <strong>open-access</strong> database of transcription factor binding profiles'}],
      'value': {'id': 'idref079718418', 'fullName': 'François Parcy'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Junior scientists are sceptical of sceptics of <strong>open access</strong>: a reply to Agrawal'}],
      'value': {'id': 'idref078964423', 'fullName': 'Elise Huchard'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': "2019-40 - LES PUBLICATIONS A L'HEURE DE LA <strong>SCIENCE OUVERTE</strong>"}],
      'value': {'id': 'idref031887392', 'fullName': 'Gilles Adda'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Empowering <strong>open science</strong> with reflexive and spatialised indicators'}],
      'value': {'id': 'idref027084914', 'fullName': 'Denise Pumain'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Missing Link Between Digital Humanities and <strong>Open Access</strong>'}],
      'value': {'id': 'idref178995819', 'fullName': 'Marjorie Burghart'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': "2019-40 - LES PUBLICATIONS A L'HEURE DE LA <strong>SCIENCE OUVERTE</strong>"}],
      'value': {'id': 'idref034335242', 'fullName': 'Philippe Askenazy'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'IPICS First <strong>Open Science</strong> conference'}],
      'value': {'id': 'idref069286159', 'fullName': 'Jérôme Chappellaz'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Make <strong>Open Access</strong> Publishing Fair and Transparent!'}],
      'value': {'id': 'idref111270669', 'fullName': 'Franck Courchamp'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Mapping optical standing-waves of an <strong>open-access</strong> Fabry–Perot cavity with a tapered fiber'}],
      'value': {'id': 'idref139604197', 'fullName': 'Jakob Reichel'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': '<strong>Open access</strong> to research data in electronic theses and dissertations:'}],
      'value': {'id': 'idref142340685', 'fullName': 'Marta Severo'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'sues/CircadianRhythms. 20 published papers (<strong>Open access</strong> articles) : Maternal Obesity during Pregnancy'}],
      'value': {'id': 'idref128577096', 'fullName': 'Étienne Challet'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': '<strong>Open science</strong> resources for the discovery and analysis of'}],
      'value': {'id': 'idref06874904X', 'fullName': 'Chris Bowler'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'plant trait database – enhanced coverage and <strong>open access</strong>'}],
      'value': {'id': 'idref079413390', 'fullName': 'Sandra Lavorel'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'Say ‘Yes!’ to peer review: <strong>Open Access</strong> publishing and the need for mutual aid in academia'}],
      'value': {'id': 'idref034577165', 'fullName': 'Myriam Houssay-Holzschuch'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': "2019-40 - LES PUBLICATIONS A L'HEURE DE LA <strong>SCIENCE OUVERTE</strong>"}],
      'value': {'id': 'idref029767067', 'fullName': 'Jean-Gabriel Ganascia'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'DOCC10: <strong>Open access</strong> dataset of marine mammal transient studies and end-to-end CNN classification'}],
      'value': {'id': 'idref112112501', 'fullName': 'Hervé Glotin'}},
     {'highlights': [{'type': 'publications.publication.title.default',
        'value': 'TumGrowth: An <strong>open-access</strong> web tool for the statistical analysis of tumor'}],
      'value': {'id': 'idref071283250', 'fullName': 'Guido Kroemer'}}]



## 3. Search for productions


```python
url_publications = "https://scanr-api.enseignementsup-recherche.gouv.fr/api/v2/publications/search"

my_query = "\"open access\" | \"open science\" | \"science ouverte\""
my_filters = {
    "productionType":
        {
            "type":"MultiValueSearchFilter",
            "op":"any",
            "values":["thesis"]
        },
    "year":
        {
            "type": "LongRangeFilter",
            "max": 2021,
            "min": 2015,
            "missing": False
        }
}

params = {
   "pageSize":500,
   "query": my_query,

   "sourceFields":[
      "id", "title", "authors.fullName", "authors.role"
   ],
   "filters": my_filters
   }

scanr_outputs = requests.post(url_publications, json=params).json()
print("{} resultats".format(scanr_outputs.get('total')))
scanr_outputs.get('results')
```

    42 resultats





    [{'highlights': [{'type': 'summary.default',
        'value': '(Open Research Data), des écrits scientifiques (<strong>Open Access</strong>) et des ressources pédagogiques (Open Educational'},
       {'type': 'alternativeSummary.default',
        'value': 'Werte des Ethos der Wissenschaft, wurde das <strong>Open Science</strong> Konzept geschaffen, um den Zugang zu Forschungsdaten'}],
      'value': {'id': 'these2017USPCB190',
       'title': {'default': "E-Universités : la construction d'un droit des communs du savoir"},
       'authors': [{'role': 'author', 'fullName': 'Pawel Kamocki'},
        {'role': 'directeurthese', 'fullName': 'Luc Grynbaum'},
        {'role': 'directeurthese', 'fullName': 'Thomas Hoeren'},
        {'role': 'presidentjury', 'fullName': 'Tristan Azzi'},
        {'role': 'membrejury', 'fullName': 'Luc Grynbaum'},
        {'role': 'membrejury', 'fullName': 'Thomas Hoeren'},
        {'role': 'membrejury', 'fullName': 'Tristan Azzi'},
        {'role': 'membrejury', 'fullName': 'Estelle Derclaye'},
        {'role': 'membrejury', 'fullName': 'Célia Zolynski'},
        {'role': 'membrejury', 'fullName': 'Andreas Witt'},
        {'role': 'rapporteur', 'fullName': 'Estelle Derclaye'},
        {'role': 'rapporteur', 'fullName': 'Célia Zolynski'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'conceptualize new devices for measurement, mapping and <strong>open access</strong> to local science.To build national research systems'}],
      'value': {'id': 'these2017CNAM1161',
       'title': {'default': 'La production scientifique des chercheurs de la faculté de médecine et de pharmacie de Casablanca : mesures, cartographie et enjeux du libre accès'},
       'authors': [{'role': 'author', 'fullName': 'Hanae Lrhoul'},
        {'role': 'directeurthese', 'fullName': 'Ghislaine Chartron'},
        {'role': 'presidentjury', 'fullName': 'Eric Boutin'},
        {'role': 'membrejury', 'fullName': 'Joachim Schöpfel'},
        {'role': 'membrejury', 'fullName': 'Ahmed Bachr'},
        {'role': 'membrejury', 'fullName': 'Mohamed Barkaoui'},
        {'role': 'rapporteur', 'fullName': 'Eric Boutin'},
        {'role': 'rapporteur', 'fullName': 'Chérifa Boukacem-Zeghmouri'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'conceptualize new devices for measurement, mapping and <strong>open access</strong> to local science.To build national research systems'},
       {'type': 'title.default',
        'value': 'Pharmacy of Casablanca : measures, mapping and <strong>open access</strong> issues'}],
      'value': {'id': 'tel-01815122',
       'title': {'default': 'La production scientifique des chercheurs de la faculté de médecine et de pharmacie de Casablanca : mesures, cartographie et enjeux du libre accès;The research production of the Faculty of Medicine and Pharmacy of Casablanca : measures, mapping and open access issues'},
       'authors': [{'role': 'author', 'fullName': 'Hanae Lrhoul'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'promouvoir la recherche reproductible et la <strong>science ouverte</strong>.'},
       {'type': 'alternativeSummary.default',
        'value': 'and further promote reproducible research and <strong>open science</strong>.'}],
      'value': {'id': 'these2018USPCC174',
       'title': {'default': 'Deep Learning for Advanced Microscopy'},
       'authors': [{'role': 'author', 'fullName': 'Wei Ouyang'},
        {'role': 'directeurthese', 'fullName': 'Christophe Zimmer'},
        {'role': 'presidentjury', 'fullName': 'Sylvie Hénon'},
        {'role': 'membrejury', 'fullName': 'Christophe Zimmer'},
        {'role': 'membrejury', 'fullName': 'Jean-Luc Starck'},
        {'role': 'membrejury', 'fullName': 'Thierry Dorval'},
        {'role': 'membrejury', 'fullName': 'Susan Cox'},
        {'role': 'membrejury', 'fullName': 'Maïté Coppey-Moisan'},
        {'role': 'rapporteur', 'fullName': 'Jean-Luc Starck'},
        {'role': 'rapporteur', 'fullName': 'Priscille Brodin'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'knowledge about <strong>open access</strong>, and, last topic, the state of the art about benefits due to <strong>open access</strong> sources'}],
      'value': {'id': 'these2016GREAL018',
       'title': {'default': "L'usage des technologies de l'information et de la communication par les professeurs des universités lybiennes : le cas des archives ouvertes et des périodiques électroniques sur le web"},
       'authors': [{'role': 'author', 'fullName': 'Ahmed Aborawi'},
        {'role': 'directeurthese', 'fullName': 'Laurence Balicco'},
        {'role': 'presidentjury', 'fullName': 'Adrian Staii'},
        {'role': 'membrejury', 'fullName': 'Jean-Stéphane Carnel'},
        {'role': 'rapporteur', 'fullName': 'Madjid Ihadjadene'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'lies within the framework both of a research on <strong>open access</strong> Web portals and of the introduction of educational'}],
      'value': {'id': 'these2016AIXM3005',
       'title': {'default': "Étude d'un dispositif d'enseignement à distance en libre accès sur le web : une approche didactique du travail enseignant dans le supérieur : le cas du dispositif Thermoptim-UNIT à l’école MINES ParisTech"},
       'authors': [{'role': 'author', 'fullName': 'Atika Mokhfi'},
        {'role': 'directeurthese', 'fullName': 'Jean Ravestein'},
        {'role': 'directeurthese', 'fullName': 'Caroline Ladage'},
        {'role': 'presidentjury', 'fullName': 'Bruno de Lièvre'},
        {'role': 'membrejury', 'fullName': 'Yves Chevallard'},
        {'role': 'membrejury', 'fullName': 'Renaud Gicquel'},
        {'role': 'rapporteur', 'fullName': 'Éric Bruillard'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'acce/erate the mass production of various data, and <strong>open access</strong> to them in real time. We are ta/king about 3V'}],
      'value': {'id': 'these2019PAUU2068',
       'title': {'default': "Big Data dans les entreprises : transformations organisationnelles, modèles d'usages et modèles d'affaires"},
       'authors': [{'role': 'author', 'fullName': 'Soumaya Bouafia-Djalab'},
        {'role': 'directeurthese', 'fullName': 'Jacques Jaussaud'},
        {'role': 'directeurthese', 'fullName': 'Christophe Benavent'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'cadastral plan, zoning plan which should be <strong>open access</strong> to production institutions, in accordance with'}],
      'value': {'id': 'these2017STRAH010',
       'title': {'default': 'Essai de caractérisation socio-spatiale de la banlieue est de Beyrouth : étude de cas des municipalités de Jdeideh el Metn et Fanar'},
       'authors': [{'role': 'author', 'fullName': 'Jennifer Maeva Casagrande'},
        {'role': 'directeurthese', 'fullName': 'Dominique Badariotti'},
        {'role': 'presidentjury', 'fullName': 'Christiane Weber'},
        {'role': 'rapporteur', 'fullName': 'Kamala Marius-Gnanou'},
        {'role': 'rapporteur', 'fullName': 'Eric Verdeil'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'archaeology through time and within the context of <strong>Open Access</strong>. Through an evaluation of websites that disseminate'}],
      'value': {'id': 'these2018PA100113',
       'title': {'default': "Les pratiques de la recherche en archéologie à l'heure du numérique : l'évolution de la recherche d'information et de la publication de 1955 à nos jours"},
       'authors': [{'role': 'author', 'fullName': 'Virginie Fromageot-Laniepce'},
        {'role': 'directeurthese', 'fullName': 'Anne-Marie Guimier-Sorbets'},
        {'role': 'presidentjury', 'fullName': 'Olivier Picard'},
        {'role': 'membrejury', 'fullName': 'Anne-Marie Guimier-Sorbets'},
        {'role': 'membrejury', 'fullName': 'Olivier Picard'},
        {'role': 'membrejury', 'fullName': 'Paola Moscati'},
        {'role': 'membrejury', 'fullName': 'Marie-Dominique Nenna'},
        {'role': 'membrejury', 'fullName': 'Philippe Jockey'},
        {'role': 'rapporteur', 'fullName': 'Paola Moscati'},
        {'role': 'rapporteur', 'fullName': 'Marie-Dominique Nenna'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'In addition, librarians seek to rely fully on <strong>Open Access</strong>, both in terms of access to resources and the'}],
      'value': {'id': 'these2018CNAM1185',
       'title': {'default': "Documentation numérique en Afrique francophone subsaharienne : évaluation de l'offre et des usages en sciences humaines à l'Université Cheikh Anta Diop de Dakar"},
       'authors': [{'role': 'author', 'fullName': 'Khardiatou Kane'},
        {'role': 'directeurthese', 'fullName': 'Ghislaine Chartron'},
        {'role': 'presidentjury', 'fullName': 'Mohamed Hassoun'},
        {'role': 'membrejury', 'fullName': 'Dominique Cartellier'},
        {'role': 'membrejury', 'fullName': 'Bernard Dione'},
        {'role': 'rapporteur', 'fullName': 'Mohamed Hassoun'},
        {'role': 'rapporteur', 'fullName': 'Ahmeth Ndiaye'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'As part of an <strong>Open Science</strong> initiative, we are particularly interested in the scientific Workflow Management'}],
      'value': {'id': 'these2015REN1S089',
       'title': {'default': 'Concevoir et partager des workflows d’analyse de données : application aux traitements intensifs en bioinformatique'},
       'authors': [{'role': 'author', 'fullName': 'François Moreews'},
        {'role': 'directeurthese', 'fullName': 'Dominique Lavenier'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'without applicator. This method is compared to <strong>open access</strong> and commercially available DIR methods. The geometrical'}],
      'value': {'id': 'these2018REN1S070',
       'title': {'default': 'Radiothérapie adaptative guidée par l’imagerie anatomique'},
       'authors': [{'role': 'author', 'fullName': 'Bastien Rigaud'},
        {'role': 'directeurthese', 'fullName': 'Renaud de Crevoisier'},
        {'role': 'directeurthese', 'fullName': 'Antoine Simon'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': "s'inscrit au sein d'un projet interdisciplinaire <strong>Open Science</strong> de la fondation Agropolis. L'objectif est double"}],
      'value': {'id': 'tel-01807940',
       'title': {'default': "Modélisation de la dynamique de population d une plante native (palmier babaçu) dans le cadre d'un projet de gestion durable au Brésil;Modeling population dynamics of native plant (babassu palm tree) as part of a sustainable management project in Brazil"},
       'authors': [{'role': 'author', 'fullName': 'Nikolay Sirakov'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'authoritative databases, the advantage of VGI provides <strong>open access</strong> to spatial data. However, VGI is prone to errors'}],
      'value': {'id': 'tel-02928979',
       'title': {'default': 'Le vandalisme de l’information géographique volontaire : analyse exploratoire et proposition d’une méthodologie de détection automatique;Vandalism in voluntereed geographic information : exploratory analysis and proposal for an automatic detection methodology'},
       'authors': [{'role': 'author', 'fullName': 'Thérèse Quy Thy Truong'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'cadastral plan, zoning plan which should be <strong>open access</strong> to production institutions, in accordance with'}],
      'value': {'id': 'tel-01771938',
       'title': {'default': "Essai de caractérisation socio-spatiale de la banlieue est de Beyrouth : étude de cas des municipalités de Jdeideh el Metn et Fanar;Essay of Beirut's Eastern suburb socio-spatial characterization : study case of municipalities of Fanar and Jdeideh-el-Metn"},
       'authors': [{'role': 'author', 'fullName': 'Jennifer Maeva Casagrande'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'complex, contextual notion. Since the 2000s, <strong>open access</strong> to scientific data has become a strategic axis'}],
      'value': {'id': 'these2019CNAM1254',
       'title': {'default': 'Ouverture des données de la recherche : de la vision politique aux pratiques des chercheurs'},
       'authors': [{'role': 'author', 'fullName': 'Violaine Rebouillat'},
        {'role': 'directeurthese', 'fullName': 'Ghislaine Chartron'},
        {'role': 'presidentjury', 'fullName': 'Céline Paganelli'},
        {'role': 'membrejury', 'fullName': 'Joachim Schöpfel'},
        {'role': 'rapporteur', 'fullName': 'Madjid Ihadjadene'},
        {'role': 'rapporteur', 'fullName': 'Vincent Liquète'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'score. Our results highlighted the importance of <strong>open access</strong> and press releases. Finally, we performed a systematic'}],
      'value': {'id': 'these2017USPCB044',
       'title': {'default': 'Dissémination et communication des résultats de la recherche clinique dans les médias'},
       'authors': [{'role': 'author', 'fullName': 'Romana Haneef'},
        {'role': 'directeurthese', 'fullName': 'Isabelle Boutron'},
        {'role': 'presidentjury', 'fullName': 'Florence Tubach'},
        {'role': 'membrejury', 'fullName': 'Isabelle Boutron'},
        {'role': 'membrejury', 'fullName': 'Florence Tubach'},
        {'role': 'membrejury', 'fullName': 'François Gonon'},
        {'role': 'membrejury', 'fullName': 'François Alla'},
        {'role': 'membrejury', 'fullName': 'Philippe Amiel'},
        {'role': 'rapporteur', 'fullName': 'François Gonon'},
        {'role': 'rapporteur', 'fullName': 'François Alla'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'and more cities provide the scanned data on <strong>open access</strong> platforms. To ensure the intercompatibility of'}],
      'value': {'id': 'these2018LYSE2023',
       'title': {'default': 'Représentation et échange de données tridimensionnelles géolocalisées de la ville'},
       'authors': [{'role': 'author', 'fullName': 'Jeremy Gaillard'},
        {'role': 'directeurthese', 'fullName': 'Gilles Gesquière'},
        {'role': 'directeurthese', 'fullName': 'Adrien Peytavie'},
        {'role': 'presidentjury', 'fullName': 'Paule-Annick Davoine'},
        {'role': 'membrejury', 'fullName': 'Hugo Ledoux'},
        {'role': 'membrejury', 'fullName': 'Vincent Picavet'},
        {'role': 'rapporteur', 'fullName': 'Jean-Pierre Jessel'},
        {'role': 'rapporteur', 'fullName': 'Sidonie Christophe'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': "s'inscrit au sein d'un projet interdisciplinaire <strong>Open Science</strong> de la fondation Agropolis. L'objectif est double"},
       {'type': 'alternativeSummary.default',
        'value': 'This PhD work is pioneer and is a part of an <strong>Open Science</strong> interdisciplinary project of the Agropolis foundation'}],
      'value': {'id': 'these2016MONTT302',
       'title': {'default': "Modélisation de la dynamique de population d une plante native (palmier babaçu) dans le cadre d'un projet de gestion durable au Brésil"},
       'authors': [{'role': 'author', 'fullName': 'Nikolay Sirakov'},
        {'role': 'directeurthese', 'fullName': 'Thérèse Libourel'},
        {'role': 'presidentjury', 'fullName': 'Florence Sèdes'},
        {'role': 'membrejury', 'fullName': 'Thérèse Libourel'},
        {'role': 'membrejury', 'fullName': 'Florence Sèdes'},
        {'role': 'membrejury', 'fullName': 'Anne Doucet'},
        {'role': 'membrejury', 'fullName': 'Pascal Monestiez'},
        {'role': 'membrejury', 'fullName': 'Patrice Loisel'},
        {'role': 'membrejury', 'fullName': 'Danielle Mitja'},
        {'role': 'membrejury', 'fullName': 'Bénédicte Fontez'},
        {'role': 'membrejury', 'fullName': 'Nicolas Picard'},
        {'role': 'rapporteur', 'fullName': 'Anne Doucet'},
        {'role': 'rapporteur', 'fullName': 'Pascal Monestiez'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'Alps based on satellite imagery provided by the <strong>open-access</strong> platform Google Earth Pro™, and using a series'}],
      'value': {'id': 'these2018LYSE2084',
       'title': {'default': 'Ruptures de Versant Rocheux (RVR) à l’échelle des Alpes occidentales : inventaire systématique, analyse spatiale, perspectives patrimoniales'},
       'authors': [{'role': 'author', 'fullName': 'Sylvain Blondeau'},
        {'role': 'directeurthese', 'fullName': 'Yanni Gunnell'},
        {'role': 'presidentjury', 'fullName': 'Philippe Schoeneich'},
        {'role': 'membrejury', 'fullName': 'David Jarman'},
        {'role': 'membrejury', 'fullName': 'Yannick Thiery'},
        {'role': 'membrejury', 'fullName': 'Candide Lissak'},
        {'role': 'rapporteur', 'fullName': 'Marc Calvet'},
        {'role': 'rapporteur', 'fullName': 'Armelle Decaulne'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'In addition, librarians seek to rely fully on <strong>Open Access</strong>, both in terms of access to resources and the'}],
      'value': {'id': 'tel-01987440',
       'title': {'default': "Documentation numérique en Afrique francophone subsaharienne : évaluation de l'offre et des usages en sciences humaines à l'Université Cheikh Anta Diop de Dakar;Digital documentation in Africa : evaluation of the offer and uses in the human sciences of the University Cheikh Anta Diop of Dakar"},
       'authors': [{'role': 'author', 'fullName': 'Khardiatou Kane'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'availability of data, oftentimes available in <strong>open access</strong>, and the pooling of such data for data mining'}],
      'value': {'id': 'these2019LYSE1127',
       'title': {'default': 'Interactive mapping specification and repairing in the presence of policy views'},
       'authors': [{'role': 'author', 'fullName': 'Ugo Comignani'},
        {'role': 'directeurthese', 'fullName': 'Angela Bonifati'},
        {'role': 'directeurthese', 'fullName': 'Emmanuel Coquery'},
        {'role': 'directeurthese', 'fullName': 'Romuald Thion'},
        {'role': 'presidentjury', 'fullName': 'Hamamache Kheddouci'},
        {'role': 'membrejury', 'fullName': 'Angela Bonifati'},
        {'role': 'membrejury', 'fullName': 'Emmanuel Coquery'},
        {'role': 'membrejury', 'fullName': 'Romuald Thion'},
        {'role': 'membrejury', 'fullName': 'Laure Berti-Equille'},
        {'role': 'membrejury', 'fullName': 'Marie-Laure Mugnier'},
        {'role': 'rapporteur', 'fullName': 'Reinhard Pichler'},
        {'role': 'rapporteur', 'fullName': 'Pierre Senellart'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'new Sentinel-1 C-band radar sensors (free and <strong>open access</strong>) makes it essential to evaluate the potential'}],
      'value': {'id': 'these2018AGPT0001',
       'title': {'default': 'Estimation de la rugosité du sol en milieux agricoles à partir de données Sentinel-1'},
       'authors': [{'role': 'author', 'fullName': 'Mohammad Choker'},
        {'role': 'directeurthese', 'fullName': 'Nicolas Baghdadi'},
        {'role': 'directeurthese', 'fullName': 'Mehrez Zribi'},
        {'role': 'presidentjury', 'fullName': 'Ali Khenchaf'},
        {'role': 'membrejury', 'fullName': 'Ali Khenchaf'},
        {'role': 'membrejury', 'fullName': 'Lionel Jarlan'},
        {'role': 'membrejury', 'fullName': 'Emmanuelle Vaudour'},
        {'role': 'rapporteur', 'fullName': 'Ali Khenchaf'},
        {'role': 'rapporteur', 'fullName': 'Lionel Jarlan'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'bioinformatics intensive treatments As part of an <strong>Open Science</strong> initiative, we are particularly interested in'}],
      'value': {'id': 'tel-01233191',
       'title': {'default': 'Concevoir et partager des workflows d’analyse de données. Application aux traitements intensifs en bioinformatique;Design and share data analysis workflows. Application to bioinformatics intensive treatments'},
       'authors': [{'role': 'author', 'fullName': 'Francois Moreews'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': "traitements d'analyse de données. As part of an <strong>Open Science</strong> initiative, we are particularly interested in"}],
      'value': {'id': 'tel-01308297',
       'title': {'default': 'Concevoir et partager des workflows d’analyse de données : application aux traitements intensifs en bioinformatique;Design and share data analysis workflows : application to bioinformatics intensive treatments'},
       'authors': [{'role': 'author', 'fullName': 'François Moreews'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'and more cities provide the scanned data on <strong>open access</strong> platforms. To ensure the intercompatibility of'}],
      'value': {'id': 'tel-02293040',
       'title': {'default': 'Représentation et échange de données tridimensionnelles géolocalisées de la ville;Representation and exchange of three-dimensional geolocated city data'},
       'authors': [{'role': 'author', 'fullName': 'Jeremy Gaillard'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'score. Our results highlighted the importance of <strong>open access</strong> and press releases. Finally, we performed a systematic'}],
      'value': {'id': 'tel-02121533',
       'title': {'default': 'Dissemination and communication of clinical research in mass media;Dissémination et communication des résultats de la recherche clinique dans les médias'},
       'authors': [{'role': 'author', 'fullName': 'Romana Haneef'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'is to provide the scientific community with <strong>open access</strong> tofunctional information data which has been'}],
      'value': {'id': 'these2019INPT0131',
       'title': {'default': 'Taxonomie et inférence fonctionnelle des procaryotes : développement de MACADAM, une base de données devoies métaboliques associées à une taxonomie'},
       'authors': [{'role': 'author', 'fullName': 'Malo Le boulch'},
        {'role': 'directeurthese', 'fullName': 'Géraldine Pascal'},
        {'role': 'directeurthese', 'fullName': 'Sylvie Combes'},
        {'role': 'presidentjury', 'fullName': 'Juliette Riquet'},
        {'role': 'membrejury', 'fullName': 'Géraldine Pascal'},
        {'role': 'membrejury', 'fullName': 'Sylvie Combes'},
        {'role': 'membrejury', 'fullName': 'Pierre Peyret'},
        {'role': 'membrejury', 'fullName': 'Didier Debroas'},
        {'role': 'membrejury', 'fullName': 'Marion Leclerc'},
        {'role': 'rapporteur', 'fullName': 'Pierre Peyret'},
        {'role': 'rapporteur', 'fullName': 'Didier Debroas'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': 'and sequencing data were analyzed using the <strong>open-access</strong> software, WISECONDOR. Performance metrics for'}],
      'value': {'id': 'these2019BORD0184',
       'title': {'default': "Techniques d'exploration chromosomique en prénatal : mises au point et applications"},
       'authors': [{'role': 'author', 'fullName': 'Stéphanie Brun'},
        {'role': 'directeurthese', 'fullName': 'Didier Lacombe'},
        {'role': 'directeurthese', 'fullName': 'Caroline Rooryck Thambo'},
        {'role': 'presidentjury', 'fullName': 'Dominique Dallay'},
        {'role': 'membrejury', 'fullName': 'Cédric Le Caignec'},
        {'role': 'membrejury', 'fullName': 'Christophe Vayssière'},
        {'role': 'membrejury', 'fullName': 'Jacques Horovitz'},
        {'role': 'rapporteur', 'fullName': 'Cédric Le Caignec'},
        {'role': 'rapporteur', 'fullName': 'Christophe Vayssière'}],
       'isOa': False}},
     {'highlights': [{'type': 'alternativeSummary.default',
        'value': ' we test our propositions on four different <strong>open-access</strong> datasets. The results obtained allow us to show'}],
      'value': {'id': 'these2018LYSE2009',
       'title': {'default': 'Hypergraphs and information fusion for term representation enrichment : applications to named entity recognition and word sense disambiguation'},
       'authors': [{'role': 'author', 'fullName': 'Edmundo-Pavel Soriano-Morales'},
        {'role': 'directeurthese', 'fullName': 'Sabine Loudcher Rabaseda'},
        {'role': 'directeurthese', 'fullName': 'Julien Ah-Pine'},
        {'role': 'presidentjury', 'fullName': 'Sophie Rosset'},
        {'role': 'membrejury', 'fullName': 'Farah Benamara'},
        {'role': 'rapporteur', 'fullName': 'Marc El-Bèze'},
        {'role': 'rapporteur', 'fullName': 'Mathieu Roche'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'complex, contextual notion. Since the 2000s, <strong>open access</strong> to scientific data has become a strategic axis'}],
      'value': {'id': 'tel-02447653',
       'title': {'default': 'Ouverture des données de la recherche : de la vision politique aux pratiques des chercheurs;Open research data : from political vision to research practices'},
       'authors': [{'role': 'author', 'fullName': 'Violaine Rebouillat'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'Alps based on satellite imagery provided by the <strong>open-access</strong> platform Google Earth Pro™, and using a series'}],
      'value': {'id': 'tel-01913532',
       'title': {'default': 'Ruptures de Versant Rocheux (RVR) à l’échelle des Alpes occidentales : inventaire systématique, analyse spatiale, perspectives patrimoniales;Rock Slope Failure (RSF) in the Western Alps: a systematic inventory with perspectives on causes, geohazards and geoheritage'},
       'authors': [{'role': 'author', 'fullName': 'sylvain Blondeau'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'these tools are currently implemented within <strong>open access</strong> Computree software.'}],
      'value': {'id': 'tel-02790234',
       'title': {'default': 'Estimation de la distribution spatiale de surface et de biomasse foliaires de couverts forestiers méditerranéens à partir de nuages de points acquis par un LiDAR Terrestre'},
       'authors': [{'role': 'author', 'fullName': 'Maxime Soma'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': '(September-October 2015), in particular Article 9 on "<strong>open access</strong> to scientific publications in public research"'}],
      'value': {'id': 'tel-01926040',
       'title': {'default': 'Numérique et régime français des savoirs en~action : l\'open en sciences. Le cas de la consultation République numérique (2015);The french regime of knowledge and its dynamics : open in sciences and digital technologies in debate. The case study of the french bill for a "digital republic" (2015)'},
       'authors': [{'role': 'author', 'fullName': 'Célya Gruson-Daniel'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'availability of data, oftentimes available in <strong>open access</strong>, and the pooling of such data for data mining'}],
      'value': {'id': 'tel-02400646',
       'title': {'default': 'Interactive mapping specification and repairing in the presence of policy views;Spécification et réparation interactive de mappings en présence de polices de sécurité'},
       'authors': [{'role': 'author', 'fullName': 'Ugo Comignani'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'new Sentinel-1 C-band radar sensors (free and <strong>open access</strong>) makes it essential to evaluate the potential'}],
      'value': {'id': 'tel-02607565',
       'title': {'default': '(trad auto)Estimation of soil roughness in agricultural environments from Sentinel-1 data;Estimation de la rugosité du sol en milieux agricoles à partir de données Sentinel-1'},
       'authors': [{'role': 'author', 'fullName': 'M. Choker'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'new Sentinel-1 C-band radar sensors (free and <strong>open access</strong>) makes it essential to evaluate the potential'}],
      'value': {'id': 'tel-02293194',
       'title': {'default': 'Estimation of surface roughness over bare agricultural soil from Sentinel-1 data;Estimation de la rugosité du sol en milieux agricoles à partir de données Sentinel-1'},
       'authors': [{'role': 'author', 'fullName': 'Mohammad Choker'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': '(September-October 2015), in particular Article 9 on "<strong>open access</strong> to scientific publications in public research"'}],
      'value': {'id': 'tel-02515981',
       'title': {'default': 'Numérique et régime français des savoirs en~action : l\'open en sciences : le cas de la consultation « république numérique » (2015);The French regime of knowledges and its dynamics : open in sciences and digital technologies in debate : the case study of the french bill for a "digital republic" (2015)'},
       'authors': [{'role': 'author', 'fullName': 'Célya Gruson-Daniel'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'and sequencing data were analyzed using the <strong>open-access</strong> software, WISECONDOR. Performance metrics for'}],
      'value': {'id': 'tel-02412603',
       'title': {'default': "Techniques d'exploration chromosomique en prénatal : mises au point et applications;Technical development and applications of the chromosomal exploration technics in prenatal diagnosis"},
       'authors': [{'role': 'author', 'fullName': 'Stéphanie Brun'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': ' we test our propositions on four different <strong>open-access</strong> datasets. The results obtained allow us to show'}],
      'value': {'id': 'tel-01940801',
       'title': {'default': 'Hypergraphs and information fusion for term representation enrichment : applications to named entity recognition and word sense disambiguation;Hypergraphes et fusion d’information pour l’enrichissement de la représentation de termes : applications à la reconnaissance d’entités nommées et à la désambiguïsation du sens des mots'},
       'authors': [{'role': 'author',
         'fullName': 'Edmundo-Pavel Soriano-Morales'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'results show a lack of shared resources and <strong>open access</strong> to evidence that would be necessary to evaluate'}],
      'value': {'id': 'tel-01395768',
       'title': {'default': "Participation et verrouillage technologique dans la transition écologique en agriculture. Le cas de l'Agriculture de Conservation en France et au Brésil.;Participation and Technological Lock-In in the Ecological Transition of Agriculture. The Case of Conservation Agriculture in France and Brazil."},
       'authors': [{'role': 'author', 'fullName': 'Pauline Landel'}],
       'isOa': False}},
     {'highlights': [{'type': 'summary.default',
        'value': 'diegetic operating modes in cartoons transmitted in <strong>open access</strong> television in Chile, as well as their traffic'}],
      'value': {'id': 'tel-01487019',
       'title': {'default': 'Les dessins animés au Chili : syntaxe, circulation et consommation;The TV Cartoons in Chile : syntax, circulation and consumption'},
       'authors': [{'role': 'author', 'fullName': 'Rafael Del Villar Muñoz'}],
       'isOa': False}}]

# Source code

## changelogs acceptations
```
  types: [
    { types: ['feat', 'feature'], label: '🎉 Nouvelle fonctionalités' },
    { types: ['fix', 'bugfix'], label: '🐛 Réparation de Bug' },
    { types: ['improvements', 'enhancement'], label: '🔨 Amélioration' },
    { types: ['build', 'ci'], label: '🏗️ Déploiement' },
    { types: ['refactor'], label: '🪚 Réamenagement de code' },
    { types: ['perf'], label: '🏎️ Amélioration de performance' },
    { types: ['doc', 'docs'], label: '📚 Changement de documentation' },
    { types: ['test', 'tests'], label: '🔍 Tests' },
    { types: ['style'], label: '💅 Style de code' },
    { types: ['chore'], label: '🧹 Nettoyage' },
    { types: ['other'], label: 'Autres changements' },
  ],

  excludeTypes: ['other', 'perf', 'test', 'tests', 'style', 'chore', 'doc', 'docs'],
  ```
  
  ## Push a new version on MASTER
  ```
  git pull origin master
  ```
  Update code with commit ...
  ```
  npm version [patch, minor, major]
  git push origin master --tags
  ```
