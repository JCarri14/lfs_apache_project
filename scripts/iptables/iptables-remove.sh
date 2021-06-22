#!/bin/bash

read formData;

creator=$(echo $formData | awk -F";" '{print $1}' | awk -F: '{print $2}');
rule_type=$(echo $formData | awk -F";" '{print $2}' | awk -F: '{print $2}');
id=$(echo $formData | awk -F";" '{print $3}' | awk -F: '{print $2}');

rem_exec=$(sudo iptables -D $rule_type $id);

removed="false"
message=""

if [[ $rem_exec -eq 0 ]]; then
    logger -p local1.info "[IPTABLES] Rule removed correctly!"
    removed="true"
    message="Rule removed correctly!"
else
    logger -p local1.alert "[IPTABLES] Failed to remove rule!"
    message="Failed to remove rule!"
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "removed": '"$removed"',
    "message": "'"$message"'"
}'