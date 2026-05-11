# Self-Evaluation

## 1. Хэрэв шалгалт өнөөдөр болбол би энэ кодыг өөрөө бичиж чадах уу?

**Хариу: Хэсэгчлэн.**

### Тийм — өөрөө бичиж чадна:
- Express server setup ба route patterns (POST, GET, PUT, DELETE)
- SQLite-ийн үндсэн query (SELECT, INSERT, UPDATE, DELETE)
- Service layer-д validation хийх (try/catch, throw error)
- Jest test-ийн arrange/act/assert бүтэц
- Conventional Commits format

### Хэсэгчлэн — тусламжтай бичнэ:
- Repository pattern-ийн нарийн төвөгтэй query (dynamic filter SQL)
- Jest mock setup (`jest.mock()`, `jest.fn()`)
- Mermaid diagram syntax
- OpenAPI YAML formatting

### Үгүй — одоогоор бие даан чадахгүй:
- Many-to-many table-ийн SQL JOIN query
- SQL injection-аас хамгаалах whitelist техник (өөрөө мэдээгүй ч AI санал болгосон)
- Date logic (week boundary calculation)

### Шалтгаан
Бүх кодыг өөрөө бичээгүй. AI scaffolding гаргасны дараа уншиж, ойлгож,
edge case нэмж засах байдлаар оролцсон. Code-ын architecture-г ойлгодог
ч syntax detail (Jest mock API, Express router patterns)-ийг
хайлгүйгээр бичиж чадахгүй.

## 2. Дахин хийнэ гэвэл юуг өөрөөр хийх вэ?

1. **Эртхэн эхэлнэ** — Бид setup-ийг 5/02-д хийсэн ч 5/04-нөөс 5/09 хүртэл
   5 өдөр алгассан. Хэрэв тогтмол өдөр бүр 1-2 commit хийсэн бол rush-гүй
   тэнцвэртэй ажил болох байсан.

2. **Spec-ийг илүү дэлгэрэнгүй бичнэ** — Feature тус бүрд AI-аас кодыг
   гуйхын өмнө input/output/edge case-ийг бичих ёстой байсан. Энэ
   зэрэглэлгүй ажилласан тул AI зарим edge case-ийг алгассан.

3. **Тест эхэнд бичнэ (TDD)** — Тестийг бүх feature дууссны дараа бичсэн.
   Хэрэв TDD аргаар хандсан бол code design илүү цэвэр болох байсан.

4. **AI session log-ыг ажил явсаар бичих** — Сүүлд санах гэж оролдох
   биш, chat дуусмагц шууд тэмдэглэх. Зарим detail алдагдсан.

5. **Hallucination/security жишээг идэвхтэй хайх** — AI-ийн санал бүрд
   "энэ нь үнэн үү?" гэж бодох. SQL injection (sort_by) -г санамсаргүй
   олсон — илүү идэвхтэй хайх ёстой байсан.

## 3. Энэ туршлагаас юу сурсан бэ?

### AI-тай ажиллах workflow-н тухай
AI бол "юу бичих" биш, "юу бодох"-ыг тусалдаг хэрэгсэл. Хүн spec бичих,
review хийх, edge case олох — энэ ажил үлдэнэ. AI-аар бүгдийг хийлгэх
гэвэл ойлголтгүй код гарна.

### "Verify, don't trust" зарчмын утга
AI санал болгосон бүх зүйл шууд хүлээн авч болохгүй. Жишээ нь sort_by
SQL injection — AI санал болгосон код нь ажиллах ч аюулгүй биш байсан.
Хүний review энд чухал.

### Документын ач холбогдол
ADR, CLAUDE.md, ARCHITECTURE.md — эдгээр нь "бичээд орхих" документ
биш, кодын чанарт нөлөөлдөг үндэс. Сайн CLAUDE.md байсан тул AI нь
project conventions-ийг тогтмол дагасан.

### Git history-н чухал
Хэт олон commit богино хугацаанд хийх нь "rush" харагдана. Тэнцвэртэй
ажил, өдөр бүр жижиг commit хийх нь professional practice.

### Skill atrophy эрсдэлийн тухай
AI-аар бүх syntax detail-ыг хийлгэвэл өөрөө мартдаг. Энэ assignment-ын
turbo онцлог — шалгалт AI-гүй болохыг мэдэх — миний мэддэг хэсэг ба
мэддэггүй хэсэг хоорондын ялгааг тодорхой харсан. Цаашид өөрөө бичих
дадлага илүү хэрэгтэй гэдгийг ойлгосон.