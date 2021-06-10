#!/bin/bash

userList=$("awk -F: '{ print $1}' /etc/passwd");

mem_data=$(cat /proc/meminfo | awk -F: '{print "<tr>"; print "<td>" $1 "</td>"; print "<td>" $2 "</td>"; print "</tr>"}'); 


echo "Content-type: application/json"
echo ""
echo -e '{
    "users": "'"$users"'",
}'