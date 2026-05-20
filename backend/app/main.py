from fastapi import FastAPI

app = FastAPI(
    title="LearningWithAhad Growth Platform",
    version="1.0.0",
    description="Enterprise AI multi-agent system for YouTube marketing automation."
)

@app.get("/")
def root():
    return {
        "project": "LearningWithAhad Growth Platform",
        "status": "running",
        "agents": [
            "seo_agent",
            "social_media_agent",
            "analytics_agent",
            "trend_research_agent"
        ]
    }

@app.get("/health")
def health():
    return {"status": "healthy"}