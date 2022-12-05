FROM node:18

# Create the app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY . ./
RUN npm install

WORKDIR /usr/src/app/packages/stb
RUN npm install
RUN npm run build


WORKDIR /usr/src/app/packages/srv
RUN npm install

# Expose the app port
EXPOSE 3113

WORKDIR /usr/src/app
# Run the app
RUN npm run srv