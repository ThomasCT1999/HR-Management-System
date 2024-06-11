# Use the official Node.js 20 Alpine image.
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
EXPOSE 6000
# Start the combined development server
CMD ["npm", "run", "dev"]
