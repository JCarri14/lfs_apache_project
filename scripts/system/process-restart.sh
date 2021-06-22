#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    logger -p local1.alert "$creator restarting system"
    sudo shutdown -r now   
else
    logger -p local1.alert "$creator with no permissions. Restart avoided!"
    message="Only root may restart system."

    echo "Content-type: application/json"
    echo ""
    echo -e '{
        "message": "'"$message"'"
    }'
fi
