# Containerizing a Slack Clone App Built with the MERN Stack




## Prerequisite

- MongoDB
- Express
- React.js
- Node
- Docker Desktop


## Getting Started



## Cloning the repository


```
 git clone https://github.com/dockersamples/slack-clone-docker
```

## Building the Service containers

```
 docker compose up -d
```

![image](https://user-images.githubusercontent.com/313480/193378996-14ce3feb-5087-4e14-b07d-a350e6eb133c.png)


```
 docker compose ps
               Name                             Command               State            Ports        -----------------------------------------------------------------------------
slack-clone-docker_db_1              docker-entrypoint.sh mongod      Up      0.0.0.0:27017->27017/tcp
slack-clone-docker_nodebackend_1     docker-entrypoint.sh node  ...   Up      0.0.0.0:9000->9000/tcp 
slack-clone-docker_slackfrontend_1   docker-entrypoint.sh yarn  ...   Up 
```

## Viewing the containers via Docker Dashboard

![image](https://user-images.githubusercontent.com/313480/193378961-6fcefc7e-916d-4f13-a527-29e419ef539a.png)



## Viewing the Messages

![image](https://user-images.githubusercontent.com/313480/193378966-47b765ce-087a-4405-8cb7-052cc3e58ae0.png)





