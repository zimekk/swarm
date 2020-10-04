#!/bin/bash

# VERSION=latest docker stack deploy --compose-file docker-compose.yml swarm --with-registry-auth --prune
VERSION=latest docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.yml --prune --resolve-image always --with-registry-auth swarm
DOMAIN=swarmpit.swarm.makarewicz.eu docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.swarmpit.yml swarmpit
docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.tick.yml tick
docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.prom.yml prom
