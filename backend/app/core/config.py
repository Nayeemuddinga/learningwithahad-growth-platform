from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "LearningWithAhad Growth Platform"
    app_version: str = "1.0.0"
    debug: bool = True

    openai_api_key: str = ""

    database_url: str = "postgresql://postgres:postgres@localhost:5432/lwahad_growth"
    redis_url: str = "redis://localhost:6379/0"
    qdrant_url: str = "http://localhost:6333"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()