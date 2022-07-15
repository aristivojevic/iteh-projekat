FROM node as builder
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn 
COPY . .

FROM node:alpine 
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ ./

EXPOSE 8080
CMD [ "npm", "start" ] 