# Architecture — Personal Task Tracker

## High-Level Diagram

```mermaid
graph TB
    Client[Client<br/>curl / Browser]
    
    subgraph Application["Express Application"]
        API[API Layer<br/>Routes / Controllers]
        Service[Service Layer<br/>Business Logic + Validation]
        Repo[Repository Layer<br/>Data Access]
    end
    
    DB[(SQLite Database<br/>tasks.db)]
    
    Client -->|HTTP requests| API
    API -->|validated input| Service
    Service -->|CRUD operations| Repo
    Repo -->|SQL queries| DB
    
    DB -.->|results| Repo
    Repo -.->|domain objects| Service
    Service -.->|response data / errors| API
    API -.->|JSON| Client
```

## Layer Responsibilities

| Layer | Responsibility | Files |
|---|---|---|
| API | HTTP handling, request validation, response formatting | `src/api/taskRoutes.js`, `src/api/labelRoutes.js` |
| Service | Business logic, validation rules, error types | `src/services/taskService.js`, `src/services/labelService.js` |
| Repository | Database access, SQL queries | `src/repositories/taskRepository.js`, `src/repositories/labelRepository.js` |
| Database | Schema, persistence | `src/db/database.js`, `tasks.db` |
| Utils | Date helpers, common utilities | `src/utils/dateHelper.js` |

## Key Design Decisions

1. **Repository pattern** — separates SQL from business logic. Makes service layer testable with mocked repository.
2. **Typed errors** (`ValidationError`, `NotFoundError`) — let API layer map errors to HTTP codes consistently.
3. **No business logic in routes** — routes only handle HTTP concerns; logic lives in services.
4. **Parameterized queries** — all SQL uses `?` placeholders to prevent SQL injection.
5. **Sort whitelist** — even though `ORDER BY` is dynamic, allowed columns are whitelisted to prevent injection.

## Data Flow Example: Create Task

```mermaid
sequenceDiagram
    participant C as Client
    participant R as taskRoutes
    participant S as taskService
    participant Rep as taskRepository
    participant DB as SQLite
    
    C->>R: POST /api/tasks {title, priority}
    R->>S: createTask(data)
    S->>S: Validate title, priority, status
    S->>Rep: create(task)
    Rep->>DB: INSERT INTO tasks ...
    DB-->>Rep: lastInsertRowid
    Rep->>DB: SELECT * FROM tasks WHERE id = ?
    DB-->>Rep: task row
    Rep-->>S: Task object
    S-->>R: Task
    R-->>C: 201 Created + JSON
```

## Data Model

```mermaid
erDiagram
    TASK ||--o{ TASK_LABEL : has
    LABEL ||--o{ TASK_LABEL : has
    
    TASK {
        int id PK
        string title
        string description
        string status "todo|in_progress|done"
        string priority "low|medium|high"
        string due_date
        string created_at
        string updated_at
    }
    LABEL {
        int id PK
        string name UK
        string color
    }
    TASK_LABEL {
        int task_id FK
        int label_id FK
    }
```

## API Endpoint Map

| Method | Path | Feature | Description |
|---|---|---|---|
| GET | /health | - | Health check |
| POST | /api/tasks | F1 | Create task |
| GET | /api/tasks | F1, F2 | List with optional filters |
| GET | /api/tasks/:id | F1 | Get one task |
| PUT | /api/tasks/:id | F1 | Update task |
| DELETE | /api/tasks/:id | F1 | Delete task |
| GET | /api/tasks/views/overdue | F4 | Overdue tasks |
| GET | /api/tasks/views/today | F4 | Today's tasks |
| GET | /api/tasks/views/this-week | F4 | This week's tasks |
| POST | /api/labels | F3 | Create label |
| GET | /api/labels | F3 | List labels |
| GET | /api/labels/:id | F3 | Get one label |
| DELETE | /api/labels/:id | F3 | Delete label |
| POST | /api/labels/tasks/:taskId/labels/:labelId | F3 | Attach label to task |
| DELETE | /api/labels/tasks/:taskId/labels/:labelId | F3 | Detach label |
| GET | /api/labels/tasks/:taskId/labels | F3 | Get task's labels |

## Error Handling Strategy

```
Service throws → Route catches → Maps to HTTP status

ValidationError  →  400 Bad Request
NotFoundError    →  404 Not Found
(other Error)    →  500 Internal Server Error
```

Each route uses try/catch and checks error type with `instanceof`.