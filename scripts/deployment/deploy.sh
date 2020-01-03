ssh -l ejeangirard@default@pr-mgl-web01.magical.in.phm.education.gouv.fr:ejeangirard ssh.in.phm.education.gouv.fr << EOF
<<<<<<< HEAD
mkdir -p scanr && cd scanr && rm -rf scanr-v2 && git clone https://dataesr:dataESR2019@github.com/jerem1508/scanr-v2.git && cd scanr-v2 && npm install && npm run build
#cd scanr && cd scanr-v2
#sudo -E -iu root << IN_EOF
#/bin/cp -rf /export/home/ejeangirard/scanr/scanr-v2/build/ /www/. && cd /www && chmod -R 755 build
/bin/cp -rf build/ /www/. && cd /www
#IN_EOF
=======
#mkdir -p scanr && cd scanr && rm -rf scanr-v2 && git clone https://dataesr:dataESR2019@github.com/jerem1508/scanr-v2.git && cd scanr-v2 && npm install && npm run build
#cd scanr && cd scanr-v2
cd scanr/scanr-v2 && git fetch --all && git reset --hard origin/master && npm install && npm run build
sudo -E -iu root << IN1_EOF
cd / && chmod -R 777 www
IN1_EOF
/bin/cp -rf build/ /www/. && cd /www
sudo -E -iu root << IN_EOF
cd /www && chmod -R 755 build
#/bin/cp -rf /export/home/ejeangirard/scanr/scanr-v2/build/ /www/. && cd /www && chmod -R 755 build
IN_EOF
>>>>>>> a9fbd1b489123ee96ce7919a20f4a992b65f6943
EOF

