FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        g++ \
        make \
        pkg-config \
        python3 \
        libcairo2-dev \
        libpango1.0-dev \
        libjpeg-dev \
        libgif-dev \
        librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --omit=dev

FROM node:22-bookworm-slim

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libcairo2 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libjpeg62-turbo \
        libgif7 \
        librsvg2-2 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build --chown=node:node /app/backend/node_modules ./backend/node_modules
COPY --chown=node:node backend ./backend
COPY --chown=node:node frontend/public ./frontend/public

RUN chown -R node:node /app/backend

USER node

EXPOSE 3000

CMD ["node", "backend/server.js"]
