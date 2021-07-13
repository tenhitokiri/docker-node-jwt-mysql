#STAGE 0 COMPILE ON NODEJS
FROM node:12 as node

#Define working dir inside the container
WORKDIR /app

#Copy app into container
COPY ./app/ /app/

#Install dependencies in container
RUN yarn

#Enviroment variables
ENV MYSQL_SERVER=$MYSQL_SERVER
ENV MYSQL_PORT=$MYSQL_PORT
ENV MYSQL_DB=$MYSQL_DB
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PW=$MYSQL_PW
ENV DEPLOYMENT=$DEPLOYMENT
ENV PORT=$PORT
ENV SECRET_KEY=$SECRET_KEY

#Expose a port
EXPOSE $PORT 

# Start the application
CMD [ "node", "index.js" ]
