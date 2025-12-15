# Веб-приложение ОмГТУ

Полноценное веб-приложение для управления автомобилями и дилерами, разработанное на **FastAPI (Python)** и **React**.

## Технологии

- **Бэкенд (FastAPI)**
  - RESTful API endpoints для автомобилей и дилеров
  - База данных **PostgreSQL** с ORM **SQLAlchemy**
  - Поддержка **CORS**
  - Конфигурация на основе переменных окружения
  - Миграции базы данных с **Alembic**

- **Фронтенд (React)**
  - Современное React-приложение
  - Адаптивный дизайн
  - Интерактивные UI-компоненты

- Python 3.12+
- Node.js 16+
- PostgreSQL 13+
- npm

## Быстрый старт

### Запуск бэкенда

1. **Запуск через Docker**
   ```bash
   # Из папки infra директории проекта
   docker-compose up --build
   ```

   API будет доступно по адресу `http://localhost:8000`
   - Документация API: `http://localhost:8000/docs`

### Запуск фронтенда

1. **Установка зависимостей**
   ```bash
   cd frontend
   npm install
   ```

2. **Запуск приложения**
   ```bash
   npm start
   ```
   
   Приложение будет доступно по адресу `http://localhost:3000`

### Настройка переменных окружения

1. Создайте файл `.env` в корне проекта
2. Укажите необходимые переменные окружения (пример в `.env.example`)

## Структура проекта

```
omstu_web_application/
├── .env                    # Environment variables
├── alembic/               # Database migrations
├── frontend/              # React frontend
│   ├── public/            # Static files
│   └── src/               # React source code
│       ├── components/    # Reusable components
│       ├── services/      # API services
│       └── App.js         # Main application component
├── src/                   # Python backend
│   ├── cars/             # Cars module
│   ├── dealer/           # Dealers module
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   └── main.py           # FastAPI application
├── .gitignore
├── poetry.lock
├── pyproject.toml         # Python dependencies
└── README.md
```

## .env.example
```
DB_HOST=localhost
DB_PORT=5433
DB_USER=your-user-name
DB_PASSWORD=your-password
DB_NAME=you-db-name
DB_DRIVER=postgresql+asyncpg
DATABASE_URL=postgresql+asyncpg://user:your@localhost:5433/db

CORS_ORIGINS=['your-cors-origins']
CORS_MAX_AGE=3600

JWT_SECRET_KEY=secret_key
JWT_ENCODE_ALGORITHM=HS256

```


