FROM node:22-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json .
COPY src /app/src

RUN npm install -g pnpm

RUN pnpm install && pnpm build

RUN ls -la /app

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
COPY --chown=hono:nodejs static /app/static

USER hono
EXPOSE 3000

ENV PROD=true

CMD ["node", "/app/dist/index.js"]