#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

pid_prev=$(echo $formData | awk -F";" '{print $2}');
pid=$(echo $pid_prev | awk -F: '{print $2}');

interval_prev=$(echo $formData | awk -F";" '{print $3}');
interval=$(echo $interval_prev | awk -F: '{print $2}');


stopped="false"
message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    stopExec=$(sudo kill -STOP $pid; sleep $interval; kill -CONT $pid);

    if [[ $stopExec -eq 0 ]]; then
        logger -p local1.info "Process $pid has been stopped"
        stopped="true"
        message="Process has been stopped"
    else
        logger -p local1.alert "Stop process failed!"
        message="Failed to stop process"
    fi
else
    logger -p local1.alert "$creator with no permissions. Stop pro cess $pid failed!"
    message="Only root may stop processes from the system."
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "stop": '"$stopped"',
    "message": "'"$message"'"
}'