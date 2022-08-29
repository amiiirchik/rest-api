FROM node:alpine as main
WORKDIR /var/www/html
COPY package*.json ./
RUN npm install
COPY . .
