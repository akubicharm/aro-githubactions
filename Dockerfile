FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest

USER 1001
WORKDIR /usr/src/app

COPY src ./

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN npm install 

EXPOSE 8080

CMD ["node", "index.js"]
