FROM node:alpine

WORKDIR /home/project/server

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]