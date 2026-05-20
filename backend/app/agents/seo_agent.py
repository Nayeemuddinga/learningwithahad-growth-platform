from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.openai_api_key)


def generate_seo_assets(topic: str) -> dict:
    """
    Generate YouTube SEO assets for a given topic.
    """
    prompt = f"""
You are a world-class YouTube SEO expert.

Create marketing assets for a YouTube video about: "{topic}"

Return:
1. 10 high-CTR titles
2. SEO-optimized description
3. 20 tags
4. 20 hashtags
5. 5 thumbnail text ideas

Format the response in clean markdown.
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    return {
        "topic": topic,
        "content": response.output_text,
    }