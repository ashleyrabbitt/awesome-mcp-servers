FROM node:22-alpine
WORKDIR /app
COPY package.json server.mjs ./
COPY public ./public
COPY scripts/build.mjs ./scripts/build.mjs
RUN node scripts/build.mjs
ENV NODE_ENV=production
EXPOSE 8080
USER node
CMD ["node", "server.mjs"]
