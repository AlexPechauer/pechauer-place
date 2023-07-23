# syntax=docker/dockerfile:1
FROM node:18-alpine
COPY ./ /app/
WORKDIR /app
RUN npm install
CMD ["npm", "start"]