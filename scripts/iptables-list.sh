#!/bin/bash

ipRules=$(sudo iptables -L --line-numbers | awk '{ printf "\"%s|%s|%s|%s|%s|%s\",", $1, $2, $3, $4, $5, $6}');
ipRules=${ipRules:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "rules": [
       '"$ipRules"'
   ]}'