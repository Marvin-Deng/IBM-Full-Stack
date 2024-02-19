FROM node:18-alpine
COPY package.json package-lock.json ./
RUN npm install
COPY app.js backendApi.js ./
COPY public ./public
CMD ["node", "app.js"]
