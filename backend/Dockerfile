FROM oven/bun:alpine

WORKDIR /app

COPY package.json ./
RUN bun install --production

COPY . .

EXPOSE 8080

CMD ["bun", "run", "start"]
