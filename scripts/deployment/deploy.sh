ssh -l ejeangirard@default@pr-mgl-web01.magical.in.phm.education.gouv.fr:ejeangirard ssh.in.phm.education.gouv.fr << EOF
#mkdir -p scanr && cd scanr && rm -rf scanr-v2 && git clone https://dataesr:dataESR2019@github.com/jerem1508/scanr-v2.git && cd scanr-v2 && npm install && npm run build
#cd scanr && cd scanr-v2
cd scanr/scanr-v2 && git fetch --all && git reset --hard origin/master && npm install && npm run build
/bin/cp -rf build/ /www/. && cd /www
#sudo -E -iu root << IN_EOF
#/bin/cp -rf /export/home/ejeangirard/scanr/scanr-v2/build/ /www/. && cd /www && chmod -R 755 build
#IN_EOF
EOF

