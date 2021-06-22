#!/bin/bash

tasks=$(sudo crontab -l | awk '{ printf "\"%s|%s|%s|%s|%s|%s\",", $1, $2, $3, $4, $5, $6}');
tasks=${tasks:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "tasks": [
       '"$tasks"'
   ]}'