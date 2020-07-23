FROM node:12.18.2-alpine3.12

RUN apk --no-cache --update-cache add make gcc python3 python3-dev g++ && \
      apk add vips-dev fftw-dev build-base --update-cache \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/community/ \
    --repository https://alpine.global.ssl.fastly.net/alpine/edge/main

WORKDIR /home/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY ./ ./
RUN yarn run build

ENV PORT 8080

CMD ["node", "/home/app/dist/index.js"]
