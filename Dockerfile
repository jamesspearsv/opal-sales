FROM node:24-alpine AS base

# Configure and enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_INJECT_WORKSPACE_PACKAGES=true
RUN npm i -g corepack@latest
RUN corepack prepare pnpm --activate

FROM base AS deps

RUN apk add --no-cache gcompat
WORKDIR /app

# Copy source code into the build step &
# install all dependencies
COPY . .
RUN pnpm install

# Build all api, web, and shared packages
FROM base AS builder

WORKDIR /app

COPY --from=deps /app /app
RUN pnpm run -r build

# Run app
FROM base AS runner

WORKDIR /app

# Copy pre-built api, web packages & relevant files
COPY --from=builder /app/packages/api/dist /app
COPY --from=builder /app/packages/api/package.json /app
COPY --from=builder /app/pnpm-workspace.yaml /app

# Copy pre-built shared package & relevant files
COPY --from=builder /app/packages/shared/dist /app/packages/shared/dist
COPY --from=builder /app/packages/shared/package.json /app/packages/shared/package.json

# Copy and prune API dependencies for production
COPY --from=builder /app/packages/api/node_modules /app/node_modules
RUN pnpm prune --prod

EXPOSE 3000
ENV PROD=true

CMD ["node", "index.js"]