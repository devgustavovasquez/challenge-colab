# This Dockerfile is divided into two stages:
#   1. Build Stage: Creates an image with to build the application, with all dependencies
#   2. Deploy Stage: Creates a production image with compiled code and only production dependencies
#
# Usage:
#   cp .env.example .env (and fill in the values)
#   docker build -t <image-name> .
#   docker run --env-file .env -dp <host-port>:<container-port> <image-name>

# PRE-STAGE: Base 
FROM node:18.15-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# STAGE 1: Build
FROM base AS builder

# Set the user to node
USER node

# Create app directory with user node
RUN mkdir -p /home/node/app

# Set working directory
WORKDIR /home/node/app

# Copy both package.json AND lock file if it exists
COPY --chown=node package.json ./
COPY --chown=node pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Bundle app source code
COPY --chown=node . .

# Build app
RUN pnpm build


# STAGE 2: Deploy
FROM base AS deploy

# Set to a non-root built-in user `node`
USER node

# Set working directory
WORKDIR /home/node/app

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=node /home/node/app/.next ./.next
COPY --from=builder --chown=node /home/node/app/public ./public
COPY --from=builder --chown=node /home/node/app/next.config.js ./
COPY --from=builder --chown=node /home/node/app/package.json ./
COPY --from=builder --chown=node /home/node/app/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Define the command to run the application
CMD [ "pnpm", "start"]

# Usage:
#   cp .env.example .env (and fill in the values)
#   docker build -t <image-name> .
#   docker run --env-file .env -dp <host-port>:<container-port> <image-name>
