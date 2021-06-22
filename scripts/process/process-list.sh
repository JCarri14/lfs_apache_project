#!/bin/bash

processes=$(ps -aux | awk 'NR>=2 { printf "\"%s-%s\",", $2, $11 }');
processes=${processes:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "processes": [
       '"$processes"'
   ]}'