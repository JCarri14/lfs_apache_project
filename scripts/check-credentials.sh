isValidUser () {
    user=$1
    pswd=$2

    user_shadow="$(cat /etc/shadow | grep $user | awk -F: '{print $2}')";
    pswd_encryption=$(echo $user_shadow | cut -d$ -f2);
    pswd_salt=$(echo $user_shadow | cut -d$ -f3);
    pswd_encrypted=$(echo $user_shadow | cut -d$ -f4);

    pswd_hashed=$(echo $pswd | openssl passwd -$pswd_encryption -salt $pswd_salt);
    pswd_hashed=$(echo $pswd_hashed | cut -d$ -f4);

    isValid=$([ $pswd_encrypted = $pswd_hashed ] && echo "true" || echo "false")
    echo $isValid
}

echo $(isValidUser $*)