# Build frontend
FROM oven/bun:alpine AS frontend-builder

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install

COPY . .
RUN bun run build

# Production with Caddy
FROM caddy:alpine

COPY Caddyfile.prod /etc/caddy/Caddyfile
COPY --from=frontend-builder /app/dist /usr/share/caddy

EXPOSE 80 443
