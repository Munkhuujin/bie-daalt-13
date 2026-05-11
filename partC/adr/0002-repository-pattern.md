# ADR-0002: Use Repository Pattern for Data Access

## Status
Accepted

## Date
2026-05-09

## Context

Personal Task Tracker-ийн backend нь Express дээр REST API хийдэг бөгөөд 
SQLite-аас өгөгдөл унших, бичих хэрэгтэй. Эхэндээ дараах 3 өөр approach 
авч үзсэн:

1. **Route-д шууд SQL бичих** — Хамгийн хялбар, гэхдээ business logic 
   ба data access хольцолддог
2. **Active Record pattern** — Model object нь өөрөө DB-тэй ярьдаг
3. **Repository pattern** — Data access нь тусдаа layer, service-ээс 
   тусгаарлагдсан

Тестийн үед mock хийх боломж, code-ийн цэвэр байдал, цаашид схем 
өөрчлөгдөх боломжийг тооцох шаардлагатай байсан.

## Considered Options

### Option 1: Route-д шууд SQL

**Pros**:
- Хамгийн бага код
- Шууд ойлгомжтой ("эндээс SQL ажиллаж байна")

**Cons**:
- Service-ийг тестлэх үед бодит DB хэрэгтэй болно
- SQL хаа сайгүй давтагдана
- Route нь HTTP + business logic + DB query гурвыг хариуцна
- Refactoring хүнд

### Option 2: Active Record

**Pros**:
- ORM-тай ижил pattern
- Model object нь өөртөө CRUD-тэй

**Cons**:
- SQLite-д ORM (Sequelize, TypeORM) дэмжлэг сул
- Энэ jижиг project-д хэт нүсэр
- Business logic Model-д орох эрсдэлтэй

### Option 3: Repository Pattern

**Pros**:
- Data access нь зөвхөн нэг газар (`repositories/`)
- Service-ийг unit test хийхэд repository-г mock хийнэ
- SQL хаа сайгүй давтагдахгүй
- Layer тус бүр нэг responsibility-тай (clean architecture)

**Cons**:
- Илүү файл, илүү layer
- Эхлэгчдэд хэт abstract санагдаж магад

## AI Consultation

AI-аас "энэ түвшний жижиг project-д repository pattern overengineering 
биш гэж үү?" гэж асуусан. AI-ийн хариу:

> "Project хэмжээнээс илүү учир шалтгаан нь testability болон 
> single responsibility. Repository pattern нь жижиг project-д ч гэсэн 
> service layer-ийг mock-той тестлэх боломжийг өгнө. Active Record нь 
> SQLite-д сайн ажиллах ORM хэрэгтэй болно."

AI давуу талыг сайн тайлбарласан ч "overengineering эрсдэл бий" гэдгийг 
бас хүлээн зөвшөөрсөн.

## Decision

**Repository Pattern**-ийг сонгов.

Бүх SQL query нь `partB/src/repositories/`-д л байх. Service layer нь 
зөвхөн business logic, validation хийнэ. Route нь зөвхөн HTTP-ийг 
хариуцна.
API → Service → Repository → SQLite

## Rationale

1. **Testability нь хамгийн чухал шалтгаан** — Service layer-ийг 
   `jest.mock('../repositories/taskRepository')` ашиглан mock хийж 
   тестлэх боломжтой болсон. Бодит DB-гүйгээр 22 unit test ажилласан.

2. **SRP (Single Responsibility Principle)** — Layer бүр зөвхөн нэг 
   зүйл хариуцна. Bug гарвал хаана засах нь тодорхой.

3. **Refactor хялбар** — Цаашид SQLite-аас PostgreSQL руу шилжих гэвэл 
   зөвхөн repository layer өөрчлөгдөнө. Service ба route хөдлөхгүй.

4. **SQL injection хамгаалалт төвлөрсөн** — Sort_by whitelist гэх мэт 
   хамгаалалт зөвхөн нэг газар (repository) хэрэгжсэн.

## Consequences

### Эерэг
- Тест бичих хялбар (mock pattern илэрхий)
- Code reading хялбар (хаана юу байгаа нь тодорхой)
- SQL injection хамгаалалт төвлөрсөн

### Сөрөг
- Файлын тоо илүү (`repositories/` folder нэмэгдсэн)
- Жижиг feature-д хэт олон layer туулах (route → service → repository)
- Эхлэгч уншигчид зэрэг хэт abstract санагдаж магад

### Эсрэг арга хэмжээ
- README.md-д architecture-ийг тайлбарласан
- ARCHITECTURE.md-д layer бүрийн responsibility-ийг тодорхой 
  бичсэн

## References
- `partB/src/repositories/taskRepository.js`
- `partB/src/services/taskService.js` (mock usage)
- `partB/tests/taskService.test.js` (тестийн жишээ)
- `partA/ARCHITECTURE.md`