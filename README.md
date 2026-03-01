# 🏆 Хакатон УниверЛига 2026, Красноярск

Современный fullstack-проект для хакатона УниверЛига, построенный на монолитной архитектуре с использованием Docker. Для демонстрации возможностей настроен стартовый скрипт /backend/src/services/seed.ts

## 📚 Содержание

- [🏆 Хакатон УниверЛига](#-univer-liga-hack)
    - [📚 Содержание](#-содержание)
    - [🛠 Технологический стек](#-технологический-стек)
        - [Frontend](#frontend)
        - [Backend](#backend)
        - [DevOps](#devops)
    - [📁 Структура проекта](#-структура-проекта)
    - [🚀 Быстрый старт](#-быстрый-старт)
        - [🧑‍💻 Разработка](#-разработка)
        - [🌍 Продакшен](#-продакшен)
    - [⚙️ Конфигурация](#️-конфигурация)
        - [Переменные окружения](#переменные-окружения)
    - [📝 Команды](#-команды)
    - [🌐 API](#-api)
        - [Основные эндпоинты](#основные-эндпоинты)
        - [Модели данных](#модели-данных)
    - [🔧 Troubleshooting](#-troubleshooting)
        - [Ошибки подключения к MongoDB](#ошибки-подключения-к-mongodb)
        - [Очистка данных MongoDB](#очистка-данных-mongodb)
    - [📄 Лицензия](#-лицензия)

## 🛠 Технологический стек

### Frontend

- **React 19** — UI библиотека
- **TypeScript 5.9** — типизация
- **Vite 7** — сборка и dev-сервер
- **Tailwind CSS 4** — стилизация
- **Recharts** — компоненты графиков
- **Shadcn UI** — UI компоненты
- **React Router 7** — навигация
- **TanStack Query 5** — управление состоянием сервера
- **Axios** — HTTP клиент
- **Lucide React** — иконки

### Backend

- **Bun** — JavaScript runtime
- **ElysiaJS** — веб-фреймворк
- **Logixlysia** — логирование
- **MongoDB + Mongoose 9** — база данных
- **JWT** — аутентификация
- **TypeScript** — типизация

### DevOps

- **Docker & Docker Compose** — контейнеризация
- **Caddy** — веб-сервер с автоматическим HTTPS
- **MongoDB** — база данных

## 📁 Структура проекта

```
univer-liga-hack/
├── frontend/              # React приложение
│   ├── src/
│   │   ├── api/          # API клиенты
│   │   ├── components/   # React компоненты
│   │   │   ├── ui/       # UI компоненты (Shadcn)
│   │   │   ├── EmployeeReviewForDirector.tsx
│   │   │   ├── EmployeeReviewsComponent.tsx
│   │   │   ├── LogoutComponent.tsx
│   │   │   ├── ReviewComponent.tsx
│   │   │   ├── ReviewHistoryComponent.tsx
│   │   │   ├── SearchComponent.tsx
│   │   │   ├── ToastContainer.tsx
│   │   │   ├── UserAvatarComponent.tsx
│   │   │   ├── UserComponent.tsx
│   │   │   └── UserListComponent.tsx
│   │   ├── hooks/        # Кастомные хуки
│   │   ├── layout/       # Layout компоненты
│   │   ├── lib/          # Утилиты
│   │   ├── screens/      # Страницы приложения
│   │   │   ├── AnalyticsScreen.tsx
│   │   │   ├── EmployeeReviewsScreen.tsx
│   │   │   ├── EmployeesScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── MainScreens.tsx
│   │   │   ├── NotFoundScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── ReviewScreen.tsx
│   │   ├── stores/       # State management
│   │   ├── types/        # TypeScript типы
│   │   ├── App.tsx       # Корневой компонент
│   │   ├── DirectorRoute.tsx  # Директорские роуты
│   │   ├── main.tsx      # Точка входа
│   │   ├── main.css      # Глобальные стили
│   │   └── ProtectedRoute.tsx
│   ├── public/           # Статические ресурсы
│   ├── index.html
│   ├── vite.config.ts
│   ├── package.json
│   ├── components.json   # Shadcn UI конфигурация
│   └── Dockerfile
│
├── backend/              # ElysiaJS API
│   └── src/
│       ├── models/       # Mongoose модели
│       │   ├── user.model.ts
│       │   ├── task.model.ts
│       │   └── comment.model.ts
│       ├── plugins/      # Elysia плагины (auth)
│       ├── routes/       # API роуты
│       │   ├── auth.routes.ts
│       │   ├── user.routes.ts
│       │   ├── review.routes.ts
│       │   └── analytics.routes.ts
│       ├── schemas/      # Валидация схем
│       │   ├── user.schema.ts
│       │   └── review.schema.ts
│       ├── services/     # Бизнес-логика
│       │   ├── db.ts
│       │   ├── user.serivce.ts
│       │   ├── user.service.mock.ts
│       │   ├── task.service.ts
│       │   ├── comment.service.ts
│       │   └── seed.ts
│       └── index.ts      # Точка входа
│   ├── package.json
│   └── Dockerfile
│
├── mongo-data/           # Данные MongoDB (volume)
├── .env.example          # Шаблон корневого .env
├── docker-compose.yml    # Продакшен конфигурация
├── docker-compose.dev.yml # Development конфигурация
├── Caddyfile             # Конфигурация Caddy (dev)
├── Caddyfile.prod        # Конфигурация Caddy (prod)
├── Dockerfile            # Корневой Dockerfile
├── index.ts              # Корневой entry point
├── package.json          # Workspace конфигурация
└── tsconfig.json         # TypeScript конфигурация
```

## 🚀 Быстрый старт

### 🧑‍💻 Разработка

1. **Клонирование и настройка окружения:**

```bash
# Скопируйте шаблоны переменных окружения
cp .env.example .env
cp backend/.env.example backend/.env
#( для продакшна ОБЯЗАТЕЛЬНО настроить frontend/Caddyfile.prod и frontend/Dockerfile )
заменить helloikity.duckdns.org на ваш домен
```

2. **Установка зависимостей:**

```bash
# Установка всех зависимостей (корень + workspace пакеты)
bun install
```

3. **Запуск development среды:**

```bash
# Запуск MongoDB в Docker
docker compose -f docker-compose.dev.yml up --build
```

4. **Запуск приложений:**

```bash
# Запуск бэкенда (в отдельном терминале)
cd backend
bun run dev

# Запуск фронтенда (в ещё одном терминале)
cd frontend
bun run dev
```

5. **Доступ к приложению:**
    - Frontend: `http://localhost:5173`
    - Backend API: `http://localhost:8080`
    - MongoDB: `mongodb://localhost:27017`

### 🌍 Продакшен

Запуск готового продакшен-окружения:

```bash
docker compose up --build
```

Для запуска в фоновом режиме добавьте флаг `-d`:

```bash
docker compose up -d
```

После запуска приложение будет доступно:

- HTTP: `http://localhost:80`
- HTTPS: `https://localhost:443`
- Backend API: `http://localhost:80/api/*`

## ⚙️ Конфигурация

### Переменные окружения

**Корневой `.env`:**

| Переменная       | Описание             | Пример                |
| ---------------- | -------------------- | --------------------- |
| `MONGODB_USER`   | Пользователь MongoDB | `admin`               |
| `MONGODB_PASSWD` | Пароль MongoDB       | `secure_password_123` |
| `MONGODB_DB`     | Имя базы данных      | `univerliga`          |
| `JWT_SECRET`     | Секрет jwt           | `a8dc654f-09c3`       |

**`backend/.env`:**

| Переменная  | Описание                              | Пример                                                    |
| ----------- | ------------------------------------- | --------------------------------------------------------- |
| `MONGO_URL` | Connection string MongoDB             | `mongodb://admin:password@mongo-db-hack:27017/univerliga` |
| `NODE_ENV`  | Режим работы (production/development) | `production`                                              |
| `JWT_SECRET`| Секрет jwt                            | `a8dc654f-09c3`                                           |

## 📝 Команды

| Команда                                               | Описание                                |
| ----------------------------------------------------- | --------------------------------------- |
| `bun install`                                         | Установка всех зависимостей (workspace) |
| `docker compose up`                                   | Запуск продакшен окружения              |
| `docker compose up -d`                                | Запуск продакшен окружения в фоне       |
| `docker compose -f docker-compose.dev.yml up --build` | Запуск development окружения (MongoDB)  |
| `docker compose down`                                 | Остановка всех контейнеров              |
| `cd backend && bun run dev`                           | Запуск бэкенда в режиме разработки      |
| `cd backend && bun run start`                         | Запуск бэкенда в продакшен режиме       |
| `cd frontend && bun run dev`                          | Запуск фронтенда в режиме разработки    |
| `cd frontend && bun run build`                        | Сборка фронтенда для продакшена         |
| `cd frontend && bun run lint`                         | Запуск линтера                          |

---

## 📧 Пароли для входа:
```
maria@example.com / director123 (Директор)
employee1@example.com - employee49@example.com / password123 (Сотрудники)
```
---

## 🔧 Troubleshooting

### Ошибки подключения к MongoDB

Убедитесь, что переменные окружения настроены корректно:

```bash
# Проверка .env файла
cat .env
cat backend/.env
```

### Очистка данных MongoDB

```bash
rm -rf ./mongo-data  # Удалит все данные
```

---

## 📄 Лицензия

Проект создан в рамках хакатона Univer Liga.
