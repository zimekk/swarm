#!/bin/bash

docker --host ssh://ubuntu@54.38.137.98 stack rm tick
docker --host ssh://ubuntu@54.38.137.98 stack rm prom
docker --host ssh://ubuntu@54.38.137.98 stack rm swarmpit
docker --host ssh://ubuntu@54.38.137.98 stack rm swarm
