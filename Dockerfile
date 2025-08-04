# Development-focused Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent && npm cache clean --force

# Development stage
FROM base AS development
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000 3001

# Start development server
CMD ["npm", "run", "dev"]

# Build stage (for preview)
FROM base AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Preview stage with nginx
FROM nginx:alpine AS preview
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4173
CMD ["nginx", "-g", "daemon off;"]