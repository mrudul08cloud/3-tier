# ✦ 3-Tier To-Do App

A full-stack To-Do List application built with **React + TailwindCSS**, **Python Flask**, and **PostgreSQL**.

```
Frontend (React/Vite)  →  Backend (Flask)  →  Database (PostgreSQL)
     :5173                    :5000                  :5432
```

---

## 🚀 Quick Start — Docker (Recommended)

> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
docker-compose up --build
```

- 🖥️ Frontend: http://localhost (port 80)
- ⚙️ Backend API: http://localhost:5000/api
- 🗄️ PostgreSQL: localhost:5432

---

## 🛠️ Manual Setup (Local Dev)

### 1. Database (PostgreSQL)

Make sure PostgreSQL is running locally, then:

```bash
psql -U postgres -c "CREATE DATABASE todo_db;"
psql -U postgres -d todo_db -f database/init.sql
```

### 2. Backend (Flask)

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt

# Configure environment
copy .env.example .env      # Edit DB credentials if needed

# Run Flask
python run.py
```

API will be available at: http://localhost:5000/api

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

App will be available at: http://localhost:5173

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | List all todos |
| GET | `/api/todos?status=active` | Filter active todos |
| GET | `/api/todos?status=completed` | Filter completed todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update / toggle todo |
| DELETE | `/api/todos/:id` | Delete todo |
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/health` | Health check |

### Example POST body
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "category": "Shopping"
}
```

---

## 🏗️ Project Structure

```
3-tire-python/
├── backend/           # Flask REST API
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes/todos.py
│   ├── run.py
│   ├── requirements.txt
│   └── .env
├── frontend/          # React + Vite + TailwindCSS
│   └── src/
│       ├── components/
│       └── services/api.js
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

---

## 🎨 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, TailwindCSS v3, axios |
| Backend | Python Flask, SQLAlchemy, Marshmallow |
| Database | PostgreSQL 15 |
| DevOps | Docker Compose |
