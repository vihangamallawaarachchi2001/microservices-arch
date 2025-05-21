FROM node

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm && pnpm install

COPY . .
COPY .env .env

EXPOSE 3001

CMD [ "pnpm", "run", "dev" ]