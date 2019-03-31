FROM node:11-alpine

WORKDIR /usr/src/bgw-backend

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 59091

RUN npm run build

CMD [ "npm", "run", "start-forever" ]
