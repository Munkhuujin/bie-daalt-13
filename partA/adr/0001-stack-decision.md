# ADR-0001: Stack Selection — Node.js + Express + SQLite

## Status
Accepted

## Date
2026-05-04

## Context
Personal Task Tracker төсөл хийх stack сонгох шаардлагатай. Төсөл нь:
- Single-user, local-first
- 4 үндсэн feature: Task CRUD, Search/Filter, Labels, Due dates
- 7 хоногийн дотор хийх
- Оюутны түвшний learning project
- Windows орчинд хөгжүүлэх

## Considered Options
1. Node.js + Express + SQLite + Jest
2. Python + FastAPI + SQLite + pytest
3. Java + Spring Boot + H2 + JUnit

(Дэлгэрэнгүй харьцуулалт: STACK-COMPARISON.md)

## Decision
**Node.js + Express + SQLite (better-sqlite3) + Jest**-ийг сонгов.

## Rationale
- Setup нь Windows-д хамгийн энгийн (Node.js installer ганц алхам)
- Frontend, backend хоёрыг JavaScript нэг хэлээр бичих боломжтой
- Express minimal — жижиг төсөлд тохирно, overengineering эрсдэлгүй
- Jest нь Node.js ecosystem-ийн стандарт test framework
- npm-аас better-sqlite3, supertest зэрэг хэрэгтэй сангууд бэлэн

## Consequences

### Эерэг
- Хурдан setup, хурдан хөгжүүлэлт
- Documentation болон жишээ код элбэг
- Frontend-д JS reuse хийх боломжтой

### Сөрөг (хязгаарлалт)
- Type safety байхгүй — runtime error эрсдэлтэй
- Async error handling-д анхаарах хэрэгтэй
- Production-д Node.js нь Java/Python-аас бага scalable (энэ төсөлд хамаагүй)

### Эсрэг арга хэмжээ
- Service layer-д input validation хатуу хийх
- ≥10 unit test ашиглан coverage өндөр байлгах
- Express-ийн error middleware-ээр async error барих

## References
- partA/STACK-COMPARISON.md
- partA/ai-sessions/plan.md (AI consultation)