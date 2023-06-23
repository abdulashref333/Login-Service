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
first of all, you need an env file.
```
# dev | test | prod
NODE_ENV=dev
PORT=3000
APP_NAME=Login-Service

MONGODB_URL=

JWT_SECRET=jsonwebtokensecret22
JWT_EXPIRATION=1d

EXTRA_PASSWORD=22endof@year

# Google Secrets
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Facebook Secrets
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```
Then you have to options run the project using docker as follows on the next section or follow the instruction of the second section.
### Run Using Docker
1. run this command
```
 docker-compose up -d
```
2. you can access the API through this base api: http://localhost:3000
### Run Without Docker
1. run to install dependencies
``` 
npm ci 
```
2. then run
```
npm run start:dev or npm start
```

### Run Tests
```
npm run test
```

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