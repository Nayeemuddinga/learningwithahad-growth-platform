from fastapi import FastAPI
from app.core.config import settings
from app.api.seo import router as seo_router
from app.db.init_db import init_db

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug,
    description="Enterprise AI multi-agent system for YouTube marketing automation.",
)


@app.on_event("startup")
def on_startup():
    init_db()


# Register API routers
app.include_router(seo_router)


@app.get("/")
def root():
    return {
        "project": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "agents": [
            "seo_agent",
            "social_media_agent",
            "analytics_agent",
            "trend_research_agent",
        ],
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "debug": settings.debug,
    }


@app.get("/config")
def config():
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "database_configured": bool(settings.database_url),
        "redis_configured": bool(settings.redis_url),
        "qdrant_configured": bool(settings.qdrant_url),
        "gemini_api_key_configured": bool(settings.gemini_api_key),
    }