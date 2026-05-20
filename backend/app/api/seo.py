from fastapi import APIRouter, HTTPException

from app.agents.seo_agent import generate_seo_assets
from app.schemas.seo import SEORequest, SEOResponse

router = APIRouter(prefix="/seo", tags=["SEO Agent"])


@router.post("/generate", response_model=SEOResponse)
def generate(request: SEORequest):
    try:
        result = generate_seo_assets(request.topic)
        return SEOResponse(**result)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))