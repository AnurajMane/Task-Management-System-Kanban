# Kanban Board Backend

A RESTful backend service for a Kanban Board application built with Spring Boot. The system provides secure JWT-based authentication, board management, task management, and drag-and-drop task movement across workflow stages.

---

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication

### Database
- PostgreSQL

---

## Features

### Authentication
- User Registration
- User Login
- JWT Token Generation
- Protected APIs using Spring Security

### Board Management
- Create Board
- View All Boards
- View Board Details
- Update Board
- Delete Board

### Task Management
- Create Task
- View Tasks by Board
- Update Task
- Delete Task
- Move Task Between Columns
- Reorder Tasks Within Same Column

### Workflow Columns

```text
BACKLOG
READY_FOR_DEVELOPMENT
IN_PROGRESS
IN_REVIEW
BLOCKED
DONE
```

---

# Database Configuration

Update `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:9999/kanban_db
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

---

# Database Schema

## users

| Column |
|----------|
| id |
| name |
| email |
| password |

---

## boards

| Column |
|----------|
| id |
| name |
| description |
| user_id |

---

## tasks

| Column |
|----------|
| id |
| title |
| description |
| status |
| position |
| board_id |
| due_date |
| created_at |
| updated_at |

---

# Authentication APIs

## Register User

### Request

```http
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

### Request

```http
POST /api/auth/login
```

```json
{
  "email": "john@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "token": "jwt_token"
}
```

---

# Board APIs

## Create Board

```http
POST /api/boards
```

### Request

```json
{
  "name": "Job Search Board",
  "description": "Track job applications"
}
```

---

## Get All Boards

```http
GET /api/boards
```

---

## Get Board By ID

```http
GET /api/boards/{boardId}
```

---

## Update Board

```http
PUT /api/boards/{boardId}
```

### Request

```json
{
  "name": "Updated Board Name",
  "description": "Updated Description"
}
```

---

## Delete Board

```http
DELETE /api/boards/{boardId}
```

---

# Task APIs

## Create Task

```http
POST /api/boards/{boardId}/tasks
```

### Request

```json
{
  "title": "Prepare Interview",
  "description": "Practice DSA",
  "status": "BACKLOG"
  "duedate: "04-07-2026"
}
```

---

## Get Tasks By Board

```http
GET /api/boards/{boardId}/tasks
```

### Sample Response

```json
{
  "backlog": [],
  "readyForDevelopment": [],
  "inProgress": [],
  "inReview": [],
  "blocked": [],
  "done": []
}
```

---

## Update Task

```http
PUT /api/tasks/{taskId}
```

### Request

```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "status": "IN_PROGRESS"
  "duedate": "04-07-2026
}
```

---

## Delete Task

```http
DELETE /api/tasks/{taskId}
```

---

## Move Task

```http
PATCH /api/tasks/{taskId}/move
```

### Request

```json
{
  "targetStatus": "IN_PROGRESS",
  "targetPosition": 0
}
```

### Purpose

Used for:

- Drag and Drop
- Moving tasks across columns
- Reordering tasks within the same column

---

# Security

All APIs except registration and login require a JWT token.

### Header

```http
Authorization: Bearer <jwt_token>
```

---

# Running the Application

## Clone Repository

```bash
git clone <repository-url>
```

## Open in your IDE (I used Eclipse)

```bash
Go to -> File -> import -> Maven -> Existing Maven Project -> navigate to your directory -> select pom.xml -> finish
```

## Maven will automatically add all dependencies to your app

## Run Application (you can use command ->)

```bash
mvn spring-boot:run
```

Application starts on:

```text
http://localhost:8080
```

---

# Future Enhancements

- Board Sharing
- User Roles
- Activity History
- File Attachments
- Real-Time Updates using WebSockets
