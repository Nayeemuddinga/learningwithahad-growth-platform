from app.db.database import engine
from app.db.base import Base

# Import all models so SQLAlchemy registers them
import app.models  # noqa: F401


def init_db() -> None:
    Base.metadata.create_all(bind=engine)