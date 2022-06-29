import json
records = json.load(open('fr-esr-iuf-les-membres.json', 'r'))
iuf_data = {"records": []}
for r in records:
    if r['fields']['annee'] == '2022':
        iuf_data['records'].append(r)
json.dump(iuf_data, open('iuf.json', 'w'))
