FROM node:10-slim AS dependencies
WORKDIR /app
# https://www.docker.com/blog/keep-nodejs-rockin-in-docker/
ENV NODE_ENV development
ADD package.json yarn.lock ./
ADD packages/app/package.json packages/app/
ADD packages/babel-preset/package.json packages/babel-preset/
ADD packages/jest-preset/package.json packages/jest-preset/
RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
    yarn --no-cache --frozen-lockfile --production; \
  else \
    yarn --no-cache --frozen-lockfile; \
  fi;
FROM dependencies as dev
ADD babel.config.json ./
ADD packages packages
ENV PORT 8080
EXPOSE $PORT
WORKDIR /app/packages/app
CMD yarn start
