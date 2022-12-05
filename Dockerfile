FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY . ./
RUN npm install

WORKDIR /usr/src/app/packages/stb
RUN npm install
RUN npm run build

WORKDIR /usr/src/app/packages/srv
RUN npm install

WORKDIR /usr/src/app
EXPOSE 3113
CMD [ "npm", "start" ]