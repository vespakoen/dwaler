#!/bin/bash

. ./env.sh

function add_secret {
  echo "Adding secret: $2"
  docker run -v $(pwd):/project --rm drone/drone:0.5 -t $DRONE_USER_TOKEN -s https://ci.koenschmeets.nl secret add --image=$1 vespakoen/dwaler $2 "$3"
}

add_secret docker DOCKER_REGISTRY $DOCKER_REGISTRY_URL
add_secret docker DOCKER_USERNAME $DOCKER_REGISTRY_USERNAME
add_secret docker DOCKER_PASSWORD $DOCKER_REGISTRY_PASSWORD

add_secret plugins/sftp-cache:latest SFTP_CACHE_SERVER $SFTP_CACHE_SERVER
add_secret plugins/sftp-cache:latest SFTP_CACHE_USERNAME $SFTP_CACHE_USERNAME
add_secret plugins/sftp-cache:latest SFTP_CACHE_PASSWORD $SFTP_CACHE_PASSWORD
add_secret plugins/sftp-cache:latest SFTP_CACHE_PATH $SFTP_CACHE_PATH

add_secret plugins/slack:latest SLACK_WEBHOOK $SLACK_WEBHOOK
