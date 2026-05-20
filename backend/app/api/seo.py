from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import func


from app.agents.seo_agent import generate_seo_assets
from app.db.database import get_db
from app.models.seo_generation import SEOGeneration
from app.schemas.seo import SEORequest, SEOResponse

router = APIRouter(prefix="/seo", tags=["SEO Agent"])


@router.post("/generate", response_model=SEOResponse)
def generate(request: SEORequest, db: Session = Depends(get_db)):
    try:
        # Generate SEO content using Gemini/OpenAI
        result = generate_seo_assets(request.topic)

        # Persist to PostgreSQL
        record = SEOGeneration(
            topic=result["topic"],
            content=result["content"],
            provider="gemini",
        )

        db.add(record)
        db.commit()
        db.refresh(record)

        # Return API response
        return SEOResponse(**result)

    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    
@router.get("/history")
def get_history(
    limit: int = 50,
    topic: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(SEOGeneration)

    # Optional topic search
    if topic:
        query = query.filter(
            SEOGeneration.topic.ilike(f"%{topic}%")
        )

    # Enforce reasonable bounds
    limit = max(1, min(limit, 100))

    records = (
        query
        .order_by(SEOGeneration.created_at.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": record.id,
            "topic": record.topic,
            "provider": record.provider,
            "created_at": record.created_at,
        }
        for record in records
    ]

@router.get("/{generation_id}")
def get_generation(generation_id: int, db: Session = Depends(get_db)):
    record = (
        db.query(SEOGeneration)
        .filter(SEOGeneration.id == generation_id)
        .first()
    )

    if not record:
        raise HTTPException(
            status_code=404,
            detail="SEO generation not found",
        )

    return {
        "id": record.id,
        "topic": record.topic,
        "content": record.content,
        "provider": record.provider,
        "created_at": record.created_at,
    }

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_generations = db.query(func.count(SEOGeneration.id)).scalar() or 0

    unique_topics = (
        db.query(func.count(func.distinct(SEOGeneration.topic)))
        .scalar()
        or 0
    )

    latest_generation = (
        db.query(SEOGeneration)
        .order_by(SEOGeneration.created_at.desc())
        .first()
    )

    return {
        "total_generations": total_generations,
        "unique_topics": unique_topics,
        "latest_generation_at": (
            latest_generation.created_at
            if latest_generation
            else None
        ),
        "providers": ["gemini"],
    }