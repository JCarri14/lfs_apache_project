#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

user_prev=$(echo $formData | awk -F";" '{print $2}');
user=$(echo $user_prev | awk -F: '{print $2}');

pswd_prev=$(echo $formData | awk -F";" '{print $3}');
pass=$(echo $pswd_prev | awk -F: '{print $2}');

pass_encrypted=$(openssl passwd -1 $pass);

created="false"
message=""

if [[ $(id -u $creator) -eq 0 ]]; then
    add_exec=$(sudo -u root useradd -m -p $pass_encrypted $user);

    if [[ $add_exec -eq 0 ]]; then
        logger -p local1.info "Add user success! $user created!"
        created="true"
        message="User has been added to system!"
    else
        logger -p local1.alert "Add user failed!"
        message="Failed to add a user! ($add_exec)"
    fi
else
    logger -p local1.alert "$creator with no permissions. Add user failed!"
    message="Only root may add a user to the system."
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "created": '"$created"',
    "message": "'"$message"'"
}'