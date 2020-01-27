#!/usr/bin/env python
# coding: utf-8

import json
from datetime import datetime
from marshmallow import Schema, fields, exceptions
from bson.objectid import ObjectId
from pymongo import *
from pprint import pprint

mongo = MongoClient('localhost', 9998)


###################################
########  COMMONS  ################
###################################
class i18nSchema(Schema):
    en = fields.Str(missing=None)
    fr = fields.Str(missing=None)
    default = fields.Str(missing=None)

class DomainSchema(Schema):
    code = fields.Str()
    type = fields.Str()
    label = fields.Nested(i18nSchema)
    score = fields.Str()
    url = fields.Str()
    level = fields.Str()
    
class LinkSchema(Schema):
    type = fields.Str()
    url = fields.Str()
    label = fields.Str()
    mode = fields.Str()
    
class ExternalIdsSchema(Schema):
    type = fields.Str()
    id = fields.Str()

class BadgeSchema(Schema):
    code = fields.Str()
    label = fields.Dict()

class SimilarSchema(Schema):
    target = fields.Str()
    score = fields.Str()

class KeywordsSchema(Schema):
    en = fields.List(fields.Str)
    fr = fields.List(fields.Str)
    default = fields.List(fields.Str)

class CodeLabelSchema(Schema):
    code = fields.Str()
    label = fields.Str(missing=None)

class CodeSchema(Schema):
    code = fields.Str()
    number = fields.Str()

class CertificationSchema(Schema):
    label = fields.Str()
    date = fields.DateTime()

class Coordinates(Schema):
    lat = fields.Number(missing=None)
    lon = fields.Number(missing=None)

class AddressSchema(Schema):
    main = fields.Boolean()
    address = fields.Str(missing=None)
    postcode = fields.Str(missing=None)
    city = fields.Str(missing=None)
    citycode = fields.Str(missing=None)
    country = fields.Str(missing=None)
    provider = fields.Str(missing=None)
    score = fields.Float(missing=None)
    urbanUnitCode = fields.Str(missing=None)
    urbanUnitLabel = fields.Str(missing=None)
    gps = fields.Nested(Coordinates, missing=None)
    localisationSuggestions = fields.List(fields.Str, missing=None)

class OrganizationsEvalSchema(Schema):
    evaluator = fields.Str()
    url = fields.Str()
    year = fields.Integer()

class OrganizationsParentSchema(Schema):
    structure = fields.Str(missing=None)
    fromDate = fields.DateTime(missing=None)
    type = fields.Str(missing=None)
    label = fields.Str(missing=None)

class OrganizationsRelationSchema(Schema):
    structure = fields.Str(missing=None)
    fromDate = fields.DateTime(missing=None)
    type = fields.Str(missing=None)

class OrganizationsPredecessorSchema(Schema):
    structure = fields.Str(missing=None)
    eventYear = fields.Integer(missing=None)
    eventType = fields.Str(missing=None)
    label = fields.Str(missing=None)

class OrganizationsInstitutionSchema(Schema):
    structure = fields.Str(missing=None)
    code = fields.Nested(CodeSchema)
    relationType = fields.Str(missing=None)
    fromDate = fields.DateTime(missing=None)
    label = fields.Str(missing=None)
    url = fields.Str(missing=None)

class OrganizationsLeaderSchema(Schema):
    person = fields.Str(missing=None)
    role = fields.Str(missing=None)
    fromDate = fields.Date(missing=None)
    firstname = fields.Str(missing=None)
    lastname = fields.Str(missing=None)
    title = fields.Str(missing=None)

class OrganizationsActivitieSchema(Schema):
    code = fields.Str()
    type = fields.Str()
    label = fields.Nested(i18nSchema)
    secondary = fields.Boolean()

class OrganizationsEmployeeSchema(Schema):
    employeeNb = fields.Integer()
    employeeNbSlice = fields.Str()
    ecNb = fields.Integer()
    hdrNb = fields.Integer()
    date = fields.DateTime()

class OrganizationsFinanceSchema(Schema):
    revenue = fields.Str()
    operatingIncome = fields.Str()
    date = fields.DateTime()

class OrganizationsSocialMediaSchema(Schema):
    account = fields.Str(missing=None)
    socialMediaType = fields.Str()
    url = fields.Str()
    language = fields.Str()

class OrganizationsSpinoffSchema(Schema):
    project = fields.Str()
    structure = fields.Str()
    label = fields.Str()
    type = fields.Str()
    yearClosing = fields.Integer()

class OrganizationsOfferSchema(Schema):
    kind = fields.Str()
    name = fields.Str()
    description = fields.Str()
    sourceUrl = fields.Str()
    details = fields.Str()
    domains = fields.Nested(DomainSchema, many=True)
    address = fields.Nested(AddressSchema, many=True)

class OrganizationSchema(Schema):
    id = fields.Str()
    kind = fields.List(fields.Str, missing=['Secteur privé'])
    logo = fields.Str(missing=None)
    label = fields.Nested(i18nSchema, missing=None)
    acronym = fields.Nested(i18nSchema, missing=None)
    description = fields.Nested(i18nSchema, missing=None)
    nature = fields.Str(missing=None)
    status = fields.Str()
    isFrench = fields.Boolean()
    isPublic = fields.Boolean()
    address = fields.Nested(AddressSchema, many=True)
    commercialBrands = fields.List(fields.Str)
    alias = fields.List(fields.Str, missing=None)
    legalCategory = fields.Nested(CodeLabelSchema)
    level = fields.Str(missing=None)
    focus = fields.List(fields.Str)
    keywords = fields.Nested(KeywordsSchema)
    creationYear = fields.Int(missing=None)
    createdDate = fields.DateTime()
    lastUpdated = fields.DateTime()
    createdAt = fields.DateTime()
    removedAt = fields.DateTime(missing=None)
    startDate = fields.DateTime(missing=None)
    endDate = fields.DateTime(missing=None)
    email = fields.Str(missing=None)
    phone = fields.Str(missing=None)
    links = fields.Nested(LinkSchema, many=True)
    parents = fields.Nested(OrganizationsParentSchema, many=True)
    predecessors = fields.Nested(OrganizationsPredecessorSchema, many=True)
    institutions = fields.Nested(OrganizationsInstitutionSchema, many=True)
    leaders = fields.Nested(OrganizationsLeaderSchema, many=True)
    relations = fields.Nested(OrganizationsRelationSchema, many=True)
    domains = fields.Nested(DomainSchema, many=True)
    badges = fields.Nested(BadgeSchema, many=True)
    finance = fields.Nested(OrganizationsFinanceSchema)
    activities = fields.Nested(OrganizationsActivitieSchema, many=True)
    employeesInfo = fields.Nested(OrganizationsEmployeeSchema)
    externalIds = fields.Nested(ExternalIdsSchema, many=True)
    socialMedias = fields.Nested(OrganizationsSocialMediaSchema, many=True)
    spinoffs = fields.Nested(OrganizationsSpinoffSchema, many=True)
    evaluations = fields.Nested(OrganizationsEvalSchema, many=True)
    offers = fields.Nested(OrganizationsOfferSchema, many=True)



def scanr_encoder(obj):
    """Scanr Encoder."""
    try:
        if isinstance(obj, datetime):
            return obj.strftime("%4Y-%m-%d")
        elif isinstance(obj, ObjectId):
            return str(obj)
    except TypeError:
        pass
    
def scanr_encoder2(obj):
    """Scanr Encoder."""
    try:
        if isinstance(obj, datetime):
            return obj.strftime("%4Y-%m-%dT%H:%M:%S")
        elif isinstance(obj, ObjectId):
            return str(obj)
    except TypeError:
        pass

def dump_from_mongo(mongo, db, collection, to_file):
    """Send scanr collection as a json file in ftp."""
    coll = mongo[db][collection]
    cursor = coll.find({}, {"_id": 0})
    file = "scanrJSON/" + to_file
    # Creates a json file to send to ftp
    with open(file, "w") as f:
        current_list = [cur for cur in cursor]
        for elem in current_list:
            if 'id' in elem:
                elem['id'] = elem['id'][0:450]
                if len(elem['id'])>450:
                    print(len(elem['id']), elem['id'])
        json.dump(current_list, f, default=scanr_encoder, indent=4)
        f.close()
    return {'ok': 1}

def dump_publications_from_mongo(mongo, to_file):
    """Send scanr collection as a json file in ftp."""
    coll_publications = mongo.publications.scanr
    cursor_publications = coll_publications.find({}, {"_id": 0})
    coll_patents = mongo.patents.scanr
    cursor_patents = coll_patents.find({}, {"_id": 0})
    file = "scanrJSON/" + to_file
    # Creates a json file to send to ftp
    ix_pat = 0
    ix_pub = 0
    with open(file, "w") as f:
        f.write('[')
        for i in cursor_patents:
            ix_pat += 1
            if 'links' in i:
                links = i['links']
                for link in links:
                    if 'url' in link:
                        link['url'] = 'date_'+link['url']
            json.dump(i, f, default=scanr_encoder, indent=4)
            f.write(',\n')
        print("{} patents".format(ix_pat))
        for i in cursor_publications: 
            ix_pub += 1
            json.dump(i, f, default=scanr_encoder, indent=4)
            f.write(',\n')
        print("{} publi".format(ix_pub))
        print(f.tell())
        f.seek(f.tell()-2, 0)
        f.write(']')
        f.truncate() 
        f.close()
    return {'ok': 1}

def marshmallow_dump_from_mongo(mongo, db, collection, limit):
    """Send scanr collection as a json file in ftp."""
    coll = mongo[db][collection]
    cursor = coll.find({}, {"_id": 0}).limit(limit)
    data = [c for c in cursor]
    pprint(data[2475])
    pprint(data[13496])
    data = json.loads(json.dumps(data, default=scanr_encoder2))
    # Creates a json file to send to ftp
    if db == "persons":
        schema = PersonSchema(many=True)
    if db == "organizations":
        schema = OrganizationSchema(many=True)
    if db == "projects":
        schema = ProjectSchema(many=True)
    if db == "publications":
        schema = PublicationSchema(many=True)
    try:
        schema.load(data)
    except exceptions.ValidationError as err:
        pprint(err.messages)
    return "end"


# In[4]:


#start = datetime.now()
#data = marshmallow_dump_from_mongo(mongo=mongo, db="organizations", collection="scanr", limit=100000)
#print("end orgs")
#data = marshmallow_dump_from_mongo(mongo=mongo, db="projects", collection="scanr", limit=3000)
#print("end projs")
#data = marshmallow_dump_from_mongo(mongo=mongo, db="publications", collection="scanr", limit=3000)
#print("end pubs")
#data = marshmallow_dump_from_mongo(mongo=mongo, db="persons", collection="scanr", limit=3000)
#print("end pers")
#print(datetime.now()-start)


# In[7]:


do_orga = False
do_project = False
do_production = False
do_person = True

start = datetime.now()
if do_orga:
    print("start orga")
    dump_from_mongo(mongo=mongo, db="organizations", collection="scanr", to_file="organizations.json")
    print("end")
    print("")
if do_project:
    print("start projects")
    dump_from_mongo(mongo=mongo, db="projects", collection="scanr", to_file="projects.json")
    print("end")
    print("")
if do_production:
    print("start productions")
    dump_publications_from_mongo(mongo=mongo, to_file="publications.json")
    print("end")
    print("")
if do_person:
    print("start persons")
    dump_from_mongo(mongo=mongo, db="persons", collection="scanr", to_file="persons.json")
    print("end")
    print("")
print(datetime.now()- start)




