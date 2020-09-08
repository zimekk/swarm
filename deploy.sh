#!/bin/bash

docker stack deploy --with-registry-auth --compose-file <(docker-compose --log-level ERROR config) swarm
