# Base Image
FROM node:22.14.0-alpine

# Working Dir
WORKDIR /app

# Copy Packages
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Source Code
COPY . .

# Build Tailwind CSS
RUN npm run tailwind:build

# Build Typescript
RUN npm run build

# Expose Server Port
EXPOSE 5001

# Start App
CMD ["npm", "start"]

