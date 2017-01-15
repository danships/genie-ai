FROM node:6.9.3

#contents based on http://jdlm.info/articles/2016/03/06/lessons-building-node-app-docker.html

RUN apt-get update && apt-get install -y build-essential sox libatlas-base-dev espeak && apt-get purge -y

COPY package.json /home/app/

WORKDIR /home/app
RUN npm install
