# CRUD API

## Features

- **Create** a new user record
- **Read** all user records or a specific user by ID
- **Update** an existing user record
- **Delete** a user record by ID

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v22.12.0 or later)
- **npm**
- **TypeScript**

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/.../crud-api.git
   cd crud-api
   ```

2. **Install the dependencies:**:

   ```bash
   npm install
   ```

## Running the Application

There are two ways to run the application: in development mode or in production mode.

### Development Mode

To run the application in development mode, which includes hot-reloading with `nodemon`, execute the following command:

```bash
npm run start:dev
```

### Production Mode

To build and run the application in production mode, execute:

```bash
npm run start:prod
```

## Linting and Formatting

To lint your code, you can run:

```bash
npm run lint
```

To format code with Prettier:

```bash
npm run format
```

## API Endpoints

The API exposes the following endpoints:

### 1. Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Response**: Returns a list of all users.

### 2. Get User by ID

- **URL**: `/api/users/{userId}`
- **Method**: `GET`
- **Response**: Returns the user with the specified ID.

### 3. Create a New User

- **URL**: `/api/users`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the created user.

### 4. Update User by ID

- **URL**: `/api/users/{userId}`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "username": "string",
    "age": "number",
    "hobbies": ["string"]
  }
  ```
- **Response**: Returns the updated user.

### 5. Delete User by ID

- **URL**: `/api/users/{userId}`
- **Method**: `DELETE`
- **Response**: No content (204) if the deletion was successful.