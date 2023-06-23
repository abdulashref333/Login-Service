FROM node:16

WORKDIR /login-service

COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
CMD npm start