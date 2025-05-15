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

---

## `/users/profile` Endpoint

## Description
This endpoint retrieves the profile information of the currently authenticated user.

## HTTP Method
`GET`

## URL
`/users/profile`

## Authentication
Requires a valid JWT token in either:
- Cookie named 'token'
- Authorization header as Bearer token

## Success Response
- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "_id": "string",
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "socketId": "string (if available)"
}
```

## Error Response
### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Response Body:**

```json
{
  "message": "Unauthorized"
}
```

---

## `/users/logout` Endpoint

## Description
This endpoint logs out the current user by clearing their authentication token and blacklisting it to prevent future use.

## HTTP Method
`GET`

## URL
`/users/logout`

## Authentication
Requires a valid JWT token in either:
- Cookie named 'token'
- Authorization header as Bearer token

## Success Response
- **Status Code:** `200 OK`
- **Response Body:**

```json
{
  "message": "Logged out successfully"
}
```

## Error Response
### Authentication Errors
- **Status Code:** `401 Unauthorized`
- **Response Body:**

```json
{
  "message": "Unauthorized"
}
```

## Notes
- The endpoint clears the authentication cookie if present
- The token is added to a blacklist to prevent reuse
- Any subsequent requests with the same token will be rejected

---

## `/captains/register` Endpoint

## Description
This endpoint allows a new captain (driver) to register with their vehicle details. The captain's information is validated and stored in the database after hashing the password. On successful registration, the endpoint returns a JWT token and captain information.

## HTTP Method
`POST`

## URL
`/captains/register`

## Request Body
The request expects a JSON payload with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (min 3 characters)"
  },
  "email": "string (valid email format)",
  "password": "string (min 6 characters)",
  "vehicle": {
    "color": "string (min 3 characters)",
    "plate": "string (min 3 characters)",
    "capacity": "number (min 1)",
    "vehicleType": "string (enum: car, motorcycle, auto)"
  }
}
```

### Required Fields
- `fullname.firstname`: Captain's first name (minimum 3 characters)
- `fullname.lastname`: Captain's last name (minimum 3 characters)
- `email`: A valid email address
- `password`: Password string (minimum 6 characters)
- `vehicle.color`: Vehicle color (minimum 3 characters)
- `vehicle.plate`: Vehicle plate number (minimum 3 characters)
- `vehicle.capacity`: Vehicle passenger capacity (minimum 1)
- `vehicle.vehicleType`: Type of vehicle (must be one of: car, motorcycle, auto)

## Success Response
- **Status Code:** `201 Created`
- **Response Body:**

```json
{
  "success": true,
  "message": "Captain registered successfully",
  "captain": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  },
  "token": "string (JWT token)"
}
```

## Error Response
### Validation Errors
- **Status Code:** `422 Unprocessable Entity`
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message detailing the validation issue",
      "param": "name of the parameter that failed validation",
      "location": "body"
    }
  ]
}
```

### Duplicate Email Error
- **Status Code:** `400 Bad Request`
- **Response Body:**

```json
{
  "success": false,
  "message": "Captain already exists"
}
```

## Notes
- All passwords are hashed before being stored in the database
- The JWT token is generated using the captain's `_id` and expires in 24 hours
- Vehicle type must be one of the predefined types: car, motorcycle, or auto
- The captain's status is set to 'inactive' by default