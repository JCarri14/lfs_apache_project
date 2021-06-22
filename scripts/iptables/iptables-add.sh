#!/bin/bash

read formData;

creator=$(echo $formData | awk -F";" '{print $1}' | awk -F: '{print $2}');
rule_type=$(echo $formData | awk -F";" '{print $2}' | awk -F: '{print $2}');
action=$(echo $formData | awk -F";" '{print $3}' | awk -F: '{print $2}');
protocol=$(echo $formData | awk -F";" '{print $4}' | awk -F: '{print $2}');
port=$(echo $formData | awk -F";" '{print $5}' | awk -F: '{print $2}');
origin=$(echo $formData | awk -F";" '{print $6}' | awk -F: '{print $2}');
destination=$(echo $formData | awk -F";" '{print $7}' | awk -F: '{print $2}');

add_exec=$(sudo iptables -A $rule_type -p $protocol -s $origin -d $destination --dport $port -j $action);

added="false"
message=""

if [[ $add_exec -eq 0 ]]; then
    logger -p local1.info "[IPTABLES] Rule added correctly!"
    added="true"
    message="Rule added correctly!"
else
    logger -p local1.alert "[IPTABLES] Failed to add rule!"
    message="Failed to add rule!"
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "added": '"$added"',
    "message": "'"$message"'"
}'