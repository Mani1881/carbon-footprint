# =========================================================
# Stage 1: Build Environment
# =========================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency configs
COPY package*.json ./

# Install all dependencies (development + production)
RUN npm ci

# Copy the rest of the source code
COPY . .

# Compile the Vite production build
RUN npm run build

# =========================================================
# Stage 2: Production Environment
# =========================================================
FROM node:22-alpine AS runner

WORKDIR /app

# Set production context
ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies (express, lucide-react)
RUN npm ci --only=production

# Copy Express server configuration
COPY server.js ./

# Copy compiled static assets from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 8080 (standard for GCP Cloud Run)
EXPOSE 8080

# Launch the production Express server
CMD ["npm", "start"]
