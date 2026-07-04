# Kanban Board Frontend

A modern Kanban Board frontend built with React that allows users to manage boards and tasks through an intuitive drag-and-drop interface. The application integrates with a Spring Boot backend secured with JWT authentication.

---

# Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- React Query (TanStack Query - mutations)
- Tailwind CSS
- DnD Kit
- React Hot Toast

---

# Features

## Authentication

- User Registration
- User Login
- JWT Token Storage
- Protected Routes
- Logout Functionality

---

## Board Management

- Create Board
- View All Boards
- Edit Board
- Delete Board
- Open Board Details

---

## Task Management

- Create Task
- Edit Task
- Delete Task
- View Tasks by Board
- Display priority (Using Glowing dot [HIGH, MEDIUM, LOW])
- Display Due Date (With some criteria and color schema [RED, YELLOW, BLUE, CYAN])

---

## Drag & Drop Kanban

- Move Tasks Between Columns
- Reorder Tasks Within Same Column
- Automatic UI Refresh
- Backend Synchronization

---

## Workflow Columns

```text
BACKLOG
READY_FOR_DEVELOPMENT
IN_PROGRESS
IN_REVIEW
BLOCKED
DONE
```

---

# Authentication Flow

## Register

```text
User Registration Form
        ↓
Backend API
        ↓
User Created
```

---

## Login

```text
User Login Form
        ↓
Backend Authentication
        ↓
JWT Token Received
        ↓
Stored in Local Storage
        ↓
Redirect to Dashboard
```

---

# Protected Routes

Authenticated users only:

```text
/dashboard
/boards/:boardId
```

Unauthenticated users are redirected to:

```text
/
```

---

# State Management

## React Query

Used for:

- Fetching Boards
- Fetching Tasks
- Creating Boards
- Updating Boards
- Deleting Boards
- Creating Tasks
- Updating Tasks
- Deleting Tasks
- Moving Tasks

Benefits:

- Automatic Caching
- Query Invalidation - MUTATION
- Background Refetching
- Reduced Boilerplate

---

# API Integration

All API requests are handled through a centralized Axios instance.

## Axios Configuration

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});
```

---

## JWT Interceptor

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

# UI Components

## Authentication

- Login Form
- Register Form
- Protected Route

---

## Boards

- Board Card
- Create Board Form
- Edit Board Model

---

## Tasks

- Task Card
- Create Task Model
- Edit Task Model
- Delete Confirmation
- Kanban Column

---

# Drag & Drop Implementation

Implemented using:

```text
@dnd-kit/core
@dnd-kit/sortable
```

Supports:

```text
Move Between Columns
Reorder Within Column
Persistent Position Updates
Backend Synchronization
```

---

# Notifications

Implemented using:

```text
react-hot-toast
```

Used for:

- Board Creation
- Board Update
- Board Deletion
- Task Creation
- Task Update
- Task Deletion

---

# Responsive Design

Supports:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive layouts built using: Tailwind CSS Grid

---

# Running the Application

## Clone Repository

```bash
git clone <repository-url>
```

---

## Navigate (I used VS Code)

```bash
cd kanban-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

Application runs on:

```text
http://localhost:5173
```

---

# Required Backend

Backend should be running on:

```text
http://localhost:8080
```

Update API URL if needed:

```javascript
src/api/axios.js
```

---

# Future Enhancements

- Board Search
- Task Search
- User Profile
- Dark / Light Theme
- Activity Timeline
- File Attachments
- Real-Time Collaboration
- WebSocket Updates
