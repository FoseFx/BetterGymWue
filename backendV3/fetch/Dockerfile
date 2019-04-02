FROM node:10-alpine

WORKDIR /usr/fetch-backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8001

CMD ["npm", "start"]
