FROM node:18-alpine3.16

WORKDIR /app

COPY package.json ./

RUN npm install
