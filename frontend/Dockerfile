# Build frontend
FROM oven/bun:latest AS frontend-builder

WORKDIR /app

ENV VITE_API_URL='https://hello-ikity.duckdns.org/api'
COPY frontend/package.json frontend/bun.lock* ./
RUN bun install

COPY frontend/ ./
RUN bunx vite build

# Production with Caddy
FROM caddy:alpine

COPY frontend/Caddyfile.prod /etc/caddy/Caddyfile
COPY --from=frontend-builder /app/dist /usr/share/caddy

EXPOSE 80 443
