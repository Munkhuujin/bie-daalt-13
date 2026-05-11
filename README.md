# Бие даалт 13 — Personal Task Tracker

AI-Assisted Software Construction (F.CSM311, Лекц 13) бие даалт.

## Төслийн товч

Personal Task Tracker нь Node.js + Express + SQLite дээр бүтсэн single-user REST API. Task CRUD, search/filter, label management, due date views зэрэг 4 үндсэн feature-тэй.

Энэ төсөл нь зөвхөн REST API биш — **AI-тай хамтран ажиллах workflow**-г бодит ажил дээр эзэмших туршлага. Spec → Generate → Review → Integrate зарчмыг практикт хэрэгжүүлсэн.

## Repository бүтэц

```
bie-daalt-13/
├── CLAUDE.md              # AI-д өгөх төслийн заавар
├── .claude/commands/      # 4 custom slash commands
├── partA/                 # Plan — scope, architecture, ADR-001
├── partB/                 # Build — src, tests, OpenAPI
└── partC/                 # Reflect — AI Usage Report, ADR-002, Self-eval
```

## Хэсэг бүрийн тойм

### А — Plan
- `partA/PROJECT.md` — Scope, user stories, success criteria
- `partA/ARCHITECTURE.md` — Mermaid diagram, layer responsibilities
- `partA/STACK-COMPARISON.md` — Node.js vs Python vs Java
- `partA/adr/0001-stack-decision.md` — Node.js сонголтын ADR
- `partA/ai-sessions/plan.md` — Planning session log

### Б — Build
- `partB/src/` — Express + SQLite REST API (4 feature ажиллана)
- `partB/tests/` — 22 Jest unit test (бүгд PASS)
- `partB/openapi.yaml` — OpenAPI 3.0 spec (16 endpoint)
- `partB/ai-sessions/` — 3 AI session log (test gen, debug, feature impl)

### В — Reflect
- `partC/AI-USAGE-REPORT.md` — 6 асуултанд хариулсан тайлан (≥1500 үг)
- `partC/adr/0002-repository-pattern.md` — Repository pattern сонголт
- `partC/SELF-EVALUATION.md` — Шударга self-evaluation

## Build & Run

```bash
cd partB
npm install
npm run dev        # Server on http://localhost:3000
npm test           # Run 22 unit tests
```

Дэлгэрэнгүй: `partB/README.md`-г уншина уу.

## Features ажиллаж байгаа эсэх

| Feature | Endpoints | Status |
|---|---|---|
| F1: Task CRUD | POST/GET/PUT/DELETE /api/tasks | ✅ |
| F2: Search & Filter | GET /api/tasks?search=&priority=... | ✅ |
| F3: Label Management | /api/labels + many-to-many | ✅ |
| F4: Due Date Views | /api/tasks/views/{overdue,today,this-week} | ✅ |

## AI ашиглалт

Энэ төсөл нь AI (Claude, Cursor) ашиглан хийгдсэн. Бүх AI ашиглалтыг:
- Commit message-д `Co-Authored-By: Claude` tag-аар зарласан
- `partC/AI-USAGE-REPORT.md`-д дэлгэрэнгүй баримтжуулсан
- AI session-уудыг `partA/ai-sessions/` ба `partB/ai-sessions/`-д товчлон хадгалсан

## Git workflow

- 21+ commit, 5 өөр өдөр
- Conventional Commits format (feat, fix, docs, test, chore)
- Хугацааны хуваарь: 5/02 setup → 5/04 planning → 5/09 build → 5/10 tests/docs → 5/11 reflect