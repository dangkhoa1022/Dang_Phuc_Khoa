# CRUD Project

## General description

- Create APIs to CRUD `user` and `contact`
- User must log in before interacting with `contact` API

## How to run

- Run `npm i` to install dependencies
- Create an `.env` file at `root` folder to store environment variables with content:
  ```
  MONGO_URL=mongodb+srv://dangkhoa:22102003@cluster0.o0blga0.mongodb.net/
  PORT=8080
  ACCESS_TOKEN_SECRET=DANGPHUCKHOA2003
  COOKIE_TOKEN_EXPIRE_IN=1d
  TOKEN_EXPIRE_IN=30m
  ```
- Run `npm start` to start server at `localhost:8080` and test API

## Project description

### Technologies:

- `NodeJS` ver 22.0.0, `ExpressJS`
- `MongoDB`

### Structure

- `./routes`: define route for API
- `./models`: define model schemas for database
- `./controllers`: handle interactions to database
- `./middlewares`: contains middlewares
- `./db`: contain database connection

### API description

#### User APIs

- **Register**

  - **URL**: `/api/user/register`
  - **Aim**: Register new user
  - **Method**: POST
  - **Body**:

  ```
  {
    "password": string,
    "confirmPassword": string,
    "username": string,
    "email": email
  }
  ```

  - **Response**:

  ```
  {
    "id": string,
    "email": string
  }
  ```

- **Login**

  - **URL**: `/api/user/login`
  - **Aim**: Login user
  - **Method**: POST
  - **Body**:

  ```
  {
    "password": string,
    "email": email
  }
  ```

  - **Response**:

  ```
  {
    "accessToken": string
  }
  ```

- **Get current user**
  - **URL**: `/api/user/current`
  - **Aim**: Get current user
  - **Method**: GET
  - **Response**:
  ```
  {
    "id": string,
    "username": string,
    "email": string
  }
  ```
  - **Authorization**: Bearer Token

#### Contact APIS

- **Get contacts**

  - **URL**: `/api/contacts`
  - **Aim**: Get contacts for current user
  - **Method**: POST
  - **Body**:

  ```
  {
    "page": number,
    "limit": number,
    "email": string,
    "phone": string,
    "sortByCreatedAt": enum,
    "sortByUpdatedAt": enum,
  }
  ```

  - **Response**: List of contants
  - **Authorization**: Bearer Token

- **Create contact**

  - **URL**: `/api/contacts/create`
  - **Aim**: Create a new contact for current user
  - **Method**: POST
  - **Body**:

  ```
  {
    "email": string,
    "phone": string,
    "name": string
  }
  ```

  - **Response**: New created contact
  - **Authorization**: Bearer Token

- **Get detail contact**

  - **URL**: `/api/contacts/:id`
  - **Aim**: Get a detail contact of current user
  - **Method**: GET
  - **Response**:

  ```
  {
    "_id": string,
    "user_id": string,
    "name": string,
    "email": string,
    "phone": string,
    "deletedDate": Date || null,
    "createdAt": Date,
    "updatedAt": Date || null,
  }
  ```

  - **Authorization**: Bearer Token

- **Update contact**

  - **URL**: `/api/contacts/:id`
  - **Aim**: Update a contact of current user
  - **Method**: PUT
  - **Body**:

  ```
  {
    "name": string,
    "email": string,
    "phone": string,
  }
  ```

  - **Response**: Updated contact
  - **Authorization**: Bearer Token

- **Delete contact**
  - **URL**: `/api/contacts/delete/:id`
  - **Aim**: Soft delete a contact of current user
  - **Method**: PUT
  - **Response**: Deleted contact
  - **Authorization**: Bearer Token
