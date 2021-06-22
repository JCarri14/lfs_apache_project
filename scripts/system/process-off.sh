#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    logger -p local1.alert "$creator shutting down system"
    sudo shutdown -h now   
else
    logger -p local1.alert "$creator with no permissions. Shutdown avoided!"
    message="Only root may shutdown system."

    echo "Content-type: application/json"
    echo ""
    echo -e '{
        "message": "'"$message"'"
    }'
fi
