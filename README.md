# swarm

```sh
~/projects/swarm/ansible$ ansible -i inventory.ini -m ping all
~/projects/swarm/ansible$ ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f docker-ssh -N ""
~/projects/swarm/ansible$ ssh-copy-id -i docker-ssh.pub ubuntu@54.38.137.98
~/projects/swarm/ansible$ printf "DOCKER_SSH_PRIVATE_KEY:\n$(cat ./docker-ssh)\n"
~/projects/swarm/ansible$ printf "DOCKER_SSH_PUBLIC_KEY:\n$(cat ~/.ssh/known_hosts | grep 54.38.137.98)\n"
```

## storage

- [Setup Highly Available applications with Docker Swarm and Gluster](https://medium.com/running-a-software-factory/setup-3-node-high-availability-cluster-with-glusterfs-and-docker-swarm-b4ff80c6b5c3)

```sh
~/projects/swarm/ansible$ ansible-playbook -i inventory.ini playbook-storage.yml
```

```sh
ubuntu@s1-2-manager:~$ cat /etc/hosts
ubuntu@s1-2-manager:~$ sudo gluster pool list
ubuntu@s1-2-manager:~$ sudo gluster volume status
ubuntu@s1-2-manager:~$ ls /mnt/gv0/
```

## cluster

```sh
~/projects/swarm/ansible$ ansible-playbook -i inventory.ini playbook-cluster.yml
```

```sh
ubuntu@s1-2-manager:~$ docker info
ubuntu@s1-2-manager:~$ docker node ls
ubuntu@s1-2-manager:~$ echo $GH_TOKEN | docker login https://docker.pkg.github.com -u zimekk --password-stdin
ubuntu@s1-2-manager:~$ curl https://raw.githubusercontent.com/zimekk/swarm/master/docker-compose.yml | VERSION=latest docker stack deploy --compose-file - --prune --resolve-image always --with-registry-auth swarm
ubuntu@s1-2-manager:~$ docker service ls
ubuntu@s1-2-manager:~$ docker service ps swarm_app
ubuntu@s1-2-manager:~$ watch docker stack ps swarm
```

```sh
~/projects/swarm$ VERSION=latest docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.yml --prune --resolve-image always --with-registry-auth swarm
```

## swarmpit

- [Swarmpit web user interface for your Docker Swarm cluster](https://dockerswarm.rocks/swarmpit/)

```sh
ubuntu@s1-2-manager:~$ docker node update --label-add swarmpit.influx-data=true $(docker info -f '{{.Swarm.NodeID}}')
```

```sh
~/projects/swarm$ DOMAIN=swarmpit.swarm.makarewicz.eu docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.swarmpit.yml swarmpit
```

## tick

Monitor Swarm Cluster with Telegraf, InfluxDB, Chronograf, Kapacitor & Slack

- [Monitor Swarm cluster with TICK stack & Slack](http://www.blog.labouardy.com/monitor-swarm-cluster-with-tick-stack-slack/)

```sh
~/projects/swarm$ docker --host ssh://ubuntu@54.38.137.98 stack deploy --compose-file docker-compose.tick.yml tick
```

## install

```sh
~$ nvm install v12
~$ node -v
v12.18.4
```

- https://docs.docker.com/engine/install/

```sh
~$ docker -v
Docker version 19.03.12, build 48a66213fe
```

- https://docs.docker.com/compose/install/

```sh
~$ docker-compose -v
docker-compose version 1.26.2, build eefe0d31
```

## running

```sh
~/projects$ git clone git@github.com:zimekk/swarm.git
~/projects$ cd swarm
```

```sh
~/projects/swarm$ docker swarm init
~/projects/swarm$ docker node ls
```

```sh
~/projects/swarm$ docker-compose config
~/projects/swarm$ docker-compose build app
```

```sh
~/projects/swarm$ cat ~/GH_TOKEN.txt | docker login https://docker.pkg.github.com -u zimekk --password-stdin
~/projects/swarm$ docker pull docker.pkg.github.com/zimekk/swarm/app:latest
~/projects/swarm$ ./deploy.sh
```

```sh
~/projects/swarm$ docker service ls
~/projects/swarm$ docker service ps swarm_nginx
~/projects/swarm$ docker service logs swarm_nginx
```

```sh
~/projects/swarm$ curl http://localhost/
~/projects/swarm$ docker stack rm swarm
```

## reading

- https://testdriven.io/blog/running-flask-on-docker-swarm/
- https://github.com/testdrivenio/flask-docker-swarm
- https://github.com/BretFisher/dogvscat
- https://github.com/dockersamples/docker-swarm-visualizer
- https://github.com/nginx-proxy/nginx-proxy
- https://dockerswarm.rocks/traefik/
- https://www.portainer.io/portainer-ce/portainer-ce-for-swarm/
