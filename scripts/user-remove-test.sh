#!/bin/bash

#rem_exec=$(sudo -u root userdel -r userTest);
rem_exec=$(sudo userdel -r userTest);

if [[ $rem_exec -eq 0 ]]; then    
    message="User has been deleted from the system!"
else
    message="Failed to delete user!"
fi

echo "Content-type: application/json"
echo ""
echo -e '{
    "message": "'"$message"'",
}'
