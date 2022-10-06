FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest

USER 1001
WORKDIR /usr/src/app

COPY src ./

RUN npm install 


COPY . .
EXPOSE 8080

CMD ["node", "server.js"]
