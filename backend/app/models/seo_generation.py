from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SEOGeneration(Base):
    __tablename__ = "seo_generations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # Input topic
    topic: Mapped[str] = mapped_column(String(255), nullable=False, index=True)

    # Generated markdown/text content
    content: Mapped[str] = mapped_column(Text, nullable=False)

    # Model used (Gemini/OpenAI/etc.)
    provider: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="gemini",
    )

    # Timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )