#!/bin/bash

read textData;

user_prev=$(echo $textData | awk -F";" '{print $1}');
user=$(echo $user_prev | awk -F: '{print $2}');
#user="$(echo $user_prev | sed -e 's/[[:space:]]*$//')";

pswd_prev=$(echo $textData | awk -F";" '{print $2}');
pswd=$(echo $pswd_prev | awk -F: '{print $2}');
#pswd="$(echo $pswd_prev | sed -e 's/[[:space:]]*$//')";

isValid=$( ./check-credentials.sh "$user" "$pswd")

if [ $isValid = "true" ]; then
    $(echo $user > currentUser.txt);
    logger -p local1.info "[ServerAccess] $user logged in!"
else
    logger -p local1.info "Someone tried to access as $user, but failed!"
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "user": "'"$user"'",
    "valid": '$isValid'
}'
