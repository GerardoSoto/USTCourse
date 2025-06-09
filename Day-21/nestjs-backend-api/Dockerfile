# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image

FROM node:20-alpine as builder
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install 
COPY . .
# Build the application
RUN npm run build

# Build the image as production
# So we can minimize the size
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# ENV PORT=4000
# ENV NODE_ENV = Production
RUN npm install --production
COPY --from=builder /app/dist ./dist
EXPOSE 4000

CMD ["node", "dist/main.js"]

# CMD ["npm", "run", "start"]



# FROM node:14-alpine as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# FROM node:14-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --production
# COPY --from=builder /app/dist ./dist
# ENV PORT=4000
# EXPOSE 4000
# CMD ["node", "dist/main.js"]