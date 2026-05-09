---
description: Generate Conventional Commits message
---

Generate a Conventional Commits message based on the staged changes.

## Format

```
<type>(<scope>): <subject>

<body — what changed and why>

<footer — Co-Authored-By if AI assisted>
```

## Type
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `test` — adding tests
- `refactor` — code change without feature/fix
- `chore` — build, deps, tooling
- `perf` — performance improvement

## Scope
For this project: `task`, `label`, `search`, `due-date`, `setup`, 
`planning`, `adr`, `test`, `docs`

## Rules
- Subject ≤ 72 characters
- Subject in imperative mood ("add" not "added")
- Body explains WHY, not WHAT (diff shows what)
- If AI assisted: declare specifically what AI did vs what I did
- Always include `Co-Authored-By: Claude <noreply@anthropic.com>` if AI used

## Example

```
feat(task): implement F1 Task CRUD with validation

Add SQLite schema, taskRepository, taskService with typed errors,
and Express routes. Validation rejects empty titles and invalid
priority/status values.

AI generated initial route boilerplate. I added validation logic
and error handling, manually tested all 5 endpoints with curl.

Co-Authored-By: Claude <noreply@anthropic.com>
```