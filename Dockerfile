FROM node:17-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY --chown=node:node . /home/node

RUN npm ci
CMD ["node", "src/pomodoro.js"]
