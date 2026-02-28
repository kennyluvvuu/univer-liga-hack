FROM oven/bun:alpine

WORKDIR /app

# DEPS
COPY package.json ./
RUN bun install

# Build
COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--host", "0.0.0.0"]
