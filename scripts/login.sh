#!/bin/bash
read username;
read password;

user_prev=$(echo $username | awk -F= '{print $2}'); 
user="$(echo $user_prev | sed -e 's/[[:space:]]*$//')";

pswd_prev=$(echo $password | awk -F= '{print $2}');
pswd="$(echo $pswd_prev | sed -e 's/[[:space:]]*$//')";

isValid=$( ./check_credentials.sh "$user" "$pswd")

echo "Content-type: text/html"
echo ""
echo "<!doctype html>"
echo  "<html>"
echo "<body>"
echo "Hi"
echo "$username"
echo "<br/>"
echo "$user"
echo "<br/>"
echo "$isValid"
echo "</body>"
echo "</html>"