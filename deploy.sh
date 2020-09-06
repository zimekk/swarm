#!/bin/bash

docker stack deploy --compose-file <(docker-compose --log-level ERROR config) swarm
