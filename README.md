# Task Management App 

A modern full-stack **Task Management** application: **React (Vite) + Material UI** on the frontend, and **Node.js + Express + Zod** on the backend.  
Clean dashboard with **table & carousel views**, filters, stats, dialogs for create/edit, and strict server-side validation.
<img width="682" height="378" alt="addTask" src="https://github.com/user-attachments/assets/650e2e13-dad9-4abd-b778-ca142e090a88" />
<img width="1272" height="545" alt="TaskCarousel" src="https://github.com/user-attachments/assets/6b237038-92a0-4e45-b2d8-cf6e10662157" />
<img width="1276" height="608" alt="TaskTable" src="https://github.com/user-attachments/assets/529bb232-d360-482b-b7ee-da61632e45cc" />

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
        
                TaskManagementApp/
                ├─ backend/
                │ ├─ package.json
                │ ├─ package-lock.json
                │ └─ src/
                │ ├─ server.js 
                │ ├─ app.js # Express app wiring (CORS, JSON, routes, errors)
                │ ├─ routes/
                │ │ └─ taskRoutes.js # CRUD routes for tasks
                │ ├─ controllers/
                │ │ └─ taskController.js 
                │ ├─ services/
                │ │ └─ taskService.js # Business logic for tasks
                │ ├─ repositories/
                │ │ └─ taskRepo.js # In-memory store for tasks
                │ ├─ models/
                │ │ └─ taskModel.js # Zod schemas or any other schemas for validation
                │ ├─ middleware/
                │ │ ├─ validate.js # Middleware for input validation
                │ ├─ utils/
                │ │ ├─ id.js # Utility for generating IDs (e.g., using `uuid`)
                │ │ └─ sortAndFilter.js # Helper to sort/filter tasks server-side
                │ └─ config/ # Optional folder for environment, logger, constants
                │
                ├─ frontend/
                │ ├─ package.json
                │ ├─ package-lock.json
                │ ├─ vite.config.js # Vite configuration file
                │ ├─ index.html # HTML template
                │ └─ src/
                │ ├─ main.jsx # Main entry point for React
                │ ├─ App.jsx # Root component for your app
                │ ├─ assets/
                │ │ └─ logo.jpeg # Any static assets, like your logo
                │ ├─ pages/
                │ │ └─ Dashboard.jsx # The main screen component
                │ ├─ components/
                │ │ ├─ FiltersBar.jsx # Component for filtering tasks
                │ │ ├─ TaskStatsCards.jsx # Component to show stats (Total/Pending/Completed)
                │ │ ├─ TaskTable.jsx # Component for displaying tasks in a table
                │ │ ├─ TaskCarousel.jsx # Carousel view for tasks
                │ │ ├─ TaskFormDialog.jsx # Dialog for creating or editing tasks
                │ │ ├─ ConfirmDialog.jsx # Reusable dialog for confirmations (e.g., delete)
                │ │ └─ ThemeToggle.jsx # Switch for light/dark theme
                │ ├─ hooks/
                │ │ └─ useTasks.jsx # Custom hook for handling tasks logic (fetch, add, update)
                │ └─ services/
                │ └─ api.jsx # Axios wrapper for API calls to backend
                │
                └─ README.md # Project's readme file        

 

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

# Enjoy :grin:

