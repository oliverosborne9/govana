FROM node

WORKDIR /app
COPY . .
RUN npm i

ENTRYPOINT [ "npm", "run", "build" ]
