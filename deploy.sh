#!/bin/bash

VERSION=latest docker stack deploy --compose-file docker-compose.yml swarm --with-registry-auth --prune
