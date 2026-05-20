from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

from app.core.config import settings
from app.db.base import Base
import app.models  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Use SQLAlchemy metadata
target_metadata = Base.metadata

# Inject database URL from application settings
config.set_main_option("sqlalchemy.url", settings.database_url)