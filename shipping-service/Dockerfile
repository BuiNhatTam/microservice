FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3006

CMD ["node", "app.js"]
