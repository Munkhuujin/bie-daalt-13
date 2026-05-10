# Part B — Build

REST API for Personal Task Tracker. Built with Node.js + Express + SQLite.

## Prerequisites
- Node.js v18 or later
- npm

## Install
```bash
cd partB
npm install
```

## Run

### Development (auto-reload)
```bash
npm run dev
```

### Production
```bash
npm start
```

Server starts on `http://localhost:3000`. Health check: `GET /health`.

## Test
```bash
npm test
```

Runs 22 unit tests with Jest. All tests should pass.

## Project Structure
```
partB/
├── src/
│   ├── api/                 # Express routes
│   │   ├── taskRoutes.js
│   │   └── labelRoutes.js
│   ├── services/            # Business logic + validation
│   │   ├── taskService.js
│   │   └── labelService.js
│   ├── repositories/        # Data access (SQLite)
│   │   ├── taskRepository.js
│   │   └── labelRepository.js
│   ├── db/
│   │   └── database.js      # Schema + connection
│   ├── utils/
│   │   └── dateHelper.js    # Date logic for F4
│   └── server.js            # Express app entry
├── tests/
│   ├── dateHelper.test.js   # 11 tests
│   └── taskService.test.js  # 11 tests
├── ai-sessions/             # AI workflow logs
├── jest.config.js
├── openapi.yaml             # OpenAPI 3.0 spec
└── package.json
```

## Features

| ID | Feature | Endpoints |
|---|---|---|
| F1 | Task CRUD | `POST/GET/PUT/DELETE /api/tasks` |
| F2 | Search & Filter | `GET /api/tasks?search=&status=&priority=...` |
| F3 | Label Management | `POST/GET/DELETE /api/labels`, `POST /api/labels/tasks/:taskId/labels/:labelId` |
| F4 | Due Date Views | `GET /api/tasks/views/{overdue,today,this-week}` |

## Quick API Examples

### Create a task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Buy groceries\",\"priority\":\"high\"}"
```

### Filter tasks
```bash
curl "http://localhost:3000/api/tasks?priority=high&status=todo"
```

### Create a label and attach to task
```bash
curl -X POST http://localhost:3000/api/labels \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"work\",\"color\":\"#ff0000\"}"

curl -X POST http://localhost:3000/api/labels/tasks/1/labels/1
```

### Get overdue tasks
```bash
curl http://localhost:3000/api/tasks/views/overdue
```

## Architecture

Three-layer architecture:
- **API Layer** — HTTP handling, validation
- **Service Layer** — Business logic, typed errors (ValidationError, NotFoundError)
- **Repository Layer** — SQLite access only

See `partA/ARCHITECTURE.md` for diagrams.

## Database
SQLite file (`tasks.db`) auto-created on first run.
Schema: `tasks`, `labels`, `task_labels` (many-to-many).

## Notes
- Built as part of Assignment 13 (F.CSM311)
- All AI usage declared in commits and `partC/AI-USAGE-REPORT.md`