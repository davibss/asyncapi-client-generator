# Async API Client Generator
Project to provide a visual interface to use the `C++` and `Angular` [Async Api](https://www.asyncapi.com/) templates.
Templates (C++/Angular):
* [AsyncAPI C++ Template](https://github.com/davibss-tcc/asyncapi-cpp-template)
* [AsyncAPI Angular Template](https://github.com/davibss-tcc/asyncapi-angular-template)

The architecture of this project consists in a front-end that gets the AsyncAPI specification from the user and send this specification to the back-end. The back-end calls the [AsyncAPI Generator](https://github.com/asyncapi/generator) passing the speficiation and the choosed template (C++ or Angular). After that, the code generated is saved temporarily in disk so that the back-end can retrieve the data and send to front-end.

The back-end in this project is required because the AsyncAPI Generator works with file writing to generate code, and that can't be executed on client side.

## How to run with Docker?
### Run with Docker Compose
Ensure that you have Docker Engine and Docker Compose installed on your machine.
```sh
docker compose up -d
```
Now that you started both applications from the `docker-compose.yaml` file go to http://localhost:80 to access this application.
If your ports `80` and `3333` are busy you can change the `docker-compose.yaml` file and map to another port like this:
```yaml
services:
  angular-frontend-nginx:
    build: client-generator-angular
    ports:
      - "81:80"
  nodejs-backend:
    build: client-generator-backend
    ports:
      - "3334:3333"
```

## How to run individually?
### Run back-end
```sh
cd client-generator-backend
npm install
npm run start
```
### Run front-end
```sh
cd client-generator-angular
npm install
npm run start
```
Now that you started both applications go to http://localhost:4200 to access this application.