import math

sitemap_index=open('sitemaps/sitemapindex.xml', 'w')
sitemap_index.write("""<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
""")

def read_ids(file_with_id):
    the_file = open(file_with_id, 'r')
    the_file.readline() # header
    ids = []
    for line in the_file.readlines():
        ids.append(line.strip())
    print("{} : {}".format(file_with_id, len(ids)))
    return ids

def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

def create_sitemap(sitemapname, idlist, base_url):
    sitemap = open("sitemaps/"+sitemapname, 'w')
    sitemap.write("""<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    """)
    for current_id in idlist:
        url = base_url+"/"+current_id
        sitemap.write(""" <url>
      <loc>{}</loc>
   </url>""".format(url))
    sitemap.write("</urlset>")



def generate_object_sitemaps(object_key, all_objects):
    the_chunks = list(chunks(all_objects[object_key], 50000))
    for ix, c in enumerate(the_chunks):
        create_sitemap("sitemap_"+object_key+"_{}.xml".format(ix), c, "https://scanr.enseignementsup-recherche.gouv.fr/{}".format(object_key))


organizations_ids = read_ids("scanrJSON/organizations_id.csv")
projects_ids = read_ids("scanrJSON/projects_id.csv")
persons_ids = read_ids("scanrJSON/persons_id.csv")
publications_ids = read_ids("scanrJSON/publications_id.csv")
patents_ids = read_ids("scanrJSON/patents_id.csv")
productions_ids = publications_ids + patents_ids

objects_ids = {
        "entite": organizations_ids,
        "person":  persons_ids,
        "project": projects_ids,
        "publication": productions_ids
}

for k in objects_ids.keys():
    generate_object_sitemaps(k, objects_ids)
    nb_obj = len(objects_ids[k])

    for p in range(0, math.ceil(nb_obj / 50000)):
        sitemap_index.write("""
        <sitemap>
          <loc>https://scanr.enseignementsup-recherche.gouv.fr/sitemap_{}_{}.xml.gz</loc>
        </sitemap>
        """.format(k, p))

sitemap_index.write("</sitemapindex>")
