FROM node:20-alpine
WORKDIR /app

# устанавливаем только то, что нужно для сборки
COPY package.json ./
RUN npm install

# копируем исходники
COPY . .

# билд
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
