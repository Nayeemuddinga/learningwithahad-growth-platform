from pydantic import BaseModel, Field


class SEORequest(BaseModel):
    topic: str = Field(
        ...,
        min_length=3,
        max_length=200,
        description="Topic or title of the YouTube video",
        examples=["Build an AI chatbot with Python"],
    )


class SEOResponse(BaseModel):
    topic: str
    content: str