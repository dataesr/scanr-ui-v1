ssh -fN -L 9998:localhost:27017  webadmin@185.161.45.213 -p 2210 -o "ProxyCommand=nc -X connect -x 10.244.16.9:9090 %h %p"
mkdir -p scanrJSON
