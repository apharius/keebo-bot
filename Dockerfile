FROM node:carbon

WORKDIR /usr/src/keebo

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm","start"]
