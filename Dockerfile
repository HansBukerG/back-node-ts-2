# FROM node:18-alpine
FROM node:18-bullseye-slim

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN apt-get update && apt-get install -y wait-for-it

# EXPOSE 8081

# CMD [ "node", "./dist/src/server.js" ]