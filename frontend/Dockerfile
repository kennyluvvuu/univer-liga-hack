# Build frontend
FROM oven/bun:alpine AS frontend-builder

WORKDIR /app

COPY frontend/package.json frontend/bun.lock* ./
RUN bun install

COPY frontend/ ./
RUN bun run build

# Production with Caddy
FROM caddy:alpine

COPY frontend/Caddyfile.prod /etc/caddy/Caddyfile
COPY --from=frontend-builder /app/dist /usr/share/caddy

EXPOSE 80 443
