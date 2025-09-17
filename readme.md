# AI Interview QnA – Backend Documentation

**Author:** Abu Sadat Ansari
**Version:** 1.0
**Date:** September 2025

---

## 1. Project Overview

AI Interview QnA is a backend for a web platform that allows users to:

* Create interview practice sessions
* Ask questions to an AI and get answers
* Store user answers and AI responses
* View session history
* Manage their own sessions securely

**Tech Stack:** Node.js + Express, PostgreSQL, JWT Authentication, bcrypt

---

## 2. Tech Stack

* **Backend Framework:** Node.js + Express
* **Database:** PostgreSQL
* **Authentication:** JWT
* **Password Hashing:** bcrypt
* **Environment Variables:** `.env` for secrets & DB credentials

---

## 3. Database Schema

### 3.1 Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

* Stores user info.
* Passwords hashed using **bcrypt**.

---

### 3.2 Sessions Table

```sql
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    topic VARCHAR(100),
    difficulty VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

* Each session is tied to a user.
* Cascade deletes questions on session removal.

---

### 3.3 Questions Table

```sql
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    user_answer TEXT,
    ai_answer TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

* Each question belongs to a session.
* Stores AI-generated answer and user response.

---

## 4. Authentication Flow

1. **Register**

   * `POST /api/auth/register`
   * Body: `{ name, email, password }`
   * Password hashed with bcrypt before storing

2. **Login**

   * `POST /api/auth/login`
   * Body: `{ email, password }`
   * Returns JWT token on success

3. **Auth Middleware**

   * Verifies JWT token from `Authorization` header
   * Attaches `req.user = { userId, email }` for route controllers
   * Protects routes from unauthenticated users

---

## 5. API Endpoints

### 5.1 Sessions

| Method | Endpoint            | Auth | Description                                                    |
| ------ | ------------------- | ---- | -------------------------------------------------------------- |
| POST   | `/api/sessions/start`     | ✅    | Create a new session                                           |
| GET    | `/api/sessions/`     | ✅    | List all sessions for logged-in user                           |
| GET    | `/api/sessions/:id` | ✅    | Get a specific session (ownership enforced)                    |
| DELETE | `/api/sessions/:id` | ✅    | Delete session (cascade deletes questions, ownership enforced) |

---

### 5.2 Questions / QnA

| Method | Endpoint                          | Auth | Description                                          |
| ------ | --------------------------------- | ---- | ---------------------------------------------------- |
| POST   | `/api/qna/ask`                    | ✅    | Ask a question, get AI answer, store in DB           |
| GET    | `/api/qna/history/:sessionId`     | ✅    | Get all questions for a session (ownership enforced) |
| DELETE | `/api/qna/:sessionId/:questionId` | ✅    | Delete a specific question (ownership enforced)      |

---

## 6. Example Queries (PostgreSQL)

### Create a session

```sql
INSERT INTO sessions (user_id, topic, difficulty)
VALUES (1, 'DSA', 'Medium')
RETURNING *;
```

### Insert a question

```sql
INSERT INTO questions (session_id, question_text, user_answer, ai_answer)
VALUES (10, 'Explain BFS', 'My answer...', 'AI sample answer')
RETURNING *;
```

### Fetch session history

```sql
SELECT id, question_text, user_answer, ai_answer, created_at
FROM questions
WHERE session_id = 10
ORDER BY created_at ASC;
```

### Delete a session

```sql
DELETE FROM sessions WHERE id = 10 RETURNING *;
```

*(Cascade deletes all questions for that session)*

---

## 7. Ownership & Security

* All session/question endpoints check **ownership** using `req.user.userId`.
* Prevents users from accessing/modifying other users’ data.
* JWT ensures only authenticated users can access protected routes.

---

## 8. Future Enhancements

* **Authentication**: Refresh tokens, password reset
* **Sessions**: Topic/difficulty selection, analytics
* **Questions**: Difficulty level for AI questions, voice input/output
* **Frontend**: React + Vite + Tailwind, sidebar with session history, real-time chat
* **Database**: Pagination, `updated_at` timestamps

---
---

# 🎨 Frontend Documentation – AI Interview QnA

## 📌 Overview

The frontend is a **React + TailwindCSS** application.
It consumes the backend API (Express + PostgreSQL) to provide:

* Authentication (Login/Register)
* Session management (create, list, delete)
* Practice interface (ask AI questions, view answers, and history)

The app is fully responsive and designed to feel like a **mock interview platform**.

---

## 🏗️ Project Structure

```plaintext
frontend/
 ├── src/
 │    ├── components/
 │    │    ├── Navbar.jsx        # Top navigation bar
 │    │    ├── Sidebar.jsx       # Session history sidebar
 │    │    ├── ChatBox.jsx       # Chat-like QnA display
 │    │    ├── InputBox.jsx      # Input area for questions
 │    │    └── ProtectedRoute.jsx # Wrapper for auth-protected pages
 │    │
 │    ├── pages/
 │    │    ├── Home.jsx          # Landing page
 │    │    ├── Login.jsx         # Login page
 │    │    ├── Register.jsx      # Registration page
 │    │    ├── Dashboard.jsx     # Shows sessions + start new
 │    │    └── Practice.jsx      # Main practice page
 │    │
 │    ├── services/
 │    │    └── api.js            # Fetch helpers for backend calls
 │    │
 │    ├── context/
 │    │    └── AuthContext.jsx   # Stores user/auth state globally
 │    │
 │    ├── App.jsx                # Routes config
 │    ├── main.jsx               # App entry
 │    └── index.css              # Tailwind setup
 │
 └── package.json
```

---

## 🔑 Auth Flow

### 🔹 Registration

* **Frontend**: `Register.jsx` form → sends `{ name, email, password }`
* **Backend**: `/api/auth/register` → stores user in DB

### 🔹 Login

* **Frontend**: `Login.jsx` form → sends `{ email, password }`
* **Backend**: `/api/auth/login` → returns **JWT token**

### 🔹 Storing Token

* JWT is stored in **localStorage** (or cookies later).
* Every protected API call adds header:

```http
Authorization: Bearer <token>
```

### 🔹 Protected Routes

* `ProtectedRoute.jsx` checks if user is logged in.
* If not → redirects to `/login`.

---

## 📂 Pages Flow

1. **Home.jsx** → Intro + CTA to login/register.
2. **Login/Register** → Get access.
3. **Dashboard.jsx** →

   * Show all sessions of the logged-in user (`GET /api/sessions`).
   * Start a new session (`POST /api/sessions/start`).
   * Delete old sessions.
4. **Practice.jsx** →

   * Sidebar: Session history (`GET /api/qna/history/:sessionId`).
   * Main ChatBox: User asks question → AI responds (`POST /api/qna/ask`).
   * InputBox: Send question.

---

## 🌐 API Usage (Frontend)

All backend calls are wrapped in `services/api.js`.

Example:

```js
const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
```

Same pattern for register, sessions, and QnA.

---

## 🖼️ UI Design Guidelines

* **TailwindCSS** for styling.
* **Responsive** → mobile-first (sidebar collapses on small screens).
* **Interview-like feel** →

  * Dark mode toggle (optional later).
  * Chat bubbles for QnA (user vs AI).
  * Minimal distractions.

---

## ✅ Example Workflow

1. User registers/logs in → JWT stored.
2. Dashboard loads → fetches sessions for that user.
3. User clicks "Start New Session" → new session ID created.
4. User asks a question → sent to `/api/qna/ask`.
5. AI answer + question stored in DB, displayed in UI.
6. Sidebar shows history → pulled from `/api/qna/history/:sessionId`.
7. User can delete session if no longer needed.


