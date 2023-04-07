# Use an official Node.js runtime as a parent image
FROM node:14-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Set the environment variables
ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Build the app
RUN npm run build

# Use a Nginx web server as a parent image
FROM nginx:stable-alpine

# Remove the default Nginx configuration file
RUN rm -rf /etc/nginx/conf.d/*

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app to the container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
