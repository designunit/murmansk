## BASE
FROM node:16-alpine as base

WORKDIR /app


## BUILD
FROM base as build

# Add package file
COPY package*.json ./

# Install deps
RUN npm ci

# Copy source
COPY . .

# Build dist
RUN npx prisma generate

RUN npm run build


## APP
FROM base as app

LABEL org.opencontainers.image.source https://github.com/designunit/murmansk

COPY package*.json ./
COPY prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN npx prisma migrate deploy

ENV JWT_SECRET=
ENV ADMIN_SECRET=
ENV PORT=80
EXPOSE 80

CMD npm run start
