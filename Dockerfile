FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest

WORKDIR /usr/src/app

COPY src/index.js ./
COPY src/package.json ./
COPY src/.env ./


USER root
RUN npm install 

USER 1001
EXPOSE 8080

CMD ["node", "index.js"]
