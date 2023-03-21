FROM node:18-alpine

WORKDIR /usr/src/app

RUN chown -R node /usr/src/app

USER node

ADD package*.json ./

RUN npm ci

COPY --chown=node . .

CMD [ "npm", "start" ]
