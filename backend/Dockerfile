FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json tsconfig.json
COPY src/ src/
COPY routes/ routes/
COPY database/ database/

CMD npm start