ARG NODE_IMAGE_VERSION=24-alpine

FROM node:$NODE_IMAGE_VERSION as build

LABEL maintainer="Codacy <code@codacy.com>"

ENV NODE_PATH /usr/lib/node_modules

WORKDIR /workdir

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn run build

FROM node:$NODE_IMAGE_VERSION

LABEL maintainer="Codacy <code@codacy.com>"

ENV NODE_PATH /app/node_modules
ENV PATH /app/node_modules/.bin:$PATH

RUN adduser -u 2004 -D docker

COPY --from=build --chown=docker:docker /workdir/build/main /app/build/main
COPY --from=build --chown=docker:docker /workdir/package.json /app/package.json
COPY --from=build --chown=docker:docker /workdir/yarn.lock /app/yarn.lock
COPY --from=build --chown=docker:docker /workdir/docs /app/docs
COPY --from=build --chown=docker:docker /workdir/docs-tests /app/docs/tests

WORKDIR /app

RUN \
    yarn install --production --cache-folder /tmp/yarn-cache && \
    yarn link && \
    chmod +x /app/build/main/index.js && \
    rm -rf /tmp/yarn-cache /root/.yarn

WORKDIR /src

USER docker

ENTRYPOINT ["codacy-remark-lint"]
CMD []
