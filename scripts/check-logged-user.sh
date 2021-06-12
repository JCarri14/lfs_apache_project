#!/bin/bash

user=$(cat currentUser.txt | cut -f1);

echo "Content-type: application/json"
echo ""
echo -e '{
    "user": "'"$user"'"
}'