#!/bin/bash

read formData;

creator_prev=$(echo $formData | awk -F";" '{print $1}');
creator=$(echo $creator_prev | awk -F: '{print $2}');

user_prev=$(echo $formData | awk -F";" '{print $2}');
user=$(echo $user_prev | awk -F: '{print $2}');

deleted="false"
message=""

if [[ $(id -u $creator) -eq "0" ]]; then
    rem_exec=$(sudo userdel -r $user);

    if [[ $rem_exec -eq 0 ]]; then
        logger -p local1.info "Delete user success! $user deleted!"
        deleted="true"
        message="User has been deleted from the system!"
    else
        logger -p local1.alert "Delete user failed!"
        message="Failed to delete user!"
    fi
else
    logger -p local1.alert "$creator with no permissions. Delete user failed!"
    message="Only root may delete a user from the system."
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "deleted": "'"$deleted"'",
    "message": "'"$message"'",
    "creator": "'"$user"'"
}'