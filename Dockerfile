FROM node:lts-alpine as install-target
ENV PATH $PATH:/app/node_modules/.bin
ARG ACCESS_KEY_ID=$ACCESS_KEY_ID
ARG SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
ARG BUCKET=$BUCKET
ENV ACCESS_KEY_ID=$ACCESS_KEY_ID
ENV SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
ENV BUCKET=$BUCKET
WORKDIR /app
COPY package.json package-lock.json index.js ./
RUN npm install
RUN npm prune --production
CMD ["npm", "run", "start"]
