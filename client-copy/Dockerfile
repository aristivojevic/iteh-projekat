FROM node as builder
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build


FROM nginx:alpine
USER root
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build/ .
