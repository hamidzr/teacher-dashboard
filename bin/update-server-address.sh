#!/bin/bash

# changes the server address to your desired target address
# you can also manually change/fix the address in src/store.js

TARGET_SERVER=$1
STORE_FILE=src/store/index.js
echo switching server to $TARGET_SERVER
escaped=$(echo $TARGET_SERVER | sed 's/\//\\\//g')

# read the current server address
# CUR_SERVER=$(grep server_add $STORE_FILE| grep -Eo "http[^']*")
# cur_escaped=$(echo $CUR_SERVER | sed 's/\//\\\//g')
# echo cur server is $CUR_SERVER
# echo cur_escaped $cur_escaped

sed "s/http:\/\/localhost:8080/$escaped/" $STORE_FILE -i
