FROM node:0.10.32

# Create src folder
RUN mkdir /src

WORKDIR /src
ADD . /src
RUN npm install

# Export listening port
EXPOSE 8080

CMD ["node","app.js", "--prod"]