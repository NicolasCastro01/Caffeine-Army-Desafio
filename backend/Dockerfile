FROM node:18-alpine

WORKDIR /usr/src/app

RUN chown -R node /usr/src/app

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

USER node

ADD package*.json ./

RUN npm ci 

COPY --chown=node . .

RUN npx prisma generate

RUN npm run build

CMD [ "node", "dist/src/main.js" ]
