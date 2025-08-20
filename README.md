# Task Management App (React + MUI + Express)

A modern full-stack **Task Management** application: **React (Vite) + Material UI** on the frontend, and **Node.js + Express + Zod** on the backend.  
Clean dashboard with **table & carousel views**, filters, stats, dialogs for create/edit, and strict server-side validation.

---

## Table of Contents
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Task Model](#task-model)
- [REST API](#rest-api)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Quick cURL Tests](#quick-curl-tests)
- [UI/Design Notes](#uidesign-notes)
- [Troubleshooting](#troubleshooting)
- [Time & Effort Breakdown (~4h)](#time--effort-breakdown-4h)
- [Requirements Snapshot](#requirements-snapshot)
- [Favicon / App Icon](#favicon--app-icon)
- [License](#license)

---

## Architecture

**Backend (Express)**
- **routes/** – Maps HTTP routes to controllers.
- **controllers/** – HTTP orchestration (read input, call service, return status).
- **services/** – Business logic (status transitions, error throwing).
- **repositories/** – Data access (in-memory for demo; easy to swap for DB).
- **models/** – Zod schemas & enums (`priority`, `status`).
- **middleware/** – Validation (`validate*`), CORS, logging, 404, error handler.
- **utils/** – `uuid()` and `sortAndFilter()` (server-side search/sort).

**Frontend (React + MUI)**
- **components/** – Reusable MUI widgets (table, carousel, dialogs, filters, stats).
- **pages/** – `Dashboard.jsx` (main screen).
- **hooks/** – `useTasks.jsx` abstracts state + API calls.
- **services/** – `api.jsx` centralizes Axios requests.

**Principles**
- Clear separation of concerns.
- Server-side validation first (Zod).
- Consistent data shape across layers.
- DX: helpful errors, readable code, predictable layout.

---

## Tech Stack

**Backend**
- Node.js, Express
- Zod (validation)
- cors, morgan
- In-memory repo (seed with demo tasks)

**Frontend**
- Vite + React (no TypeScript)
- Material UI (`@mui/material`, `@mui/icons-material`, `@emotion/*`)
- Axios
- React Router

---

## Folder Structure

TaskManagmentApp/
├─ backend/
│ ├─ package.json
│ ├─ package-lock.json
│ └─ src/
│ ├─ server.js 
│ ├─ app.js # Express app wiring (CORS, JSON, routes, errors)
│ ├─ routes/
│ │ └─ taskRoutes.js # /api/tasks CRUD + /status patch
│ ├─ controllers/
│ │ └─ taskController.js 
│ ├─ services/
│ │ └─ taskService.js # Business logic (guard rails, throws 404/400)
│ ├─ repositories/
│ │ └─ taskRepo.js # In-memory store (seed, list/get/create/update/delete)
│ ├─ models/
│ │ └─ taskModel.js # Zod schemas: TaskCreate/TaskUpdate/StatusOnly, enums
│ ├─ middleware/
│ │ ├─ validate.js # validate input 
│ ├─ utils/
│ │ ├─ id.js # uuid() helper
│ │ └─ sortAndFilter.js # server-side q/status/priority + sorting
│ └─ config/ # (optional) env, constants, logger (future)
│
├─ frontend/
│ ├─ package.json
│ ├─ package-lock.json
│ ├─ vite.config.js 
│ ├─ index.html
│ └─ src/
│ ├─ main.jsx 
│ ├─ App.jsx 
│ ├─ assets/
│ │ └─ logo.jpeg # helfy logo
│ ├─ pages/
│ │ └─ Dashboard.jsx # Main screen (filters, stats, table/carousel, dialogs)
│ ├─ components/
│ │ ├─ FiltersBar.jsx # Search field + status/priority controls
│ │ ├─ TaskStatsCards.jsx # Total/Pending/Completed cards
│ │ ├─ TaskTable.jsx # MUI DataGrid-like table for tasks
│ │ ├─ TaskCarousel.jsx # Endless card carousel view
│ │ ├─ TaskFormDialog.jsx # Create/Edit dialog (title/priority/status/dates)
│ │ ├─ ConfirmDialog.jsx # Reusable confirm modal (delete, etc.)
│ │ └─ ThemeToggle.jsx # Light/Dark switch (persists to localStorage)
│ ├─ hooks/
│ │ └─ useTasks.jsx # Fetch, add, update, toggle, delete, compute stats
│ └─ services/
│ └─ api.jsx # Axios wrapper (list/get/create/update/setStatus/remove)
│
└─ README.md # You’re reading it

### Key Files & Responsibilities

- **backend/src/app.js**  
  Sets up Express: `cors()`, `express.json()`, request logging, mounts `/api` routes, and registers 404/error middleware.

- **backend/src/routes/taskRoutes.js**  
  Defines:
  - `GET /api/tasks` (supports `q`, `status`, `priority`)
  - `GET /api/tasks/:id`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `PATCH /api/tasks/:id/status`
  - `DELETE /api/tasks/:id`
  Each POST/PUT/PATCH is validated via Zod middleware.

- **backend/src/models/taskModel.js**  
  Zod schemas and enums:
  - `Priority`: `low|medium|high`
  - `Status`: `pending|completed`
  - `TaskCreate`, `TaskUpdate`, `StatusOnlyBody`, plus `IdParams`, `TaskSearchQuery`.

- **backend/src/repositories/taskRepo.js**  
  In-memory Array “DB”, includes `seed()` with 3 demo tasks and CRUD helpers.

- **backend/src/utils/sortAndFilter.js**  
  Implements the server-side `q` search (title/description), status/priority filtering, and simple sorting.

- **frontend/src/services/api.jsx**  
  Axios calls against `VITE_API_URL` (default `http://localhost:4000`):
  - `list(params)` → `GET /api/tasks`  
  - `get(id)` → `GET /api/tasks/:id`  
  - `create(data)` → `POST /api/tasks`  
  - `update(id, data)` → `PUT /api/tasks/:id`  
  - `setStatus(id, status)` → `PATCH /api/tasks/:id/status`  
  - `remove(id)` → `DELETE /api/tasks/:id`

- **frontend/src/hooks/useTasks.jsx**  
  Owns task state and exposes:
  - `fetch(params)` for filters/search
  - `addTask`, `updateTask`, `toggleTaskStatus(id, next)`, `removeTask`
  - Derived `stats`: `{ total, pending, completed }`

- **frontend/src/pages/Dashboard.jsx**  
  Composes the screen:
  - Header + **ThemeToggle**
  - **FiltersBar** → triggers `fetch(params)`
  - **TaskStatsCards** (totals)
  - **TaskTable** or **TaskCarousel** (user toggle)
  - **TaskFormDialog** for create/edit
  - **ConfirmDialog** for deletes
  - Floating Action Button (Add)

### Data Flow (Request Lifecycle)

1. **Dashboard / FiltersBar** triggers `useTasks.fetch(params)`.  
2. **api.jsx** performs `GET /api/tasks` with `q/status/priority`.  
3. **taskRoutes → controller → service → repository** obtain filtered list.  
4. Response arrives; **useTasks** updates state; **Dashboard** re-renders.  
5. Create/Update/Delete/Toggle follow the same path with respective HTTP verbs.

## ⏱️ Time Spent

~(20 m) — Planning: system design, contracts (API), infra choices, visual design
~(55 m) — Backend: Express setup, routes, models, validation (Zod), repository/service layers
~(45 m) — Frontend scaffold: Vite + React, MUI theme, layout & app shell
~(40 m) — Task CRUD integration: hooks, API client, data flow
~(40 m) — UI polish: table, carousel, filters, stats cards, dialogs
~(20 m) — Verification: cURL checks, error handling, small fixes
~(20 m) — README & screenshots


