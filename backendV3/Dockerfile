FROM node:11-alpine

WORKDIR /usr/src/bgw-backendV3

COPY package*.json ./
RUN npm ci

COPY . .
# RUN npm run test

EXPOSE 9091
CMD [ "npm", "start" ]
