python generate_sitemap.py
cd sitemaps
rm -rf *.gz
gzip sitemap_*
mv sitemap* ../../../public/.
