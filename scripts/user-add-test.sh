#!/bin/bash

read formData;

pass_encrypted=$(openssl passwd -1 hola);

add_exec=$(sudo -u root useradd -m -p $pass_encrypted userTest);

if [[ $add_exec -eq 0 ]]; then
    echo "User has been added to system!"
else
    echo "Failed to add a user! ($add_exec)"
fi
