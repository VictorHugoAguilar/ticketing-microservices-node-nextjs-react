FROM node:alpine

WORKDIR /app
COPY package.json .
# --only=prod para que no cree las dependencias de dev
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]