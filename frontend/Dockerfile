FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY src/ src/
COPY public/ public/
COPY index.html ./
COPY tsconfig.app.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY codegen.ts ./

CMD npm run dev