FROM node:12.18-alpine as Angular-Patrick
ENV NODE_ENV=production
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build

FROM nginx: alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/