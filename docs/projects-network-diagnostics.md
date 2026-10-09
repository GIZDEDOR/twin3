# Проверка нестабильности Projects (без изменения сервера)

Сбой ETIMEDOUT / UND_ERR_HEADERS_TIMEOUT пока не воспроизведён в доступном окружении.
Успешный запрос к API не доказывает успех всех запросов рендеринга.

Серверная цепочка:
- app/layout.tsx: getSingle('extramenu').
- app/projects/layout.tsx: getSingle('projects') и getProjects() параллельно.
- getProjects(): repository, затем документы project.
- metadata и страница используют React.cache; fallback Behance использует общий getProjectCatalogue.
- ProjectDetail/ProjectNavigation/ProjectCatalogue не запрашивают внешний API.
- Видео и изображения загружает браузер, это отдельные запросы.

React.cache действует внутри серверного рендеринга, а не как постоянный резервный каталог.
force-dynamic/no-store оставлены как есть. Вебхук, тег prismic и /api/revalidate не изменены.

Защита: общий бюджет серверного рендеринга 15 секунд; попытка GET — 7 секунд,
включая тело. Максимум две попытки (сетевые ошибки и HTTP 429 используют один цикл).
Retry-After соблюдается, если укладывается в остаток бюджета; иначе возвращается ошибка.
429 не передаётся SDK, поскольку его встроенное ожидание не ограничено и не отменяется
сигналом. Обработка ref/пагинации SDK сохранена, но ограничена общим сроком.
Одинаковые GET (URL, headers и остальные fetch options) сохраняют общий результат
в React.cache только до конца текущего рендеринга. Preview ref входит в URL.
AbortSignal отключает встроенную дедупликацию Next; её заменяет эта request-scoped карта.
Next Data Cache, cache/next.tags/revalidate не меняются. Ошибки не заменяются контентом.


## Команды на VPS из каталога текущего релиза

Не выполняют reload/restart/revalidate и не меняют конфигурацию:

```sh
git rev-parse HEAD
node --version
pm2 list
curl --max-time 20 -sS -o /dev/null -w 'projects status=%{http_code} ttfb=%{time_starttransfer} total=%{time_total}\n' http://127.0.0.1:3000/projects
curl --max-time 20 -sS -o /dev/null -w 'yota status=%{http_code} ttfb=%{time_starttransfer} total=%{time_total}\n' http://127.0.0.1:3000/projects/yota
pm2 logs --nostream --lines 100
```

HTTP 200 у streaming SSR недостаточно: в браузере проверить содержимое, Console и
запрос перехода RSC в Network. Записать время сбоя и сопоставить с PM2.
Не публиковать cookies, URL с preview ref/access_token и содержимое переменных окружения.

Проверить ВСЕ документы отдельно, не только корневой endpoint. У каждой проверки свой сигнал.
Этот пример использует исходный SDK: его ожидание Retry-After при 429 не отменяется сигналом;
для полной проверки нового общего лимита используйте рендеринг приложения с обёрткой:

```sh
node --input-type=module <<'JS'
import * as p from '@prismicio/client';
const client=p.createClient('twin3',{fetchOptions:{cache:'no-store'}});
for(const [name, run] of [
  ['extramenu',()=>client.getSingle('extramenu',{fetchOptions:{signal:AbortSignal.timeout(15000)}})],
  ['projects',()=>client.getSingle('projects',{fetchOptions:{signal:AbortSignal.timeout(15000)}})],
  ['project list',()=>client.getAllByType('project',{fetchOptions:{signal:AbortSignal.timeout(15000)},orderings:[{field:'document.first_publication_date',direction:'desc'}]})],
]) {
  const start=Date.now();
  try {await run(); console.log(name, 'OK', Date.now()-start);}
  catch(e){console.log(name,'FAILED',Date.now()-start,e.name,e.cause?.code);}
}
JS
```

Если сбой повторяется: определить операцию по сообщениям [prismic], проверить полный
ответ API (включая тело), сравнить браузерный запрос с прямым GET, сопоставить окружение
PM2 с интерактивным Node (версия, рабочий каталог, SHA; секреты не выводить).
Подробный PRISMIC_DIAGNOSTICS=1 включать только в отдельно запущенном тестовом процессе
после согласования; действующий процесс и настройки сервера этим аудитом не изменяются.
Не увеличивать тайм-аут Nginx для маскировки.

## Воспроизводимая интеграционная проверка

В отдельной временной копии проекта собрать production (не в работающей `.next`).
Затем из исходного проекта:

```sh
TWIN3_TEST_BUILD_DIR=/private/tmp/<isolated-build> node tests/prismic-render.integration.mjs
```

Скрипт допускает только временную копию, удаляет только её fetch-cache перед каждым
запуском, поднимает отдельный Next на 127.0.0.1:3103 и завершает только созданный процесс.
Preload `tests/prismic-network-probe.mjs` считает реальные вызовы сетевого fetch под
Next Data Cache. Он не включается в приложение и не пишет query/ref/токены.
Проверяются полные HTML-ответы и отсутствие одинаковых сетевых URL.

Проверено 09.10.2026: production-сборка, свежие опубликованные данные Prismic.
На каждом из /projects, /projects/yota, /projects/kino с холодным кэшем: HTTP 200,
ровно 4 обращения (repository, projects, project, extramenu), каждый URL один раз.
С прогретым Data Cache: 3 обращения, extramenu из существующего кэша Next.
Отдельный тест HTTP-сервера подтверждает объединение параллельных и последовательных
одинаковых GET внутри scope и отсутствие такого объединения между разными scope.

Сетевой сбой на VPS не воспроизведён. Проверена конечность ожидания и безопасные
повторы, а не устранение сетевой причины на REG.RU. Общий дедлайн покрывает работу,
обёрнутую observePrismic, в пределах серверного рендеринга. Пользовательская операция
с произвольными задержками вне этой обёртки не получает такой гарантии автоматически.
