#!/bin/bash

users=$(awk -F: '{ printf "\"%s\",", $1 }' /etc/passwd);
users=${users:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "users": [
       '"$users"'
   ]}'