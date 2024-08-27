FROM node:16-alpine

WORKDIR /app/frontend/

COPY package*.json /app/frontend/
RUN npm install

ARG API_URL
ENV AXIOS_URL=$API_URL

COPY . /app/frontend/

CMD ["npm", "start"]