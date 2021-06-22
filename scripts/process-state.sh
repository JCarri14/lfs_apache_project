#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

pid_prev=$(echo $formData | awk -F";" '{print $2}');
pid=$(echo $pid_prev | awk -F: '{print $2}');


details=$(ps -aux | awk '{ if ($2==pid) printf "\"%s\"", $0 }' pid="$pid");

echo "Content-type: application/json"
echo ""
echo -e '{
    "details": '"$details"'
}'