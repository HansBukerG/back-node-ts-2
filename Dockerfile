FROM node:18-alpine

WORKDIR /app

# COPY ["package.json", "package-lock.json*","tsconfig.json","src",  "./"]
COPY . .

RUN npm install
RUN npm run build


EXPOSE 8080

CMD [ "node", "./dist/src/server.js" ]