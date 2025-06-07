FROM node:18.12.1-alpine as base

RUN apk add --update --no-cache make

RUN mkdir -p /opt/app/
COPY *.json /opt/app/
WORKDIR /opt/app/

RUN npm ci
COPY src /opt/app/src/
RUN npm run build

ENV NODE_OPTIONS="--enable-source-maps"
ENV NODE_ENV=production
ENV SERVICE_PORT=8080

EXPOSE ${SERVICE_PORT}

FROM node:18.12.1-alpine as production
WORKDIR /opt/app/

RUN addgroup -g 1001 -S nodejs \
 && adduser -S nestjs -u 1001

COPY --from=base --chown=nodejs:nodejs /opt/app/*.json ./
COPY --from=base --chown=nodejs:nodejs /opt/app/node_modules ./node_modules

RUN rm -rf tsconfig.build.json \
 && npm prune --omit dev \
 && chown -R nestjs:nodejs /opt/app

USER nestjs

ENTRYPOINT ["node", "/opt/app/build/src/main.js"]
