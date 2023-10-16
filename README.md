# Async API Client Generator
This project contains the ecossystem (backend and frontend applications) for generating `C++` and `Angular` projects from an [Async Api](https://www.asyncapi.com/) specification file. The generation requires specific tamplates to achieve that:
* [AsyncAPI C++ Template](https://github.com/davibss-tcc/asyncapi-cpp-template)
* [AsyncAPI Angular Template](https://github.com/davibss-tcc/asyncapi-angular-template)

## Backend
The backend is a NodeJS micro service providing routes to receive a specification file (YAML) and the target language/platform (C++ or Angular). Then it generates the code of a compilable project.

## Frontend
The frontend is an Angular micro service providing a web application to allow users to use the generator. It interacts with the backend to allow intuitive generation, visualization and download of the generated code. 

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
### Run the frontend
```sh
cd client-generator-angular
npm install
npm run start
```
Now that you started both applications go to http://localhost:4200 to access this application.