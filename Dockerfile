# Use an official Node.js LTS image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies using yarn
RUN corepack enable
RUN yarn install --frozen-lockfile

# Copy the entire application to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 8080

# Set the command to run the application
CMD ["yarn", "start"]

