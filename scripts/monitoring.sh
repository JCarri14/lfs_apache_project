#!/bin/bash

function printMemTableData () {
    mem_data=$(cat /proc/meminfo | awk -F: '{print "<tr>"; print "<td>" $1 "</td>"; print "<td>" $2 "</td>"; print "</tr>"}');
    echo -e "<div class='mem-card card'>"
    echo "<table class='table table-striped'>"
    echo -e "<thead>
    <th scope="col">Entry</th>
    <th scope="col">Value</th>
    <tbody>"
    echo "$mem_data"
    echo "</tbody>"
    echo "</table>"
}

function printDiskTableData () {
    disk_data=$(df -h | awk -F " " ' NR>1{print "<tr>"; for(i=1;i<=NF;i++) print "<td>" $i "</td>"; print "</tr>"}');
    echo -e "<div class='disk-card card'>"
    echo "<table class='table table-striped'>"
    echo -e "<thead>
    <th scope="col">FileSystem</th>
    <th scope="col">Size</th>
    <th scope="col">Used</th>
    <th scope="col">Avail</th>
    <th scope="col">Use</th>
    <th scope="col">Mounted on</th>
    <tbody>"
    echo "$disk_data"
    echo "</tbody>"
    echo "</table>"
}

cpu_data=$(lscpu | awk -F: '{ gsub(/  /,""); gsub(/ /,",");  printf "\"%s|%s\",", $1, $2 }');
cpu_data=${cpu_data:0:-1};

mem_data=$(cat /proc/meminfo | awk -F: '{ printf "\"%s-%s\",", $1, $2 }');
mem_data=${mem_data:0:-1};

#disk_data=$(df -h | awk -F " " ' NR>1 {print "<tr>"; for(i=1;i<=NF;i++) print "<td>" $i "</td>"; print "</tr>"}');

access_data=$(cat /var/log/webserver.log | grep "ServerAccess" | tail -n 10 |  awk -F: '{ printf "\"%s\",", $0 }');
access_data=${access_data:0:-1};

time_data=$(sudo who -b);

echo "Content-type: application/json"
echo ""
echo -e '{
    "cpuData": [
        '"$cpu_data"'
    ],
    "diskData": [
        '"$disk_data"'
    ],
    "memData": [
        '"$mem_data"'
    ],
    "accessData": [
        '"$access_data"'
    ],
    "time": "'"$time_data"'"
}'

# echo -e '{
#     "cpuData": [
#        '"$cpu_data"'
#    ],
#    "diskData": [
#        '"$disk_data"'
#    ],
#     "memData": [
#        '"$mem_data"'
#    ],
#    "accessData": [
#        '"$access_data"'
#    ],
#    "time": '"$time_data"' 
# }'
