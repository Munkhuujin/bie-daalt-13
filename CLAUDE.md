# CLAUDE.md — Personal Task Tracker

## Project Overview
Personal Task Tracker — single-user, local-first task management system.
Features: Task CRUD, Search/Filter, Label management, Due date logic.

## Tech Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Test framework**: Jest
- **Frontend**: Vanilla HTML/CSS/JS

## Build & Run Commands
```bash
npm install        # Install dependencies
npm run dev        # Run dev server with auto-reload
npm start          # Run production server
npm test           # Run all tests
npm run lint       # Lint code
```

## Project Structure
​```
partB/
├── src/
│   ├── api/          # Express routes
│   ├── services/     # Business logic
│   ├── repositories/ # Data access
│   ├── models/       # Type definitions
│   └── server.js     # Entry point
├── tests/
└── public/           # Static frontend
​```

## Coding Conventions
- File naming: `camelCase.js`
- Function naming: verb-first (`createTask`)
- Functions ≤30 lines preferred
- Use `async/await`, not raw promises
- No business logic in route handlers
- No SQL outside repository layer

## Testing Conventions
- Use Jest, arrange/act/assert structure
- Test names describe behavior
- Mock repository when testing services
- ≥10 unit tests total

## Workflow (Spec → Generate → Review → Integrate)
1. Human writes spec (input/output/edge cases)
2. AI generates code
3. Human reviews with `/review`
4. Tests written and reviewed manually
5. Commit with Conventional Commits + Co-Authored-By

## No-Go Zones
- ❌ No authentication/multi-user features
- ❌ No hardcoded secrets
- ❌ No `eval()` or dynamic code execution
- ❌ No Docker/cloud deployment config
- ❌ No unverified npm packages
- ❌ No DB queries in route handlers
- ❌ No "done" without tests

## Slash Commands
- `/review` — security and robustness review
- `/test` — generate edge-case tests
- `/security` — OWASP Top 10 check
- `/commit` — Conventional Commits message

## Reference Files
- `partA/PROJECT.md` — scope and user stories
- `partA/ARCHITECTURE.md` — system design
- `partA/adr/0001-stack-decision.md` — stack rationale

## Honesty Rules
- If uncertain, ASK before coding
- If unsure a library exists, say so
- Never produce code without testable behavior