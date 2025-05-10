# Backend API Documentation

## `/users/register` Endpoint 

## Description
This endpoint allows a new user to register. The user's details are validated and then stored in the database after hashing the provided password. On successful registration, the endpoint returns a JSON Web Token (JWT) and user information.

## HTTP Method
`POST`

## URL
`/users/register`

## Request Body
The request expects a JSON payload with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (optional, min 3 characters if provided)"
  },
  "email": "string (valid email format, min 5 characters)",
  "password": "string (min 6 characters)"
}
```

### Required Fields
- `fullname.firstname`: User's first name (minimum 3 characters).
- `email`: A valid email address.
- `password`: A password string (minimum 6 characters).

### Optional Fields
- `fullname.lastname`: User's last name (if provided, minimum 3 characters).

## Success Response
- **Status Code:** `201 Created`
- **Response Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // ...other user fields if available
  }
}
```

## Error Response
### Validation Errors
- **Status Code:** `400 Bad Request`
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message detailing the validation issue",
      "param": "name of the parameter that failed validation",
      "location": "body"
    }
    // ...more errors if applicable
  ]
}
```

## Notes
- Passwords are hashed before being stored in the database.
- The JWT token is generated using the user's `_id` and a secret specified in the environment variables.
- Ensure that the required environment variables (`DB_CONNECT` and `JWT_SECRET`) are correctly set in your environment configuration.

---

## `/users/login` Endpoint

## Description
This endpoint allows an existing user to log in by validating the email and password. If the credentials are valid, a JSON Web Token (JWT) is returned along with the user information.

## HTTP Method
`POST`

## URL
`/users/login`

## Request Body
The request expects a JSON payload with the following structure:

```json
{
  "email": "string (valid email format, min 5 characters)",
  "password": "string (min 6 characters)"
}
```

### Required Fields
- `email`: A valid email address.
- `password`: A password string (minimum 6 characters).

## Success Response
- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // ...other user fields if available
  }
}
```

## Error Response
### Validation Errors
- **Status Code:** `400 Bad Request`
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message detailing the validation issue",
      "param": "name of the parameter that failed validation",
      "location": "body"
    }
    // ...more errors if applicable
  ]
}
```

### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Response Body:**

```json
{
  "message": "Invalid email or password"
}
```

## Notes
- The password provided in the request is compared with the hashed password stored in the database.
- The JWT token is generated using the user's `_id` and a secret specified in the environment variables.