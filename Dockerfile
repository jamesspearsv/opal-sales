FROM node:lts-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PNPM_INJECT_WORKSPACE_PACKAGES=true
RUN npm i -g corepack@latest
RUN corepack prepare pnpm --activate

FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY . .

RUN pnpm install

# build is not showing up in the container... why?
RUN pnpm --filter shared build 

CMD ["tree", "/app"]