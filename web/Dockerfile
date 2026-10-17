FROM node:22-alpine
WORKDIR /app
COPY editorial ./editorial
COPY package.json server.mjs catalog-api.mjs submission-api.mjs business-api.mjs dynamic-catalog.mjs dynamic-discovery.mjs ./
COPY public ./public
COPY scripts/build.mjs scripts/build-llms.mjs ./scripts/
ARG SITE_URL
RUN node scripts/build.mjs && node scripts/build-llms.mjs dist https://aisuperpower.cc
ENV NODE_ENV=production
EXPOSE 8080
USER node
CMD ["node", "server.mjs"]


