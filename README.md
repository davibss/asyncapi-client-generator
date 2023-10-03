# Async API Client Generator
This project contains the ecossystem (backend and frontend applications) for generating `C++` and `Angular` projects from an [Async Api](https://www.asyncapi.com/) specification file. The generation requires specific tamplates to achieve that:
* [AsyncAPI C++ Template](https://github.com/davibss-tcc/asyncapi-cpp-template)
* [AsyncAPI Angular Template](https://github.com/davibss-tcc/asyncapi-angular-template)

## Backend
The backend is a NodeJS micro service providing routes to receive a specification file (YAML) and the target language/platform (C++ or Angular). Then it generates the code of a compilable project.

## Frontend
The frontend is an Angular micro service providing a web application to allow users to use the generator. It interacts with the backend to allow intuitive generation, visualization and download of the generated code. 

## Running
### Run the backend
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