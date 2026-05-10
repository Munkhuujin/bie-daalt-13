# AI Session 3 — Debug Route Ordering Bug

**Огноо**: 2026-05-09
**Tool**: Claude (web)
**Зорилго**: F4 (due date views) хэрэгжүүлэх явцад route routing буруу ажилласан bug-ийг олж засах

## Bug тайлбар

F4 endpoints (`/api/tasks/views/overdue`, `/views/today`, `/views/this-week`) үүсгэсний дараа curl тест ажиллуулахад дараах алдаа гарсан:

curl http://localhost:3000/api/tasks/views/overdue
Cannot GET /api/tasks/views/overdue

Express нь endpoint-ийг олохгүй байсан.

## Шалтгаан

taskRoutes.js-ийг шалгахад route ордер буруу байсан. /:id route нь /views/overdue-ийн өмнө байсан тул Express /views/overdue-ийг id="views" гэж буруу таниж байсан.

Express нь route-уудыг дарааллаар match хийдэг. Тиймээс specific path (/views/overdue) нь generic pattern (/:id)-ийн ӨМНӨ байх ёстой.

## Зассан арга

Route-уудыг дахин эрэмбэлсэн:

1. POST /
2. GET /
3. GET /views/overdue
4. GET /views/today
5. GET /views/this-week
6. GET /:id
7. PUT /:id
8. DELETE /:id

Server restart хийсний дараа бүх 3 endpoint зөв ажиллав.

## AI-аас юу авсан, юу өөрөө хийсэн

**AI**: F4 routes-ийн анхны кодыг үүсгэхдээ ордерийн талаар анхаарал хандуулаагүй.

**Өөрөө**: curl-аас 404 алдааг олж, taskRoutes.js-ийг гараар уншиж route ордер буруу байгааг тогтоосон. Засварыг өөрөө хийсэн.

## Сургамж

1. Express route ордер чухал — specific path-ууд (/views/overdue) -г generic pattern (/:id)-ийн өмнө оруулах ёстой.
2. AI үүсгэсэн route бүтэц нь ордерийн талаар тусгай анхаарал хандуулдаггүй. Энэ нь хүний review-д барих ёстой зүйл.
3. Code review-д "GET /:id-ийн өмнө static path-ууд бий юу?" гэж шалгах хэрэгтэй.

## AI-USAGE-REPORT.md-д бичих жишээ

Энэ session нь "AI юу алгассан?" асуултын жишээ — AI route үүсгэхдээ ордерийн талаар анхааруулаагүй, өөрөө bug-ийг олж засах шаардлагатай болсон.