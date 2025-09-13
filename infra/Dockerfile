FROM python:3.12-slim

WORKDIR /src

COPY pyproject.toml poetry.lock ./

RUN pip install poetry && \
    poetry config virtualenvs.create false && \
    poetry install --no-root --only main

COPY . .

RUN apt-get update && \
    apt-get install -y wait-for-it && \
    rm -rf /var/lib/apt/lists/*

CMD ["sh", "-c", "echo \"DATABASE_URL: $DATABASE_URL\"; \
      wait-for-it --host=$(echo $DATABASE_URL | sed 's/.*@\\([^:]*\\).*/\\1/') \
                  --port=5432 --timeout=30 -- \
      echo 'Database available'; \
      poetry run alembic upgrade head; \
      poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload"]
