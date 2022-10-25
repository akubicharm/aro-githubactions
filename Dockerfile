FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest

WORKDIR /usr/src/app

COPY src ./


#RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir -p node_modules && chmod -R 777 node_modules
RUN npm install 

USER 1001
EXPOSE 8080

CMD ["node", "index.js"]
