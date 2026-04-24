<div align="center">

# ✦ To-Do List App

### A production-ready **3-Tier Full Stack** application

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*A sleek, dark-themed to-do manager with priority tagging, category filters, and real-time progress tracking.*

</div>

---

## 📸 Features

- ✅ **Full CRUD** — Create, read, update, and delete tasks
- 🏷️ **Priority Levels** — High 🔴 / Medium 🟡 / Low 🟢 with color-coded cards
- 📂 **Category Tags** — Work, Personal, Shopping, Health, Finance, Study
- 🔍 **Filter Tabs** — All / Active / Completed
- 📊 **Live Progress Bar** — Shows completion percentage in real time
- 💾 **Persistent Storage** — All data stored in PostgreSQL
- 🌙 **Dark Gradient UI** — Deep navy + violet/fuchsia/orange accents
- ✨ **Smooth Animations** — Slide-in cards, fade modals, hover glows

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         TIER 1 — PRESENTATION           │
│   React 18 + Vite + TailwindCSS v3      │
│              Port: 5173                  │
└──────────────────┬──────────────────────┘
                   │  HTTP / REST (axios)
┌──────────────────▼──────────────────────┐
│         TIER 2 — BUSINESS LOGIC         │
│     Python Flask + SQLAlchemy ORM       │
│              Port: 5000                  │
└──────────────────┬──────────────────────┘
                   │  SQLAlchemy
┌──────────────────▼──────────────────────┐
│         TIER 3 — DATA LAYER             │
│          PostgreSQL 15 Database         │
│              Port: 5432                  │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | UI framework with fast HMR |
| **Styling** | TailwindCSS v3 | Utility-first CSS with custom dark theme |
| **HTTP Client** | axios | API calls from React → Flask |
| **Backend** | Python Flask | REST API server |
| **ORM** | SQLAlchemy + Flask-Migrate | Database models & migrations |
| **Validation** | Marshmallow | Request / Response schemas |
| **Database** | PostgreSQL 15 | Persistent data storage |
| **DevOps** | Docker Compose | One-command local stack |

---

## 📁 Project Structure

```
3-tire-python/
├── backend/                    # 🐍 Flask REST API
│   ├── app/
│   │   ├── __init__.py         # App factory + CORS + extensions
│   │   ├── config.py           # Dev/Prod config classes
│   │   ├── models.py           # SQLAlchemy Todo model
│   │   ├── schemas.py          # Marshmallow validation schemas
│   │   └── routes/
│   │       └── todos.py        # All CRUD endpoints + /api/stats
│   ├── run.py                  # Entry point (port 5000)
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # ⚠️ DB credentials (not committed)
│   └── Dockerfile
│
├── frontend/                   # ⚛️ React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Gradient header + progress bar + stats
│   │   │   ├── FilterBar.jsx   # All / Active / Completed tabs
│   │   │   ├── TodoList.jsx    # List container + loading skeletons
│   │   │   ├── TodoCard.jsx    # Task card with priority glow effect
│   │   │   └── AddTaskModal.jsx# Add / Edit modal with validation
│   │   ├── services/
│   │   │   └── api.js          # axios service layer
│   │   ├── App.jsx             # Root component (state + API orchestration)
│   │   └── index.css           # TailwindCSS directives + custom utilities
│   ├── tailwind.config.js      # Custom dark palette + animations
│   ├── vite.config.js          # Dev server + proxy to Flask
│   └── Dockerfile
│
├── database/
│   └── init.sql                # 🗄️ Schema + 10 seed tasks
│
├── docker-compose.yml          # 🐳 Orchestrates all 3 tiers
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Option A — Docker Compose (Recommended)

> **Requires:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

```bash
# Clone the repo
git clone https://github.com/Shaunak-ondare/3-tire-flask-app-azure-cicd.git
cd 3-tire-flask-app-azure-cicd

# Start all 3 tiers
docker-compose up --build
```

| Service | URL |
|---------|-----|
| 🖥️ Frontend | http://localhost |
| ⚙️ Backend API | http://localhost:5000/api |
| 🗄️ PostgreSQL | localhost:5432 |

---

### Option B — Manual (Local Development)

#### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 15 ([Download](https://www.postgresql.org/download/windows/))

#### 1. Clone the Repository
```bash
git clone https://github.com/Shaunak-ondare/3-tire-flask-app-azure-cicd.git
cd 3-tire-flask-app-azure-cicd
```

#### 2. Setup PostgreSQL
```bash
# Create the database
psql -U postgres -c "CREATE DATABASE todo_db;"

# Load schema + seed data
psql -U postgres -d todo_db -f database/init.sql
```

#### 3. Start Flask Backend
```bash
cd backend

# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
# python -m venv venv && source venv/bin/activate

pip install -r requirements.txt
python run.py
```
✅ API running at `http://localhost:5000`

#### 4. Start React Frontend
```bash
# Open a new terminal
cd frontend
npm install
npm run dev
```
✅ App running at `http://localhost:5173`

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/todos` | List all todos |
| `GET` | `/todos?status=active` | List active todos |
| `GET` | `/todos?status=completed` | List completed todos |
| `GET` | `/todos/<id>` | Get a single todo |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/<id>` | Update / toggle a todo |
| `DELETE` | `/todos/<id>` | Delete a todo |
| `GET` | `/stats` | Dashboard statistics |

#### Example Request — Create Todo
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "medium",
    "category": "Shopping"
  }'
```

#### Example Response
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium",
  "category": "Shopping",
  "is_completed": false,
  "created_at": "2026-04-24T13:30:00+00:00",
  "updated_at": "2026-04-24T13:30:00+00:00"
}
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE todos (
    id           SERIAL PRIMARY KEY,
    title        VARCHAR(200)  NOT NULL,
    description  TEXT,
    priority     VARCHAR(10)   NOT NULL DEFAULT 'medium',  -- low | medium | high
    category     VARCHAR(50)   NOT NULL DEFAULT 'General',
    is_completed BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## ⚙️ Environment Variables

Create `backend/.env` (already included, **not committed to git**):

```env
FLASK_ENV=development
FLASK_APP=run.py
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/todo_db
```

---

## 🔒 Security Notes

- `.env` is listed in `.gitignore` — secrets are **never committed**
- CORS is restricted to `/api/*` routes only
- Input validation enforced via Marshmallow schemas on all endpoints
- Change `SECRET_KEY` and DB password before deploying to production

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

<div align="center">

Made with ❤️ using React, Flask & PostgreSQL

</div>
