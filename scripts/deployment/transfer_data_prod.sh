# a faire une fois 
# ssh -p 139 menesr@51.91.212.5
lftp sftp://menesr:9747TK78aU@51.91.212.5:139 << EOF
cd upload
put scanrJSON/organizations.json
put scanrJSON/projects.json
put scanrJSON/persons.json
put scanrJSON/publications.json
bye
EOF
