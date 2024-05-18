FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Run migrations on first build
RUN npm run migration:run --

FROM node:18-alpine

WORKDIR /app

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ] 