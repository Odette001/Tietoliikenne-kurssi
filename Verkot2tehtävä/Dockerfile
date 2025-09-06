# Using official Node.js image as base
FROM node:18

# Setting working directory
WORKDIR /app


# Copying package.json and package-lock.json
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying the rest of the app
COPY . .

# Exposing the app port
EXPOSE 3000

# Startting the app
CMD ["npm", "run", "dev"]
