FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent && npm cache clean --force

FROM base AS development
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --silent

COPY . .

EXPOSE 3000 3001

CMD ["npm", "run", "dev"]

FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
RUN npm run build

FROM nginx:alpine AS preview
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4173
CMD ["nginx", "-g", "daemon off;"]