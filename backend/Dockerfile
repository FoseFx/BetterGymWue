FROM node:11-alpine

WORKDIR /usr/src/bgw-backend

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run test

EXPOSE 59091
CMD [ "npm", "start" ]
