# Инструкция: как скачать и установить файлы учебника

1. Загрузите все 6 файлов из списка ниже и сохраните их в корневую папку вашего проекта:

   * index.html
   * style.css
   * app.js
   * lessonsData.js
   * service-worker.js
   * manifest.json

2.  Убедитесь, что структура папки выглядит так:

```
— ваш-проект/
   ├── index.html
   ├── style.css
   ├── app.js
   ├── lessonsData.js
   ├── service-worker.js
   └── manifest.json
```

3.  При необходимости добавьте иконки PWA (icon-192.png, icon-512.png) в ту же папку.

4.  Запустите статический сервер (например, http-server):

```bash
npx http-server .
```

5.  Откройте в браузере:

```
http://localhost:8080
```

6.  Для работы офлайн примите регистрацию Service Worker, которую предложит браузер.
