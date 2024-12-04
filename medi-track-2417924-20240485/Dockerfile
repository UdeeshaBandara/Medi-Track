# Use the official Node.js image
FROM public.ecr.aws/docker/library/node:lts-slim as production

# Set the working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
