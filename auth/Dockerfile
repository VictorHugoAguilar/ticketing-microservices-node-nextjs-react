FROM node:alpine

WORKDIR /app
COPY package.json .
# --only=prod so you don't create dev dependencies
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]