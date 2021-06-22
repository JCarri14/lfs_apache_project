#!/bin/bash

list_file='/media/songList.txt'

songs=$(awk '{ printf "\"%s\",", $0 }' $list_file);
songs=${songs:0:-1};

echo "Content-type: application/json"
echo ""
echo -e '{
   "songs": [
       '"$songs"'
   ]}'