# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY Server/package.json Server/package-lock.json ./

# Copy only necessary server files
COPY Server/server.js ./Server/

# Install dependencies
RUN npm install --production

# Expose the port the server runs on
EXPOSE 6000

# Start the server
CMD ["node", "./Server/server.js"]
