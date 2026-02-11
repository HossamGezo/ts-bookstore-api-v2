# Stage 1: Build Stage (Builder)
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .
RUN npm run build

# Stage 2: Production Stage (Final Image)
FROM node:22.14.0-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views
EXPOSE 5001

CMD ["node", "dist/index.js"]

# --- For Mac (Apple Silicon) – build image compatible with linux/amd64
# docker build --platform linux/amd64 -t bookstore-api .

# --- Tag & Push image Docker Hub
# docker tag bookstore-api hossamgezo/bookstore-api:v2
# docker push hossamgezo/bookstore-api:v2

# --- Image URL (for Render deployment)
# Render : docker.io/hossamgezo/bookstore-api:v2