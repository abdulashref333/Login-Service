# Login Service
A Node.js Login Service that supports logging by social media apps like Facebook and convenient logging (email & password)

## Technologies

- Node.js(>16)
- Express.js
- Typescript
- MongoDB 

## Requirements

1. [Node & NPM ⬇️](https://nodejs.org/en/) - (node version > 16), (npm v8)
3. [Docker ⬇️](https://docs.docker.com/desktop/install/windows-install/) (optional)

## Project Setup

### Run Using Docker

### Run Without Docker

### Docs
- Download the Postman collection from here [postman_collection](./docs/login-service.postman_collection.json)
- The production **Base API** [Link](https://login-service-app-cad5af84e360.herokuapp.com)
- The local **Base API** is: http://localhost:[your port number]
- Make sure you added /api/v1 at the end of the **Base API**

#### API ROUTES
1. Users Routes

|            Routes             | Method |          Description         |
| :--------------------------- | :----: | :--------------------------- |
|  /users/sign-up         |  POST  |         Register a new user        |
|      /users/me            |  GET   |       Get a user profile      |

2. Auth Routes

|            Routes             | Method |          Description         |
| :--------------------------- | :----: | :--------------------------- |
|  /auth/login         |  POST  |         Register a new user        |
|      /auth/google            |  GET   |       Login with google      |
|      /auth/facebook            |  GET   |       Login with facebook      |