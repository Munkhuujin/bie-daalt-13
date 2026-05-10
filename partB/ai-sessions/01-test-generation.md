# AI Session 2 — Unit Test Generation

## AI-аар хийсэн зүйл
- 22 тестийн scaffolding
- describe/it блокууд
- Mock setup (jest.mock)
- Happy path test cases

## Өөрөө хийсэн review (verify, don't trust)

### Review 1: Whitespace-only title case дутуу байсан

AI зөвхөн empty string ('') нөхцөлийг тестэлсэн байсан. Гэхдээ taskService дотор data.title.trim() === '' гэсэн шалгалт ашиглаж байсан учраас зөвхөн хоосон string биш, зөвхөн зайнаас бүрдсэн title (' ') мөн reject болох ёстой байсан.

taskService.js-ийг уншиж шалгах үед .trim() ашигласан байгааг анзаарсан тул энэ edge case тестлэгдээгүй байна гэж үзсэн.

Тиймээс:
should throw ValidationError for whitespace-only title
гэсэн тестийг нэмсэн.

### Review 2: null болон хоосон due_date-ийн тест нэмсэн

AI-ийн үүсгэсэн isOverdue() тестүүд бүгд valid date ашигласан байсан. Харин бодит хэрэглээнд due_date нь optional тул null эсвэл хоосон string ирэх боломжтой.

dateHelper.js дотор:

if (!dueDate) return false гэсэн guard condition байсан ч үүнийг шалгасан тест байгаагүй.

Кодыг review хийх явцад энэ нөхцөл coverage-оос үлдсэн байгааг анзаарсан тул:

null due_date
empty string due_date

гэсэн нэмэлт тестүүдийг бичсэн.

### Review 3: NotFoundError scenario дутуу байсан

AI нь task олдсон үед ажиллах үндсэн success case-ийг тестэлсэн байсан. Харин task олдохгүй үед ямар алдаа шидэгдэхийг шалгасан test байхгүй байсан.

Error path-уудыг мөн тестлэх хэрэгтэй гэж үзээд:
should throw when task not found
гэсэн тест нэмсэн.

## Сэжигтэй саналууд

AI зарим тест дээр:

expect(...).toThrow('Title is required') гэж string message-ээр шалгах санал өгсөн. Гэхдээ ийм шалгалт нь message бага зэрэг өөрчлөгдөхөд амархан эвдэрдэг.

Үүнийг: expect(...).toThrow(ValidationError) гэсэн error type-ээр шалгах нь илүү тогтвортой, найдвартай гэж үзсэн.

## Үр дүн

22 тест бүгд амжилттай болж PASS болсон. dateHelper болон taskService-ийн public method-уудын coverage хангагдсан.
taskRepository болон labelService дээрх тестүүдийг дараагийн алхамд хийхээр төлөвлөсөн.