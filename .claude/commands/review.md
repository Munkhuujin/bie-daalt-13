---
description: Security and robustness review of code
---

Review the code I'll provide using these criteria:

## 1. OWASP Top 10
- SQL injection (parameterized queries used?)
- XSS (input sanitization for any HTML output?)
- Broken access control
- Security misconfiguration
- Sensitive data exposure (logs, error messages, stack traces)

## 2. Robustness
- Input validation at service layer
- Error handling: try/catch wraps all async operations
- Edge cases: null, empty string, negative numbers, unicode, very long strings
- Resource cleanup (DB connections, file handles)

## 3. Code Quality
- Single responsibility per function
- No business logic in route handlers
- No SQL outside repository layer
- Consistent error types (ValidationError, NotFoundError)
- Named constants instead of magic numbers/strings

## Output format
- **Critical**: must fix (security, data corruption risks)
- **Warning**: should fix (robustness, maintainability)
- **Suggestion**: nice to have (style, minor improvements)

For each issue: file:line, problem, suggested fix.