import json
import os
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database settings
    DB_HOST: str = ""
    DB_PORT: int = 0
    DB_USER: str = ""
    DB_PASSWORD: str = ""
    DB_DRIVER: str = ""
    DB_NAME: str = ""
    DATABASE_URL: str = ""

    # RabbitMQ settings
    rabbitmq_url: str = "amqp://guest:guest@localhost:5672/"

    # JWT settings
    JWT_SECRET_KEY: str = ""
    JWT_ENCODE_ALGORITHM: str = ""
    SENTRY_DSN: str = ""

    DOCKER_USERNAME: str = ""

    # CORS settings
    CORS_MAX_AGE: int = ""
    CORS_ORIGINS: List[str] = []

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            try:
                parsed = json.loads(v)
                if not isinstance(parsed, list):
                    raise ValueError("CORS_ORIGINS must be a list")
                return parsed
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON: {e}")
                return []
        return v or []

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def db_url(self) -> str:
        env = os.getenv("ENVIRONMENT", "local")
        if env == "docker":
            host = "db"
        else:
            host = self.DB_HOST or "localhost"
        return (
            f"{self.DB_DRIVER}://{self.DB_USER}:{self.DB_PASSWORD}@"
            f"{host}:{self.DB_PORT}/{self.DB_NAME}"
        )
