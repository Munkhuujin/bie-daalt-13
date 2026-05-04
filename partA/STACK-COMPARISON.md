# Stack Comparison — Personal Task Tracker

## Зорилго
Энэхүү бие даалтын хүрээнд (Task CRUD, хайлт, шошго болон хугацааны логик) хамгийн үр дүнтэй, хурдан хөгжүүлэлт хийх боломжтой технологийн хослолыг сонгохын тулд дараах 3 сонголтыг харьцуулав. Миний хувьд зөвхөн "код бичих" биш, архитектурын хувьд зөв шийдвэр гаргах нь чухал.

## Шалгуурууд
1. Learning curve: Хоёр долоо хоногт амжихын тулд хэтэрхий шинэ эсвэл хүнд хэл сурахад цаг үрэхгүй байх.
2. Setup complexity: Windows орчинд тохиргоо хийхэд хүндрэл багатай байх.
3. Development Speed: REST API-г аль болох бага "boilerplate" кодоор хурдан босгох.
4. Testing: Тест бичихэд хялбар, ойлгомжтой сангуудтай байх.
5. Community Support: Алдаа гарахад StackOverflow эсвэл AI-аас тусламж авахад хангалттай их нөөцтэй байх.
6. Project fit: Жижиг хэмжээний системд "overengineering" хийхгүй байх.

## Stack 1: Node.js + Express + SQLite + Jest

### Давуу тал
- Setup: Маш хурдан. npm init хийгээд л үндсэн ажил эхэлнэ.
- JavaScript дангаар нь ашиглан backend ба frontend хийх боломжтой
- npm ecosystem дэлгэрэнгүй (better-sqlite3, jest, supertest г.м.)
- Express нь minimal — сурах routing, middleware patterns хялбар
- Jest нь Node.js-д хамгийн өргөн ашиглагддаг test framework

### Cons
- Type safety байхгүй (TypeScript нэмэх боломжтой ч setup нэмнэ)
- Async error handling эхлэгчдэд төөрөгдөл үүсгэж болно
- Callback hell-ийн эрсдэл (хуучин код жишээнд)

### Ашиглах tooling
- `nodemon` — auto-reload
- `eslint` — linting
- `supertest` — API integration test
- `dotenv` — environment variables

---

## Stack 2: Python + FastAPI + SQLite + pytest

### Pros
- Python syntax хамгийн ойлгомжтой (readability)
- FastAPI нь automatic OpenAPI documentation үүсгэдэг
- pytest нь хүчирхэг, fixture-тай
- Type hints нь optional ч доступ
- Pydantic validation нь built-in

### Cons
- Windows-д Python virtual environment setup нэмэлт алхам
- Async syntax (async/await) FastAPI-д заавал
- Эхлэгчдэд venv, pip, requirements.txt бүгдийг ойлгох ачаалал
- Frontend хийхэд Python ашиглагдахгүй (хоёр хэлтэй)

### Ашиглах tooling
- `uvicorn` — ASGI server
- `pytest-asyncio` — async тест
- `httpx` — API тест
- `python-dotenv` — environment

---

## Stack 3: Java + Spring Boot + H2 + JUnit

### Pros
- Enterprise-grade, production-ready
- Spring ecosystem нь маш баялаг
- Strong type safety, compile-time check
- IntelliJ IDEA-д хамгийн сайн tooling
- JUnit нь Java-н стандарт тест framework

### Cons
- Хамгийн их boilerplate (annotations, getters/setters, configuration)
- Build хурд удаан (Gradle/Maven)
- Жижиг төсөлд хэт нүсэр (overengineered)
- Эхлэгчид Spring's "magic" (DI, @Autowired) ойлгоход хэцүү
- JVM startup time удаан (development cycle уртасна)

### Ашиглах tooling
- Spring Boot DevTools — auto-reload
- Maven/Gradle — build tool
- Mockito — mocking framework
- H2 — in-memory database

---

## Харьцуулах хүснэгт

| Шалгуур | Node.js + Express | Python + FastAPI | Java + Spring Boot |
|---|---|---|---|
| Learning curve | 🟢 Хялбар | 🟢 Хялбар | 🔴 Хүнд |
| Setup (Windows) | 🟢 `npm init` | 🟡 venv нэмэлт | 🟡 JDK + Maven |
| API хөгжүүлэх хурд | 🟢 Хурдан | 🟢 Хурдан | 🔴 Удаан |
| Testing ecosystem | 🟢 Jest хүчтэй | 🟢 pytest хүчтэй | 🟢 JUnit стандарт |
| Документ | 🟢 Маш баялаг | 🟢 Сайн | 🟢 Сайн |
| Жижиг төсөлд тохирох эсэх | 🟢 Тийм | 🟢 Тийм | 🔴 Хэт нүсэр |
| Boilerplate хэмжээ | 🟢 Бага | 🟢 Бага | 🔴 Их |

---

## Сонгосон шийдвэр: **Node.js + Express + SQLite + Jest**

### Гол шалтгаан
1. **Learning curve хамгийн хялбар** — оюутны түвшинд эхлэхэд тохиромжтой. 
   JavaScript-ийг web хөгжүүлэлтийн хувьд бид аль хэдийн ашигладаг.

2. **Setup нь Windows-д хамгийн энгийн** — Node.js installer татаж 
   суулгахад `npm` шууд ажиллана. Python venv эсвэл Java JDK setup-ээс 
   хялбар.

3. **Frontend, backend нэг хэлтэй** — minimal frontend бичихэд JS-ийг 
   ашиглаж нэмэлт хэл сурах хэрэггүй.

4. **Жижиг төсөлд яг тохирно** — Express нь minimal, overengineering 
   эрсдэлгүй.

### Эрсдэл ба эсрэг хариу арга
- **Эрсдэл**: Type safety байхгүйгээс runtime error гарч магад
  - **Хариу арга**: Input validation-ыг service layer-д хатуу хийх. 
    Тестийн coverage-ыг өндөр байлгах (≥10 unit test).
- **Эрсдэл**: Async error handling алдагдах
  - **Хариу арга**: Бүх async function-д try/catch wrapper ашиглах. 
    Express-ийн error middleware ашиглах.

### Бусад сонголтуудыг яагаад хасав
- **Python + FastAPI**: Хүчтэй сонголт ч, frontend хийхэд хоёр хэл 
  ашиглах хэрэгтэй болно. Энэ төсөлд ашиг тус багатай.
- **Java + Spring Boot**: 3-5 feature-тэй жижиг төсөлд хэт нүсэр. 
  Boilerplate хэмжээ их, build хурд удаан, learning curve хамгийн өндөр.

---

## Эх сурвалж
- AI-тай харьцуулалт хийсэн session: `partA/ai-sessions/plan.md`
- Эцсийн шийдвэрийн ADR: `partA/adr/0001-stack-decision.md`