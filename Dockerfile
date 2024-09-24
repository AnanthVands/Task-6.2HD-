FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]