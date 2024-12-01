# FROM node:23.1 AS development

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . . 

# RUN npm run build

# FROM node:23.1 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --omiy=dev

# COPY . .

# COPY --from=development /app/dist ./dist

# CMD ["node", "dist/main"]

# Use the official Node.js image
FROM node:23.1 as production

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
