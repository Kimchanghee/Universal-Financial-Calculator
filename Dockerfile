# Multi-stage build for Universal Financial Calculator
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy root-level static files for ads.txt and robots.txt
COPY --from=builder /app/ads.txt /usr/share/nginx/html/ads.txt
COPY --from=builder /app/robots.txt /usr/share/nginx/html/robots.txt 2>/dev/null || true
# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
