from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

class Notification(BaseModel):
    user_id: int
    message: str

# Simulated notification storage
notifications_db = []

@app.post("/notify")
def notify(notification: Notification) -> Dict[str, str]:
    """
    Simulates sending a notification to a user.
    Stores the notification in a mock database.
    """
    notifications_db.append(notification.dict())
    return {"status": "success", "message": f"Notification sent to user {notification.user_id}"}

@app.get("/notifications")
def get_notifications(user_id: int) -> List[Dict]:
    """
    Retrieves all notifications for a specific user.
    """
    return [n for n in notifications_db if n["user_id"] == user_id]