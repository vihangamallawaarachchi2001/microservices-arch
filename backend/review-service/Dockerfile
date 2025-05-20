FROM node

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./

RUN pnpm install

COPY . .
COPY .env .env

EXPOSE 3004

CMD [ "pnpm", "run", "dev" ]