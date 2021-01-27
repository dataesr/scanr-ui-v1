ssh -l ejeangirard@default@pr-mgl-web01.magical.in.phm.education.gouv.fr:ejeangirard ssh.in.phm.education.gouv.fr << EOF
cd scanr/scanr-v2
git fetch --all && git reset --hard origin/master && npm install && npm run build
sudo -E -iu root << IN1_EOF
cd / && chmod -R 777 www
rm -rf /www_old/build
/bin/mv /www/build /www_old/.
IN1_EOF
/bin/cp -rf build/ /www/. && cd /www
sudo -E -iu root << IN_EOF
cd /www && chmod -R 755 build
#/bin/cp -rf /export/home/ejeangirard/scanr/scanr-v2/build/ /www/. && cd /www && chmod -R 755 build
IN_EOF
EOF

