#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

minutes=$(echo $formData | awk -F";" '{print $2}');
minutes=$(echo $minutes | awk -F: '{print $2}');

hour=$(echo $formData | awk -F";" '{print $3}');
hour=$(echo $hour | awk -F: '{print $2}');

monthDay=$(echo $formData | awk -F";" '{print $4}');
monthDay=$(echo $monthDay | awk -F: '{print $2}');

month=$(echo $formData | awk -F";" '{print $5}');
month=$(echo $month | awk -F: '{print $2}');

weekDay=$(echo $formData | awk -F";" '{print $6}');
weekDay=$(echo $weekDay | awk -F: '{print $2}');

task=$(echo $formData | awk -F";" '{print $7}');
task=$(echo $task | awk -F: '{print $2}');


exec_string="$minutes $hour $monthDay $month $weekDay $task"
deleted="false"
message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    #write out current crontab
    execution=$(sudo crontab -l | grep -v "$exec_string" > auxCrontab);
    #install new cron file
    sudo crontab auxCrontab;
    #sudo rm auxCrontab;

    if [[ $execution -eq 0 ]]; then
        logger -p local1.info "Remove task success!"
        deleted="true"
        message="Task has been deleted!"
    else
        logger -p local1.alert "Remove task failed!"
        message="Failed to delete task!"
    fi
else
    logger -p local1.alert "$creator with no permissions. Remove task failed!"
    message="Only root may delete tasks to the system."
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "deleted": '"$deleted"',
    "message": "'"$exec_string"'"
}'