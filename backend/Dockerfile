FROM oven/bun:alpine

WORKDIR /app

# DEPS
COPY package.json ./
RUN bun install

# Build
COPY . .

EXPOSE 8080

CMD ["bun", "run", "dev"]
