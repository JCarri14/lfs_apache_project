#!/bin/bash

logs=$(awk -F: '{ printf "\"%s\",", $4 }' /var/log/webserver.log);
logs=${logs:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "logs": [
       '"$logs"'
   ]
}'