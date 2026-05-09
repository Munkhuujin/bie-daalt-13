---
description: OWASP Top 10 security check
---

Perform a security check on the provided code/feature using OWASP Top 10:

## A01: Broken Access Control
- Are routes protected appropriately?
- Can users access resources they shouldn't?

## A02: Cryptographic Failures
- Are secrets in environment variables (not hardcoded)?
- Is sensitive data logged?

## A03: Injection
- SQL queries use parameterized statements?
- User input passed directly to queries?
- Any use of `eval()`, `Function()`, dynamic require?

## A04: Insecure Design
- Rate limiting on expensive endpoints?
- Input length limits?

## A05: Security Misconfiguration
- Default error messages exposing stack traces?
- CORS configured correctly?

## A06: Vulnerable Components
- Are npm packages up-to-date? (`npm audit`)
- Any deprecated packages?

## A07: Identification and Authentication Failures
- N/A for this project (no auth in scope)

## A08: Software and Data Integrity Failures
- Are uploaded files validated?
- Package-lock.json committed?

## A09: Security Logging and Monitoring Failures
- Errors logged but not exposing sensitive data?

## A10: Server-Side Request Forgery (SSRF)
- Any URL fetching from user input?

## Output
List findings as Critical / Warning / Pass for each category.
For findings: file:line, issue, recommended fix.