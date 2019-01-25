#!/bin/bash

# changes the server address to your desired target address
# you can also manually change/fix the address in src/store.js

TARGET_SERVER=$1
echo switching server to $TARGET_SERVER
escaped=$(echo $TARGET_SERVER | sed 's/\//\\\//g')

sed "s/http:\/\/localhost:8080/$escaped/" src/store.js -i
