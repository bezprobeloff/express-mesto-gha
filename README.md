<h1 align="center">Проект бекенд Mesto Russia (Express)</h1>
<p align="center">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/bezprobeloff/express-mesto-gha" />
    <img alt="Quality" src="https://img.shields.io/badge/status-release-orange.svg" >
    <img alt="Made by: Bezprobeloff" src="https://img.shields.io/badge/made%20by-Bezprobeloff-blue" />
    <img alt="Made by: Bezprobeloff" src="https://github.com/bezprobeloff/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg" />
</p>

## Обзор

Проект бекенд для сайта Mesto Russia https://mesto.bezprobeloff.nomoredomains.icu/  
Исходный код фронтенда  на GitHub -  **[Mesto Russia (frontend)](https://github.com/bezprobeloff/react-mesto-auth/)**  
Ссылка на __API__ - https://api.mesto.bezprobeloff.nomoredomains.icu/  

## Роуты

| Роут | Запрос | Действие | Ошибки |
| --- | --- | --- | --- |
| `/users` | GET POST | GET-запрос возвращает всех пользователей из базы данных; POST-запрос создаёт пользователя с переданными в теле запроса name, about, avatar | 400 — Переданы некорректные данные при создании пользователя. 500 — Ошибка по умолчанию. |
| `/users/:userId` | GET | GET-запрос возвращает пользователя по переданному _id. | 404 — Пользователь по указанному _id не найден. 500 — Ошибка по умолчанию. |
| `/users/me` | PATCH | PATCH-запрос обновляет информацию о пользователе. | 400 — Переданы некорректные данные при обновлении профиля. 404 — Пользователь с указанным _id не найден. 500 — Ошибка по умолчанию. |
| `/users/me/avatar` | PATCH | PATCH-запрос обновляет аватар пользователя. | 400 — Переданы некорректные данные при обновлении аватара. 404 — Пользователь с указанным _id не найден. 500 — Ошибка по умолчанию. |
| `/cards` | GET POST | GET-запрос возвращает все карточки из базы данных. POST-запрос создает новую карточку по переданным параметрам. | 400 — Переданы некорректные данные при создании карточки. 500 — Ошибка по умолчанию. |
| `/cards/:cardId` | DELETE | DELETE-запрос удаляет карточку по _id. | 404 — Карточка с указанным _id не найдена. |
| `/cards/:cardId/likes` | PUT DELETE | PUT-запрос добавляет лайк карточке. DELETE-запрос удаляет лайк с карточки. | 400 — Переданы некорректные данные для постановки/снятии лайка. 404 — Передан несуществующий _id карточки. 500 — Ошибка по умолчанию. |

## Технологии

* express
* celebrate
* joi
* mongoose
* validator
* jsonwebtoken
* express-winston
* централизованная обработка ошибок

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/middlewares` — папка с файлами промежуточных функций  
`/errors` — папка с файлами кастомных ошибок

## Установка

Установить Node.js (v16.5) и запустить в корневом каталоге проекта:

`npm install` — установка пакетов   

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
