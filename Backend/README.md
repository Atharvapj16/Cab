# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input data, hashes the password, creates a user, and returns a JWT token along with the user information.

## Request Body

The following fields are required in the request body (JSON format):

```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, required)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "JWT_TOKEN_STRING",
    "user": {
      "_id": "USER_ID",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "HASHED_PASSWORD",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
      // ...other validation errors
    ]
  }
  ```

### Missing Fields/Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

## Notes

- Passwords are securely hashed before storing.
- A JWT token is generated and returned for authentication.
- All fields are required

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user using email and password. Returns a JWT token and user information if credentials are valid.

## Request Body

```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "JWT_TOKEN_STRING",
    "user": {
      "_id": "USER_ID",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "HASHED_PASSWORD",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other validation errors
    ]
  }
  ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information. Requires a valid JWT token (sent via cookie or Authorization header).

## Request Headers

- `Cookie: token=JWT_TOKEN_STRING`
- or
- `Authorization: Bearer JWT_TOKEN_STRING`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "HASHED_PASSWORD",
    "socketId": null
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Access denied. No token provided."
  }
  ```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

## Request Headers

- `Cookie: token=JWT_TOKEN_STRING`
- or
- `Authorization: Bearer JWT_TOKEN_STRING`

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Access denied. No token provided."
  }
  ```






---

## Captain Endpoints

### Register Captain

**Endpoint:**  
`POST /captain/register`

**Description:**  
Registers a new captain. Validates input, hashes password, creates captain, returns JWT and captain info.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)",
  "vehicle": {
    "color": "string (min 3 chars, required)",
    "plate": "string (min 3 chars, required)",
    "capacity": "integer (min 1, required)",
    "vehicleType": "string (car|motorcycle|auto, required)",
    "vehicleName": "string (min 3 chars, required)"
  }
}
```



**Responses:**

- **201 Created**
  ```json
  {
    "token": "JWT_TOKEN_STRING",
    "captain": {
      "_id": "CAPTAIN_ID",
      "fullname": { "firstname": "John", "lastname": "Smith" },
      "email": "john.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car",
        "vehicleName": "Honda"
      },
      "status": "inactive",
      "socketId": null,
      "location": { "ltd": null, "lng": null }
    }
  }

 ```
- **400 Bad Request** (Validation)
  ```json
  {
    "errors": [
      { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
      // ...other validation errors
    ]
  }
  ```
- **400 Bad Request** (Already exists)
  ```json
  { "message": "Captain already exist" }
  ```

---

### Login Captain

**Endpoint:**  
`POST /captain/login`

**Description:**  
Authenticates captain, returns JWT and captain info.




**Request Body:**
```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "token": "JWT_TOKEN_STRING",
    "captain": {
      "_id": "CAPTAIN_ID",
      "fullname": { "firstname": "John", "lastname": "Smith" },
      "email": "john.smith@example.com",
      "vehicle": { ... },
      "status": "inactive",
      "socketId": null,
      "location": { "ltd": null, "lng": null }
    }
  }
  ```


- **400 Bad Request** (Validation)
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", "param": "email", "location": "body" }
      // ...other validation errors
    ]
  }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Invalid email or password" }
  ```

---

### Get Captain Profile

**Endpoint:**  
`GET /captain/profile`

**Description:**  
Returns authenticated captain's profile. Requires JWT.




**Responses:**

- **200 OK**
  ```json
  {
    "captain": {
      "_id": "CAPTAIN_ID",
      "fullname": { "firstname": "John", "lastname": "Smith" },
      "email": "john.smith@example.com",
      "vehicle": { ... },
      "status": "inactive",
      "socketId": null,
      "location": { "ltd": null, "lng": null }
    }
  }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

### Logout Captain

**Endpoint:**  
`GET /captain/logout`

**Description:**  
Blacklists JWT, clears cookie.

**Responses:**

- **200 OK**
  ```json
  { "message": "Logout successfully" }
  ```
- **401 Unauthorized**
  ```json
  { "message": "Unauthorized" }
  ```

---

## Notes

- All endpoints validate input using `express-validator`.
- Passwords are hashed using bcrypt before storing.
- JWT tokens are generated for authentication and must be sent via cookie or `Authorization` header.
- Logout endpoints blacklist tokens using [`BlacklistToken`](models/blacklistToken.model.js).
- Authentication middleware is implemented in [`auth.middleware.js`](middlewares/auth.middleware.js).
- Captain and user models are defined in [`captain.model.js`](models/captain.model.js) and [`user.model.js`](models/user.model.js).