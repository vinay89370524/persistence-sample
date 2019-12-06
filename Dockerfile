FROM node:10 as build

COPY src /src

WORKDIR /src

RUN npm install

RUN npm run build

WORKDIR /src/dist

CMD node index.js