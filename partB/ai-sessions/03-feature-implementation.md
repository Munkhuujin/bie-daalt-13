# AI Session 4 — F2 Search/Filter Implementation

**Огноо**: 2026-05-09
**Tool**: Claude (web)
**Зорилго**: F2 Search/Filter feature-г хэрэгжүүлэх (query parameters)

## Asked AI

"Personal task tracker-ийн F2 feature-г хэрэгжүүлмээр байна. 
GET /api/tasks-д query parameters: search, status, priority, due_before, 
due_after, sort_by, sort_order. taskRepository.findAll-ийг шинэчил."

## AI үүсгэсэн зүйл

`findAll(filters = {})` метод — dynamic SQL builder. Бүх filter-уудыг 
WHERE clause-д нэмж, ORDER BY-аар sort.

## Hallucination/security илрүүлэлт

### Анхны AI хариу — security risk
AI-н санал болгосон код:

```javascript
const sortBy = filters.sort_by || 'created_at';
const sortOrder = filters.sort_order === 'asc' ? 'ASC' : 'DESC';
query += ` ORDER BY ${sortBy} ${sortOrder}`;
```

**Асуудал**: `sortBy` нь хэрэглэгчийн query string-аас шууд орж 
ирдэг. Хэрэв хэрэглэгч `?sort_by=title; DROP TABLE tasks; --` гэж 
оруулбал — **SQL injection**.

### Зассан хувилбар (өөрөө)

```javascript
const sortBy = filters.sort_by || 'created_at';
const allowedSorts = ['created_at', 'due_date', 'priority', 'title'];
const safeSortBy = allowedSorts.includes(sortBy) ? sortBy : 'created_at';
query += ` ORDER BY ${safeSortBy} ${sortOrder}`;
```

Whitelist арга — allowedSorts массивт байгаа column-ийг л зөвшөөрнө.

### Яагаад AI энэ алдааг хийсэн вэ
- Parameterized queries (`?` placeholders) нь VALUE-уудад хэрэглэгддэг
- COLUMN NAME-уудад placeholder ашиглах боломжгүй (SQL syntax)
- Тиймээс dynamic ORDER BY бүтээхдээ whitelist шаардлагатай
- AI энэ ялгааг үргэлж тооцдоггүй

## Сургамж

1. **AI-н SQL код-ыг security өнцгөөс үргэлж шалгах**
2. **Dynamic SQL components (column names, table names)** нь 
   parameterization-аар хамгаалагдахгүй — whitelist хэрэгтэй
3. Энэ нь AI Usage Report-д "security risk found" жишээ болно