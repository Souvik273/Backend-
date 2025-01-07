# User Authentication API

A simple API for user authentication built with Node.js, Express, and MongoDB.

## Features

- **Register**: Create a new user account
- **Login**: Authenticate with email and password
- **Logout**: End the user session
- **Send Verification OTP**: Send OTP to verify email
- **Verify Email**: Verify user email with OTP
- **Check Authentication**: Check if user is authenticated
- **Send Password Reset OTP**: Send OTP to reset password
- **Reset Password**: Reset user password

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **bcrypt**: Password hashing
- **jsonwebtoken**: Token-based authentication
- **dotenv**: Environment variable management
- **nodemailer**: Email sending

## Folder Structure

```
├── config
│   ├── db.js              # Database connection logic
│   └── nodemailer.js      # Nodemailer configuration
├── controller
│   ├── auth.controller.js # Handles authentication logic
│   └── user.controller.js # Handles user-related logic
├── middleware
│   └── user.auth.js       # Middleware for user authentication
├── models
│   └── user.models.js     # Defines the User schema and model
├── routes
│   ├── auth.route.js      # Defines routes for authentication
│   └── user.route.js      # Defines routes for user data
├── .gitignore             # Git ignore file
├── package.json           # Dependencies and scripts
├── README.md              # Project documentation
└── server.js              # Entry point for the application
```

## API Endpoints

### Register

- **URL**: `/api/auth/register`
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

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`

### Send Verification OTP

- **URL**: `/api/auth/send-verify-otp`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`

### Verify Email

- **URL**: `/api/auth/verify-email`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "otp": "123456"
  }
  ```

### Check Authentication

- **URL**: `/api/auth/is-auth`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`

### Send Password Reset OTP

- **URL**: `/api/auth/send-reset-otp`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

### Reset Password

- **URL**: `/api/auth/reset-password`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "otp": "123456",
    "newPassword": "newpassword123"
  }
  ```

### Get User Data

- **URL**: `/api/userDetails/user`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

## Database Connection

The database connection logic is defined in `db.js` and includes the following:

- Connecting to MongoDB using Mongoose
- Logging a message when the database is connected

## How to Run

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file with the necessary environment variables.

4. Start the server:
   ```sh
   npm start
   ```

5. Use Postman or any other API client to test the endpoints.
