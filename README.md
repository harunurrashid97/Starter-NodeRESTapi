# Project Setup

## Build the Docker Image
`docker build -t my-nodejs-api .`

## Run the Application in Docker
`sudo docker run -d --network="host" employee-api-nodejs`

## Check application logs in Docker
`docker logs <container_id>`

## Show Container Id in Docker
`docker ps`