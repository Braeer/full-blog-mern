FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

# Используем lightweight образ для запуска serve
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3007
CMD ["serve", "-s", "build", "-l", "3007"]
