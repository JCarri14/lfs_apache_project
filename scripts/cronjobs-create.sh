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
created="false"
message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    #write out current crontab
    sudo crontab -l > cpCrontab;
    #echo new cron into cron file
    #exec_string=$(echo "01 09 * * 1-2 joan echo hello" >> cpCrontab);

    execution=$(echo "$exec_string" >> cpCrontab);
    #install new cron file
    sudo crontab cpCrontab;
    #sudo rm cpCrontab;


    if [[ $execution -eq 0 ]]; then
        logger -p local1.info "Add task success!"
        created="true"
        message="Task has been created!"
    else
        logger -p local1.alert "Add task failed!"
        message="Failed to add task!"
    fi
else
    logger -p local1.alert "$creator with no permissions. Add task failed!"
    message="Only root may add tasks to the system."
fi


echo "Content-type: application/json"
echo ""
echo -e '{
    "created": '"$created"',
    "message": "'"$exec_string"'"
}'