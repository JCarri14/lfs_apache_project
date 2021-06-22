#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

pid_prev=$(echo $formData | awk -F";" '{print $2}');
pid=$(echo $pid_prev | awk -F: '{print $2}');

removed="false"
message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    stopExec=$(sudo kill -9 $pid);

    if [[ $stopExec -eq 0 ]]; then
        logger -p local1.info "Process $pid has been remove"
        removed="true"
        message="Process has been removed"
    else
        logger -p local1.alert "Remove process failed!"
        message="Failed to remove process"
    fi
else
    logger -p local1.alert "$creator with no permissions. Remove process $pid failed!"
    message="Only root may remove processes from the system."
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "remove": '"$removed"',
    "message": "'"$message"'"
}'