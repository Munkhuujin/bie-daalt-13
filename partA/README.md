# Part A — Plan

This folder contains the planning documents for the Personal Task Tracker.
All decisions made BEFORE writing any code.

## Files

- **PROJECT.md** — Project brief: scope, user stories, success criteria
- **ARCHITECTURE.md** — System architecture with Mermaid diagrams
- **STACK-COMPARISON.md** — 3 stacks compared (Node.js, Python, Java)
- **adr/0001-stack-decision.md** — Final stack decision (Node.js + Express)
- **ai-sessions/plan.md** — Summary of AI consultation during planning

## Reading Order

1. Start with `PROJECT.md` — what are we building?
2. Read `STACK-COMPARISON.md` — what tools were considered?
3. Read `adr/0001-stack-decision.md` — why Node.js + Express?
4. Read `ARCHITECTURE.md` — how is it structured?
5. (Optional) `ai-sessions/plan.md` — how AI assisted planning

## Key Outcomes

- **Project**: Personal Task Tracker (single-user, local-first)
- **Stack**: Node.js + Express + SQLite + Jest
- **Scope**: 4 features (CRUD, Search/Filter, Labels, Due dates)
- **Out of scope**: auth, multi-user, deployment

## Next Steps

After Part A, the build proceeds in `partB/` with implementation,
followed by reflection in `partC/`.