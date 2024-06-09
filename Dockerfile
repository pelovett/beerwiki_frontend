# Use an official Node.js LTS image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the entire application to the working directory
COPY . .

# Install dependencies using yarn
RUN corepack enable
RUN yarn install

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 8080

# Set the command to run the application
CMD ["yarn", "start"]

