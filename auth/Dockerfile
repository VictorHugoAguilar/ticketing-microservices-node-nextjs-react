FROM node:alpine

WORKDIR /app
COPY package.json .
# --only=prod so you don't create dev dependencies
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]