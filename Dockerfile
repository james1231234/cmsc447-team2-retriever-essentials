# using slimmer debian-based image to reduce image size
FROM node:24-bookworm-slim 

WORKDIR /app

# using corepack to enable pnpm
RUN corepack enable
COPY server/package.json server/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# backend src code
COPY server/ ./

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
