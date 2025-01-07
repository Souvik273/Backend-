# User Authentication API

A simple API for user authentication built with Node.js, Express, and MongoDB.

## Features

- **Register**: Create a new user account
- **Login**: Authenticate with email and password
- **Logout**: End the user session

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **bcrypt**: Password hashing
- **jsonwebtoken**: Token-based authentication
- **dotenv**: Environment variable management

## Folder Structure

```
├── controllers
│   └── authController.js  # Handles authentication logic
├── models
│   └── userModel.js       # Defines the User schema and model
├── routes
│   └── authRoutes.js      # Defines routes for authentication
├── utils
│   └── db.js              # Database connection logic
├── .env                   # Environment variables
├── server.js              # Entry point for the application
└── package.json           # Dependencies and scripts
```

## Environment Variables

Create a `.env` file in the root directory and include the following variables:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```

## API Endpoints

### Register

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Logout

- **URL**: `/api/users/logout`
- **Method**: `POST`

## Database Connection

The database connection logic is defined in `db.js` and includes the following:

- Connecting to MongoDB using Mongoose
- Logging a message when the database is connected

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the necessary environment variables.

4. Start the server:
   ```bash
   npm start
   ```

5. Use Postman or any other API client to test the endpoints.

## Example Requests

### Register

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password"
}
```

### Login

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Logout

```http
POST /api/users/logout
```

