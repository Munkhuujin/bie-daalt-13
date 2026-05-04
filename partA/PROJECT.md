# Personal Task Tracker — Project Brief

## Зорилго
Хувийн даалгавруудаа удирдах энгийн REST API систем. Хэрэглэгч task 
үүсгэх, эрэмбэлэх, хайх, label-ээр ангилах боломжтой single-user 
local-first систем.

## Сурах зорилго
- AI-тай хамтран ажиллах workflow эзэмших (Spec → Generate → Review → Integrate)
- REST API design (Express, RESTful conventions)
- Database layer-тэй ажиллах (SQLite, repository pattern)
- Testing pyramid-ийг практикт хэрэгжүүлэх
- ADR-аар архитектурын шийдвэрийг тэмдэглэх

## User Stories
- **US1**: Хэрэглэгч task үүсгээд priority, due date, label оноох
- **US2**: Хэрэглэгч өнөөдөр хийх ёстой task-уудаа filter хийх
- **US3**: Хэрэглэгч хуучин task-аа title, label-ээр хайх
- **US4**: Хэрэглэгч өөрийн label-уудыг (work, personal) удирдах

## In Scope (4 feature)
1. **F1: Task CRUD**
   - Create: title (заавал), description, due_date, priority, labels[]
   - Read: жагсаалт, нэг task, filter
   - Update: бүх field, status (todo/in_progress/done)
   - Delete: hard delete

2. **F2: Search & Filter**
   - Title/description-ээр текст хайлт
   - Status, priority, label, due_date range filter
   - Sort: created_at, due_date

3. **F3: Label Management**
   - Label CRUD (нэр, өнгө)
   - Task-д олон label оноох (many-to-many)

4. **F4: Due Date Logic**
   - Overdue task илрүүлэх
   - "Today", "This week" группд хуваах

## Out of Scope
-  Authentication, multi-user
-  Real-time collaboration
-  Cloud sync, mobile app
-  Email/push reminder
-  Recurring task
-  Production deployment

## Success Criteria
- 4 feature ажиллана (manual test)
- ≥10 unit test pass
- API REST conventions дагасан
- OpenAPI 3.0 spec-тэй
- ADR-002 шийдвэр баримтжуулсан