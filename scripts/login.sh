#!/bin/bash
read textData;

user_prev=$(echo $textData | awk -F";" '{print $1}'); 
user=$(echo $user_prev | awk -F: '{print $2}');
#user="$(echo $user_prev | sed -e 's/[[:space:]]*$//')";

pswd_prev=$(echo $textData | awk -F";" '{print $2}');
pswd=$(echo $pswd_prev | awk -F: '{print $2}');
#pswd="$(echo $pswd_prev | sed -e 's/[[:space:]]*$//')";

isValid=$( ./check_credentials.sh "$user" "$pswd")

cookieHeader=""

if [ $isValid = "true" ]
then
    sudo -u $user logger -p local1.info "$user logged in!"
    cookieHeader="Set-Cookie: user=$user"
else
    logger -p local1.alert "Someone tried to access as $user, but failed!"
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "user": "'"$user"'",
    "valid": '$isValid'
}'