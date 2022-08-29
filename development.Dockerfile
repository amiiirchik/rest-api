FROM node:alpine as service
RUN npm install -g nodemon
WORKDIR /var/www/html
COPY ./package.json ./package.json
RUN npm install --silent --production=false
COPY ./ ./

FROM service
VOLUME ["/var/www/html", "/var/www/html/node_modules"]
