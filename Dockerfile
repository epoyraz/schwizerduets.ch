# Use an official Nginx image as a parent image
FROM nginx:alpine

# Set the working directory in the container to the nginx HTML directory
WORKDIR /usr/share/nginx/html

# Copy the HTML, CSS and JS files from your local file system to the docker image
COPY index.html .
COPY impressum.html .
COPY schweiz.ico .
COPY style.css .
COPY script.js .

# Expose port 80 for the app
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
