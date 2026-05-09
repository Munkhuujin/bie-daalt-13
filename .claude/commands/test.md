---
description: Generate edge-case unit tests with Jest
---

Generate Jest unit tests for the code I'll provide. Follow these rules:

## Structure
- Use `describe` blocks for grouping
- Each test: arrange / act / assert
- Test names describe behavior: `it('should reject empty title')`
- Mock dependencies (repository when testing service)

## Coverage requirements
For each function, generate at minimum:
1. **Happy path** — valid input, expected output
2. **Validation failure** — invalid input throws appropriate error
3. **Edge case** — null, empty, boundary values
4. **Not found** — for ID-based operations

## Specific patterns
- For services: mock the repository with `jest.mock(...)`
- For repositories: use a separate test database
- Assert error TYPE, not just message: `expect(() => ...).toThrow(ValidationError)`
- Use `beforeEach` to reset mocks/database

## What NOT to do
- Don't test implementation details (private methods)
- Don't write tests that depend on each other's order
- Don't use `console.log` in tests
- Don't skip error cases ("happy path only")