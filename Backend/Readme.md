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


Here is the **Captain Routes API Documentation** in Markdown format based on your uploaded files:

---

# Captain Routes API Documentation

This documentation covers all API endpoints related to `captain` (driver) operations including registration, login, profile fetching, and logout.

---

## Base Path

```
/captains
```

---

## 1. Register Captain

### Endpoint

```
POST /captains/register
```

### Description

Registers a new captain by validating input data, hashing the password, storing details in the database, and returning a JWT token.

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Validations

* `fullname.firstname`: min 3 characters
* `email`: valid email format
* `password`: min 6 characters
* `vehicle.color`: min 3 characters
* `vehicle.plate`: min 3 characters
* `vehicle.capacity`: numeric
* `vehicle.vehicleType`: min 3 characters

### Success Response

**Status Code:** `201 Created`

```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

**Status Code:** `400 Bad Request` (Validation errors)

---

## 2. Login Captain

### Endpoint

```
POST /captains/login
```

### Description

Logs in a captain by validating credentials and returning a JWT token.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Validations

* `email`: valid email format
* `password`: min 6 characters

### Success Response

**Status Code:** `200 OK`

```json
{
  "token": "JWT_TOKEN_HERE",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

---

## 3. Get Captain Profile

### Endpoint

```
GET /captains/profile
```

### Description

Returns the profile of the currently authenticated captain.

### Authentication

* Required via `Authorization: Bearer <token>` header or `token` cookie.

### Success Response

**Status Code:** `200 OK`

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response

**Status Code:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

## 4. Logout Captain

### Endpoint

```
GET /captains/logout
```

### Description

Logs out the currently authenticated captain by clearing the cookie and blacklisting the token.

### Authentication

* Required via `Authorization: Bearer <token>` header or `token` cookie.

### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logout successfully"
}
```

---
