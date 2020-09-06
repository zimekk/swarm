# swarm

## running

```sh
~/projects$ git clone git@github.com:zimekk/swarm.git
~/projects$ cd swarm
```

```sh
~/projects/swarm$ sudo docker swarm init
~/projects/swarm$ ./deploy.sh
```

```sh
~/projects/swarm$ docker service ls
~/projects/swarm$ docker service ps swarm_nginx
~/projects/swarm$ docker service logs swarm_nginx
```

## reading

- https://github.com/testdrivenio/flask-docker-swarm
- https://github.com/BretFisher/dogvscat
- https://dockerswarm.rocks/traefik/
