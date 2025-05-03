# 1. Build stage
FROM node:20.18.2-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Run stage
FROM node:20.18.2-alpine

WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production
ENV PORT=4020

EXPOSE 4020

CMD ["npm", "start"]
