FROM node:carbon

WORKDIR /usr/src/keebo

COPY package*.json ./

RUN npm install
RUN echo "Europe/Stockholm" > /etc/timezone
RUN sudo dpkg-reconfigure --frontend noninteractive tzdata
COPY . .

EXPOSE 8080
CMD ["npm","start"]
