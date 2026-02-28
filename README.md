##Запуск в деплой:
-------- docker compose up
##Запуск в dev:
-------- cp .env.example .env && cp backend/.env.expample backend/.env
-------- потом docker compose -f docker-compose.dev.yml up --build
-------- запуск бэка bun run dev
