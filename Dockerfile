# using slimmer debian-based image to reduce image size
FROM node:24.22.1-bookworm-slim 

WORKDIR /app

# get specific pnpm version for the project
RUN npm install --global pnpm@12.15.0

# dependency manifest files
COPY server/package.json server/pnpm-lock.yaml server/pnpm-workspace.yaml ./

# install dependencies
RUN pnpm install --frozen-lockfile

# backend src code
COPY server/ ./

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
