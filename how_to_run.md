Your React frontend is **already running** at `http://localhost:5173` ✅. You just need to start the **database** and **Flask backend**. Here are the two ways:

---

## Option A — Docker Compose (Easiest — 1 command)

> Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) to be installed and running.

```powershell
cd c:\Users\shaun\Documents\Projects\3-tire-python
docker-compose up --build
```

This starts all 3 tiers automatically. Visit **http://localhost** (port 80).

---

## Option B — Manual (No Docker needed)

### Step 1 — Start PostgreSQL & create the DB

> You need PostgreSQL installed. Download from [postgresql.org](https://www.postgresql.org/download/windows/) if you haven't.

```powershell
# Create the database
psql -U postgres -c "CREATE DATABASE todo_db;"

# Run the schema + seed data
psql -U postgres -d todo_db -f c:\Users\shaun\Documents\Projects\3-tire-python\database\init.sql
```

---

### Step 2 — Start the Flask Backend

Open a **new terminal** and run:

```powershell
cd c:\Users\shaun\Documents\Projects\3-tire-python\backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask
python run.py
```

✅ You should see: `Running on http://0.0.0.0:5000`

---

### Step 3 — React Frontend (already running!)

Your frontend at **http://localhost:5173** is already live. Once Flask is running on port 5000, it will connect automatically — the Vite config proxies all `/api` calls to Flask.

---

## Quick verification

Open these in your browser:
| URL | Expected |
|-----|----------|
| `http://localhost:5173` | ✅ React To-Do app |
| `http://localhost:5000/api/health` | ✅ `{"status": "ok"}` |
| `http://localhost:5000/api/todos` | ✅ JSON list of seed tasks |

---

> **Tip:** If `psql` isn't recognized in PowerShell, add it to your PATH: `C:\Program Files\PostgreSQL\15\bin`




## 🐘 PostgreSQL Setup on Windows

### Step 1 — Download & Install

1. Go to 👉 **https://www.postgresql.org/download/windows/**
2. Click **"Download the installer"** (by EDB)
3. Download the latest **PostgreSQL 15** (Windows x86-64)
4. Run the installer as Administrator

**During installation, keep all defaults:**
- Install directory: `C:\Program Files\PostgreSQL\15`
- Components: ✅ PostgreSQL Server, ✅ pgAdmin 4, ✅ Command Line Tools
- Data directory: default
- **Set a password for the `postgres` user** → use `postgres` (to match the app's `.env`)
- Port: `5432` (default)
- Locale: default

---

### Step 2 — Add PostgreSQL to PATH

So PowerShell can find `psql`:

1. Press `Win + S` → search **"Environment Variables"**
2. Click **"Edit the system environment variables"**
3. Click **"Environment Variables"**
4. Under **System variables**, find `Path` → click **Edit**
5. Click **New** → add:
   ```
   C:\Program Files\PostgreSQL\15\bin
   ```
6. Click OK → OK → OK
7. **Restart PowerShell**

Verify it works:
```powershell
psql --version
# Should print: psql (PostgreSQL) 15.x
```

---

### Step 3 — Create the Database & Load Seed Data

```powershell
# Create the database (enter password "postgres" when prompted)
psql -U postgres -c "CREATE DATABASE todo_db;"

# Load the schema + 10 sample tasks
psql -U postgres -d todo_db -f "c:\Users\shaun\Documents\Projects\3-tire-python\database\init.sql"
```

✅ You should see output like:
```
CREATE TABLE
CREATE FUNCTION
CREATE TRIGGER
INSERT 0 10
```

---

### Step 4 — Verify with pgAdmin (Optional GUI)

PostgreSQL installs **pgAdmin 4** automatically — it's a visual database manager.

1. Open **pgAdmin 4** from Start Menu
2. Connect to `localhost` with user `postgres`
3. You should see **`todo_db`** → **Tables** → **`todos`** with 10 rows

---

### After PostgreSQL is running → Start Flask:

```powershell
cd c:\Users\shaun\Documents\Projects\3-tire-python\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Then visit **http://localhost:5173** — the full app will be working! 🚀