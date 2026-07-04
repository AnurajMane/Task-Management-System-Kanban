# Kanban Board Application

A full-stack Kanban Board application that helps users organize tasks across different workflow stages. The application supports board management, task management, drag-and-drop functionality, and secure JWT-based authentication.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Board Management
- Create Board
- View Boards
- Update Board
- Delete Board

### Task Management
- Create Task
- Update Task
- Delete Task
- View Tasks by Board

### Drag & Drop
- Move Tasks Between Columns
- Reorder Tasks Within Same Column
- Automatic Position Management

---

## Workflow Stages

```text
BACKLOG
READY_FOR_DEVELOPMENT
IN_PROGRESS
IN_REVIEW
BLOCKED
DONE
```

---
## Task Priorities

```text
LOW,
MEDIUM,
HIGH
NO_PRIORITY
```

## Workflow Stages

```text
OVERDUE - red
TODAY - yellow
UPCOMING - cyan
default(no due) - slate-500
```

---
---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- React Query
- Tailwind CSS
- DnD Kit

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication

### Database
- PostgreSQL

---

## Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST APIs
       │
       ▼
PostgreSQL Database
```

---

## Major API Endpoints

### Authentication

```http
POST   /api/auth/register
POST   /api/auth/login
```

### Boards

```http
GET    /api/boards
GET    /api/boards/{id}
POST   /api/boards
PUT    /api/boards/{id}
DELETE /api/boards/{id}
```

### Tasks

```http
GET    /api/boards/{boardId}/tasks
POST   /api/boards/{boardId}/tasks
PUT    /api/tasks/{taskId}
DELETE /api/tasks/{taskId}
PATCH  /api/tasks/{taskId}/move
```

---

## Setup Instructions

### Backend (Refer detailed README.md in kanban-backend folder)

```bash
cd kanban-backend
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

### Frontend (Refer detailed README.md in kanban-frontend folder)

```bash
cd kanban-frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Database Configuration

Update the PostgreSQL configuration inside:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:9999/kanban_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

---

## Future Enhancements

- Board Search
- Activity History
- File Attachments
- Real-Time Collaboration

---

## Author

**Anuraj Mane**

Full Stack Developer | BE Artificial Intelligence & Data Science
