FROM node:22.16.0-alpine3.21 as dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]