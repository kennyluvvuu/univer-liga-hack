# Build stage
FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN bun run build

# Production stage - serve static files with Caddy
FROM caddy:alpine

COPY --from=builder /app/dist /usr/share/caddy
COPY Caddyfile.prod /etc/caddy/Caddyfile

EXPOSE 80
