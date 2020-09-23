# swarm

```sh
~/projects/swarm/ansible$ ansible-playbook -i inventory.yml playbook.yml
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
~/projects/swarm$ sudo docker swarm init
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
