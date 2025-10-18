# API Contract: Task Management System

**Purpose**: RESTful API endpoint specifications for frontend-backend communication
**Date**: 2025-10-16
**Base URL**: `http://localhost:3000/api`
**Authentication**: JWT Bearer Token

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body**:
```json
{
  "name": "string (required, max 100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "string (ObjectId)",
      "name": "string",
      "email": "string",
      "createdAt": "string (ISO date)"
    },
    "token": "string (JWT)"
  }
}
```

**Error Responses**:
- 400: Invalid input data
- 409: Email already exists

### POST /auth/login
Authenticate user and return JWT token.

**Request Body**:
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string (ObjectId)",
      "name": "string",
      "email": "string"
    },
    "token": "string (JWT)"
  }
}
```

**Error Responses**:
- 400: Invalid input data
- 401: Invalid credentials

### POST /auth/logout
Invalidate user session (client-side token removal).

**Headers**: `Authorization: Bearer <token>`

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Task Endpoints

All task endpoints require authentication via JWT Bearer token.

### GET /tasks
Retrieve all tasks for the authenticated user with optional filtering.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `status` (optional): "Todo" | "In Progress" | "Completed"
- `priority` (optional): "Low" | "Medium" | "High"
- `search` (optional): string for title/description search
- `page` (optional): number (default: 1)
- `limit` (optional): number (default: 20, max: 100)

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "string (ObjectId)",
        "title": "string (max 200 chars)",
        "description": "string (max 2000 chars, optional)",
        "priority": "Low" | "Medium" | "High",
        "status": "Todo" | "In Progress" | "Completed",
        "dueDate": "string (ISO date, optional)",
        "createdAt": "string (ISO date)",
        "updatedAt": "string (ISO date)"
      }
    ],
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "pages": "number"
    }
  }
}
```

### GET /tasks/:id
Retrieve a specific task by ID.

**Headers**: `Authorization: Bearer <token>`

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "string (ObjectId)",
      "title": "string",
      "description": "string",
      "priority": "string",
      "status": "string",
      "dueDate": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}
```

**Error Responses**:
- 404: Task not found
- 403: Access denied (task belongs to different user)

### POST /tasks
Create a new task for the authenticated user.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "string (required, max 200 chars)",
  "description": "string (optional, max 2000 chars)",
  "priority": "Low" | "Medium" | "High (default: Medium)",
  "status": "Todo" | "In Progress" | "Completed (default: Todo)",
  "dueDate": "string (ISO date, optional, must be future)"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "string (ObjectId)",
      "title": "string",
      "description": "string",
      "priority": "string",
      "status": "string",
      "dueDate": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}
```

**Error Responses**:
- 400: Invalid input data
- 409: User has reached maximum task limit (1000)

### PUT /tasks/:id
Update an existing task.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "string (max 200 chars, optional)",
  "description": "string (max 2000 chars, optional)",
  "priority": "Low" | "Medium" | "High (optional)",
  "status": "Todo" | "In Progress" | "Completed (optional)",
  "dueDate": "string (ISO date, optional, must be future)"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "id": "string (ObjectId)",
      "title": "string",
      "description": "string",
      "priority": "string",
      "status": "string",
      "dueDate": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  }
}
```

**Error Responses**:
- 400: Invalid input data
- 404: Task not found
- 403: Access denied

### DELETE /tasks/:id
Delete a specific task.

**Headers**: `Authorization: Bearer <token>`

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**:
- 404: Task not found
- 403: Access denied

### GET /tasks/stats
Retrieve dashboard statistics for the authenticated user.

**Headers**: `Authorization: Bearer <token>`

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "statistics": {
      "total": "number",
      "completed": "number",
      "pending": "number",
      "byPriority": {
        "Low": "number",
        "Medium": "number",
        "High": "number"
      },
      "byStatus": {
        "Todo": "number",
        "In Progress": "number",
        "Completed": "number"
      }
    }
  }
}
```

## Error Response Format

All error responses follow this consistent format:

```json
{
  "success": false,
  "error": {
    "code": "string (error identifier)",
    "message": "string (human-readable error)",
    "details": "object (optional, additional error context)"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Input validation failed
- `AUTHENTICATION_REQUIRED`: No or invalid token provided
- `AUTHORIZATION_FAILED`: User lacks permission for resource
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `DUPLICATE_RESOURCE`: Resource already exists (e.g., email)
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Unexpected server error

## Rate Limiting

- Authentication endpoints: 5 requests per minute per IP
- Task endpoints: 100 requests per minute per authenticated user
- Statistics endpoint: 10 requests per minute per authenticated user

## Response Headers

All responses include these headers:
- `Content-Type`: `application/json`
- `X-RateLimit-Limit`: Rate limit ceiling
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when rate limit resets

## Request Validation

### Input Sanitization
- All string inputs are trimmed of whitespace
- Email addresses are converted to lowercase
- HTML tags are stripped from text inputs
- SQL injection prevention via parameterized queries

### Validation Rules
- Email: RFC 5322 compliant format
- Password: Minimum 8 characters, at least one letter and one number
- Task Title: Required, max 200 characters
- Task Description: Optional, max 2000 characters
- Due Dates: Must be valid ISO 8601 dates in the future

## Versioning

API versioning via URL path:
- Current version: `/api/v1/`
- Backward compatibility maintained for at least one major version
- Version-specific documentation maintained separately