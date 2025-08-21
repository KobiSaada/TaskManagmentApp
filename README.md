# Task Management App <img src="https://github.com/user-attachments/assets/7c944f2b-c9df-4204-a550-3b9076b67042" alt="helfy_icon" width="40" style="vertical-align: middle; margin-left: 8px;" />


A modern full-stack **Task Management** application: **React (Vite) + Material UI** on the frontend, and **Node.js + Express + Zod** on the backend.  
Clean dashboard with **table & carousel views**, filters, stats, dialogs for create/edit, and strict server-side validation.


---

## Screenshots

<p align="center" style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
  <span style="display:inline-flex; flex-direction:column; align-items:center;">
    <img src="https://github.com/user-attachments/assets/650e2e13-dad9-4abd-b778-ca142e090a88" alt="addTask" width="290" />
    
  </span>
  <span style="display:inline-flex; flex-direction:column; align-items:center;">
    <img src="https://github.com/user-attachments/assets/529bb232-d360-482b-b7ee-da61632e45cc" alt="TaskTable" width="290" />
    
  </span>
  <span style="display:inline-flex; flex-direction:column; align-items:center;">
    <img src="https://github.com/user-attachments/assets/6b237038-92a0-4e45-b2d8-cf6e10662157" alt="TaskCarousel" width="290" />
  </span>
</p>


## Table of Contents
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Task Model](#task-model)
- [REST API](#rest-api)
- [Data Flow](#data-flow)
- [Time Spent](#time-spent)



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

### Getting Started

Follow these steps to **clone and run** the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/KobiSaada/TaskManagementApp.git
cd TaskManagementApp

# 2. Start the frontend
cd frontend
npm install
npm run dev

# 3. Start the backend (in a new terminal)
cd ../backend
npm install
npm run dev
```
---


### Folder Structure
        
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
                │ │ ├─ id.js # Utility for generating IDs 
                │ │ └─ sortAndFilter.js # Helper to sort/filter tasks
                │ └─ config/ # Optional folder for environment var
                │
                ├─ frontend/
                │ ├─ package.json
                │ ├─ package-lock.json
                │ ├─ vite.config.js # Vite configuration file
                │ ├─ index.html 
                │ └─ src/
                │ ├─ main.jsx 
                │ ├─ App.jsx 
                │ ├─ assets/
                │ │ └─ logo.jpeg # helfy logo
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
                └─ README.md      

 
## Task Model

Each task in the system follows this structure:

```json
{
  "id": "string",            // Unique identifier (UUID)
  "title": "string",        
  "description": "string",   
  "priority": "low | medium | high",  // Priority level
  "status": "pending | completed",    // Current status
  "dueDate": "ISO date string",       
  "tags": ["string"],        
  "createdAt": "ISO date string",     
  "updatedAt": "ISO date string"      
}
```

### REST API

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

- **backend/src/repositories/taskRepo.js**  
  In-memory Array “DB”, includes `seed()` with 3 demo tasks and CRUD helpers.
  
  ### Generate Random Tasks
  For testing or demo purposes, the backend includes a helper to quickly generate random tasks .

  ```
    curl -X POST http://localhost:4000/api/tasks/generate/10




### Data Flow 

1. **Dashboard / FiltersBar** triggers `useTasks.fetch(params)`.  
2. **api.jsx** performs `GET /api/tasks` with `q/status/priority`.  
3. **taskRoutes → controller → service → repository** obtain filtered list.  
4. Response arrives; **useTasks** updates state; **Dashboard** re-renders.  
5. Create/Update/Delete/Toggle follow the same path with respective HTTP verbs.

## Time Spent

        ~(20 m) — Planning: system design, contracts (API), infra choices, visual design
        ~(55 m) — Backend: Express setup, routes, models, validation (Zod), repository/service layers
        ~(45 m) — Frontend scaffold: Vite + React, MUI theme, layout & app shell
        ~(40 m) — Task CRUD integration: hooks, API client, data flow
        ~(40 m) — UI polish: table, carousel, filters, stats cards, dialogs
        ~(20 m) — Verification: cURL checks, error handling, small fixes
        ~(20 m) — README & screenshots

# Enjoy :grin:

