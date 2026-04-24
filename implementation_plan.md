# 3-Tier To-Do List App: React + Flask + PostgreSQL

A sleek, colorful, production-ready 3-tier To-Do List app with a dark gradient UI, priority tagging, and full CRUD functionality.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         TIER 1 - PRESENTATION           │
│     React 18 + TailwindCSS Frontend     │
│              Port: 5173 (Vite)          │
└──────────────────┬──────────────────────┘
                   │ HTTP/REST API (axios)
┌──────────────────▼──────────────────────┐
│         TIER 2 - BUSINESS LOGIC         │
│         Python Flask Backend            │
│              Port: 5000                 │
└──────────────────┬──────────────────────┘
                   │ SQLAlchemy ORM
┌──────────────────▼──────────────────────┐
│         TIER 3 - DATA LAYER             │
│         PostgreSQL 15 Database          │
│              Port: 5432                 │
└─────────────────────────────────────────┘
```

## Application: To-Do List Manager

A feature-rich, visually stunning to-do app with priority levels, categories, and status filtering.

**Features:**
- ✅ Add, edit, delete tasks
- 🏷️ Priority levels: **Low**, **Medium**, **High** (with distinct colors)
- 📂 Category tags (Work, Personal, Shopping, etc.)
- 🔍 Filter by status: All / Active / Completed
- 🎯 Mark tasks complete/incomplete with satisfying animations
- 📊 Progress bar showing completion percentage
- 🌙 Dark gradient UI with vivid accent colors (purple → pink → orange)

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | **React 18** + Vite | UI framework with fast HMR |
| Styling | **TailwindCSS** | Utility-first CSS framework |
| HTTP Client | **axios** | API calls from React → Flask |
| Backend | **Python Flask** + Flask-CORS | REST API server |
| ORM | **SQLAlchemy** + Flask-SQLAlchemy | DB models |
| Migrations | **Flask-Migrate** (Alembic) | DB schema migrations |
| Validation | **marshmallow** | Request/Response schemas |
| Database | **PostgreSQL 15** | Persistent data storage |
| Dev Tools | **Docker Compose** | One-command local setup |

> [!IMPORTANT]
> **TailwindCSS Version**: I plan to use **TailwindCSS v3** (stable, widely supported). Please confirm if you'd prefer v4 (latest) instead.

---

## UI Design Vision

```
╔══════════════════════════════════════════════╗
║  ✦ My Tasks              [+ Add Task]        ║  ← gradient header (purple→pink)
╠══════════════════════════════════════════════╣
║  Progress ████████░░ 80%  (8/10 done)        ║
╠══════════════════════════════════════════════╣
║  [All] [Active] [Completed]   🔍 Search      ║  ← filter tabs
╠══════════════════════════════════════════════╣
║  ┌──────────────────────────────────────┐   ║
║  │ ◉  Buy groceries          [LOW] 🛒  │   ║  ← green badge
║  │ ◯  Finish project report  [HIGH] 💼 │   ║  ← red badge
║  │ ◉  Call dentist           [MED] 🏥  │   ║  ← yellow badge
║  └──────────────────────────────────────┘   ║
╚══════════════════════════════════════════════╝
```

**Color palette:**
- Background: `#0f0f1a` (deep navy)
- Card: `#1a1a2e` (dark purple tint)
- Accent gradient: `from-violet-600 via-fuchsia-500 to-orange-400`
- High priority: `red-400` | Medium: `yellow-400` | Low: `emerald-400`
- Completed tasks: strikethrough + dimmed

---

## Project Structure

```
3-tire-python/
├── backend/                        # Flask API
│   ├── app/
│   │   ├── __init__.py             # Flask app factory
│   │   ├── config.py               # Config classes (dev/prod)
│   │   ├── models.py               # SQLAlchemy Todo model
│   │   ├── schemas.py              # Marshmallow schemas
│   │   └── routes/
│   │       └── todos.py            # /api/todos CRUD routes
│   ├── run.py                      # Entry point
│   ├── requirements.txt
│   └── .env                        # DB credentials
│
├── frontend/                       # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # App title + progress bar
│   │   │   ├── FilterBar.jsx       # All/Active/Completed tabs
│   │   │   ├── TodoList.jsx        # Task list container
│   │   │   ├── TodoCard.jsx        # Individual task card
│   │   │   ├── AddTaskModal.jsx    # Modal form to add/edit
│   │   │   └── ProgressBar.jsx     # Animated completion bar
│   │   ├── services/
│   │   │   └── api.js              # axios API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # TailwindCSS directives
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── database/
│   └── init.sql                    # Schema + seed data
│
├── docker-compose.yml
└── README.md
```

---

## Database Schema

**todos** table:

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PRIMARY KEY | Auto-increment |
| title | VARCHAR(200) | Required |
| description | TEXT | Optional |
| priority | VARCHAR(10) | `low`, `medium`, `high` |
| category | VARCHAR(50) | e.g. Work, Personal |
| is_completed | BOOLEAN | Default: false |
| created_at | TIMESTAMP | Auto-set |
| updated_at | TIMESTAMP | Auto-updated |

---

## API Contracts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | List all todos (optional `?status=active`) |
| GET | `/api/todos/<id>` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/<id>` | Update todo (including toggle complete) |
| DELETE | `/api/todos/<id>` | Delete todo |
| GET | `/api/stats` | Return total, completed, active counts |

---

## Proposed Changes

### Tier 3 — Database
#### [NEW] `database/init.sql`
Schema creation + sample seed todos across different priorities and categories.

---

### Tier 2 — Backend (Flask)

#### [NEW] `backend/requirements.txt`
`flask`, `flask-cors`, `flask-sqlalchemy`, `flask-migrate`, `psycopg2-binary`, `marshmallow`, `python-dotenv`

#### [NEW] `backend/app/__init__.py`
Flask app factory — registers extensions, blueprints, CORS.

#### [NEW] `backend/app/config.py`
`DevelopmentConfig` with DB URL from `.env`.

#### [NEW] `backend/app/models.py`
SQLAlchemy `Todo` model with all columns.

#### [NEW] `backend/app/schemas.py`
Marshmallow `TodoSchema` for serialization/validation.

#### [NEW] `backend/app/routes/todos.py`
Flask Blueprint with all CRUD routes + `/api/stats`.

#### [NEW] `backend/run.py`
App entry point. Runs on port 5000.

#### [NEW] `backend/.env`
`DATABASE_URL`, `FLASK_ENV`, `SECRET_KEY`

---

### Tier 1 — Frontend (React + TailwindCSS)

#### [NEW] `frontend/` (Vite + React scaffold)
Created via `npx create-vite@latest`.

#### [NEW] `frontend/tailwind.config.js`
Custom theme extending TailwindCSS with the dark palette and gradient definitions.

#### [NEW] `frontend/src/services/api.js`
axios instance pointing to `http://localhost:5000/api`.

#### [NEW] `frontend/src/components/` (all 6 components)
Full UI with animated task cards, modal form, progress bar, and filter tabs.

#### [NEW] `frontend/src/App.jsx`
Root component managing state and API calls.

---

### Docker Orchestration

#### [NEW] `docker-compose.yml`
3 services: `postgres`, `backend` (Flask), `frontend` (Vite dev server) with a shared network.

#### [NEW] `README.md`
Full setup instructions for Docker and manual dev.

---

## Open Questions

> [!IMPORTANT]
> **TailwindCSS version**: Confirm **v3** (default) or **v4**?

> [!IMPORTANT]
> **PostgreSQL credentials**: OK to default to `db=todo_db`, `user=postgres`, `password=postgres`?

> [!NOTE]
> **Seed data**: Should I include sample to-dos so the app looks populated immediately?

---

## Verification Plan

### Automated
- `docker-compose up` → all 3 containers healthy
- `GET /api/todos` returns JSON list
- `POST /api/todos` creates a record in PostgreSQL
- React dev server loads at `localhost:5173` without errors

### Manual
- Add a task via the modal → appears in list
- Toggle complete → strikethrough + progress bar updates
- Delete a task → removed from DB
- Filter tabs work correctly
