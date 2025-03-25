from typing import List
from fastapi import FastAPI

app = FastAPI()

# Mock database or Elasticsearch integration
mock_data = {
    "restaurants": [
        {"id": 1, "name": "Pizza Place", "cuisine": "Italian"},
        {"id": 2, "name": "Sushi Bar", "cuisine": "Japanese"},
        {"id": 3, "name": "Burger Joint", "cuisine": "American"},
    ]
}

@app.get("/search")
def search(query: str) -> List[dict]:
    """
    Simulates a search query against a database or Elasticsearch.
    Returns matching restaurants based on the query.
    """
    results = [
        restaurant for restaurant in mock_data["restaurants"]
        if query.lower() in restaurant["name"].lower()
    ]
    return results