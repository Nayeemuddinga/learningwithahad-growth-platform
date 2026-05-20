from fastapi.testclient import TestClient
from unittest.mock import patch

from app.main import app

client = TestClient(app)


@patch("app.api.seo.generate_seo_assets")
def test_generate_seo_assets(mock_generate):
    mock_generate.return_value = {
        "topic": "Python Tutorial",
        "content": "# Sample SEO Output",
    }

    response = client.post(
        "/seo/generate",
        json={"topic": "Python Tutorial"},
    )

    assert response.status_code == 200

    data = response.json()
    assert data["topic"] == "Python Tutorial"
    assert "content" in data


def test_generate_seo_assets_validation():
    response = client.post(
        "/seo/generate",
        json={"topic": "AI"},  # too short (minimum length = 3)
    )

    assert response.status_code == 422