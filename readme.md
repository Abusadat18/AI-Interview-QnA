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
* **Hosting:** Local / Render / Heroku

---

## 3. Database Schema

### 3.1 Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
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
    topic TEXT,
    difficulty TEXT,
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
| POST   | `/api/sessions`     | ✅    | Create a new session                                           |
| GET    | `/api/sessions`     | ✅    | List all sessions for logged-in user                           |
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


