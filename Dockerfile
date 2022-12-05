FROM node:18

# Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm run build -w ./packages/stb

# Copy app source code
COPY . .

# Expose the app port
EXPOSE 3113

# Run the app
RUN npm run srv