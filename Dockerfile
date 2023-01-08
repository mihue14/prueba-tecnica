FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001
ENV DB_USER="postgres"
ENV DB_NAME="pruebaTecnica"
ENV DB_PASSWORD=
ENV DB_HOST="host.docker.internal"

CMD ["npm", "start"]