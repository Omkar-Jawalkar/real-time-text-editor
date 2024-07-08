FROM node:20

WORKDIR /app/

RUN apt-get update -y
RUN apt-get install -y iputils-ping

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev" , "--", "--host", "0.0.0.0"]

