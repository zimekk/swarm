#!/bin/bash

#docker stack deploy --with-registry-auth --compose-file <(docker-compose --log-level ERROR config) swarm
docker stack deploy --compose-file docker-compose.yml swarm --with-registry-auth --prune
