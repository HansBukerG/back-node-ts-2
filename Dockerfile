FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


EXPOSE 8081

CMD [ "node", "./dist/src/server.js" ]