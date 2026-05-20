import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.gemini_api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_seo_assets(topic: str) -> dict:
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

    response = model.generate_content(prompt)

    return {
        "topic": topic,
        "content": response.text,
    }