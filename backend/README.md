# API Documentation

## /user/register

### Description
This endpoint is used to register a new user. It validates the input data, checks if the user already exists, and creates a new user if the validation passes.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min length: 3)",
    "lastname": "string (optional, min length: 3)"
  },
  "email": "string (valid email format)",
  "password": "string (min length: 6)"
}
```

### Response Example
A successful response will have the following structure:

```json
{
    "message": "User registered successfully",
    "userId": "string (unique identifier)"
}
```

## /user/login

### Description
This endpoint is used to log in an existing user. It validates the input data and returns a token if the credentials are correct.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format)",
  "password": "string (min length: 6)"
}
```

### Response Example
A successful response will have the following structure:

```json
{
    "token": "string (JWT token)",
    "user": {
        "id": "string (unique identifier)",
        "email": "string",
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        }
    }
}
```

## /user/profile

### Description
This endpoint is used to get the profile of the authenticated user.

### Method
`GET`

### Headers
The request should include the following headers:

```
Authorization: Bearer <token>
```

### Response Example
A successful response will have the following structure:

```json
{
    "id": "string (unique identifier)",
    "email": "string",
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    }
}
```

## /user/logout

### Description
This endpoint is used to log out the authenticated user. It clears the authentication token and blacklists it.

### Method
`GET`

### Headers
The request should include the following headers:

```
Authorization: Bearer <token>
```

### Response Example
A successful response will have the following structure:

```json
{
    "message": "Logout successfully"
}
```

## /captain/register

### Description
This endpoint is used to register a new captain. It validates the input data, checks if the captain already exists, and creates a new captain if the validation passes.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min length: 3)",
    "lastname": "string (optional, min length: 3)"
  },
  "email": "string (valid email format)",
  "password": "string (min length: 6)",
  "vehicle": {
    "color": "string (min length: 3)",
    "plate": "string (min length: 5)",
    "capacity": "number (min: 1)",
    "vehicleType": "string (one of: 'car', 'bike', 'auto')"
  }
}
```

### Response Example
A successful response will have the following structure:

```json
{
  "token": "string (JWT token)",
  "captain": {
    "id": "string (unique identifier)",
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

## /captain/login

### Description
This endpoint is used to log in an existing captain. It validates the input data and returns a token if the credentials are correct.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following structure:

```json
{
  "email": "string (valid email format)",
  "password": "string (min length: 6)"
}
```

### Response Example
A successful response will have the following structure:

```json
{
  "token": "string (JWT token)",
  "captain": {
    "id": "string (unique identifier)",
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

## /captain/profile

### Description
This endpoint is used to get the profile of the authenticated captain.

### Method
`GET`

### Headers
The request should include the following headers:

```
Authorization: Bearer <token>
```

### Response Example
A successful response will have the following structure:

```json
{
  "captain": {
    "id": "string (unique identifier)",
    "email": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

## /captain/logout

### Description
This endpoint is used to log out the authenticated captain. It clears the authentication token and blacklists it.

### Method
`GET`

### Headers
The request should include the following headers:

```
Authorization: Bearer <token>
```

### Response Example
A successful response will have the following structure:

```json
{
  "message": "Logout successfully"
}
```