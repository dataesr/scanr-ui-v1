# a faire une fois 
# ssh -p 22 menesrscanesr@sftplyon.sword-group.com
lftp sftp://menesrscanesr:eNigA2K4P5q7@sftplyon.sword-group.com << EOF
cd Data/Input
put scanrJSON/organizations.json
put scanrJSON/projects.json
put scanrJSON/persons.json
put scanrJSON/publications.json
bye
EOF
