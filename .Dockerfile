FROM node:lts-alpine AS base

FROM base AS builder

RUN apk add --no-cache gcompat

# PNPM PROVIDED CONFIG
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest
RUN corepack prepare pnpm@9.1.0 --activate

WORKDIR /app

# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json /app
# COPY packages/shared/package.json /app/packages/shared/package.json
# COPY packages/api/package.json /app/packages/api/package.json
# COPY packages/web/package.json /app/packages/web/package.json

# COPY packages /app/packages

COPY . .

RUN pnpm install
RUN pnpm --filter shared build
RUN pnpm --filter api build
RUN pnpm --filter web build

# FROM base AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 hono

# COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
# COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
# COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
# COPY --chown=hono:nodejs static /app/static

# USER hono
EXPOSE 3000

# ENV PROD=true

# CMD ["node", "/app/dist/index.js"]
# CMD ["tree"]
CMD ['node', '/app/packages/api/dist/src/index.js']