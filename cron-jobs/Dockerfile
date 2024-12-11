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

# Start the Nest.js application
CMD ["node", "dist/appointments-per-doctor.job.js"]
