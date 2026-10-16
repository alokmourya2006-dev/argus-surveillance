from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
import requests

from . import models, schemas
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ARGUS Command Center - Auto Intelligence Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CAMERA_LOCATION_MAP = {
    "cam_1": {"area": "Hazratganj Chauraha, MG Marg", "thana": "Hazratganj Kotwali", "lat": 26.8467, "lng": 80.9462},
    "cam_2": {"area": "Station Gate 1, Charbagh", "thana": "Naka Hindola Thana", "lat": 26.8322, "lng": 80.9231},
    "cam_3": {"area": "Ashutosh Nagar, Alambagh", "thana": "Krishna Nagar Thana", "lat": 26.8145, "lng": 80.9012},
    "cam_4": {"area": "Cyber Tower Crossing, Gomti Nagar", "thana": "Gomti Nagar Thana", "lat": 26.8520, "lng": 80.9980}
}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# WebSocket Connection Manager for Zero-Latency Alert Streaming
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)

manager = ConnectionManager()

# 1. HEALTH CHECK
@app.get("/health")
@app.get("/api/health")
def health_check():
    return {"status": "ok", "system": "argus_online"}

# 2. REAL-TIME WEBSOCKET ENDPOINT
@app.websocket("/ws/alerts")
async def websocket_alerts_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# 3. GET ALERTS
@app.get("/alerts")
@app.get("/api/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return db.query(models.Detection).filter(models.Detection.is_alert == True).all()

# 4. BACKEND DYNAMIC ROUTE PROXY (Protects API from Client-Side Rate-Limits)
@app.get("/api/get-route")
def get_backend_street_route(start_lat: float, start_lng: float, end_lat: float, end_lng: float):
    osrm_url = f"http://router.project-osrm.org/route/v1/driving/{start_lng},{start_lat};{end_lng},{end_lat}?overview=full&geometries=geojson"
    try:
        res = requests.get(osrm_url, timeout=5)
        data = res.json()
        if "routes" in data and len(data["routes"]) > 0:
            coords = [[pt[1], pt[0]] for pt in data["routes"][0]["geometry"]["coordinates"]]
            return {"status": "success", "coordinates": coords}
    except Exception as e:
        pass
    
    # Fallback to direct straight coordinates if routing server times out
    return {"status": "fallback", "coordinates": [[start_lat, start_lng], [end_lat, end_lng]]}

# 5. LIVE DETECTION PROCESSOR + REAL-TIME BROADCAST
@app.post("/api/detections")
async def process_live_detection(detection: schemas.DetectionCreate, db: Session = Depends(get_db)):
    now = datetime.now()
    formatted_time = now.strftime("%I:%M:%S %p")
    formatted_date = now.strftime("%A, %d %b %Y")

    cam_info = CAMERA_LOCATION_MAP.get(detection.camera_id, {
        "area": "Unknown Zone", 
        "thana": "Central Thana",
        "lat": 26.8467,
        "lng": 80.9462
    })

    watchlist_entry = db.query(models.Watchlist).filter(
        models.Watchlist.plate == detection.plate.upper()
    ).first()

    is_hotlist_match = True if watchlist_entry else False

    db_detection = models.Detection(
        plate=detection.plate.upper(),
        camera_id=detection.camera_id,
        area=cam_info["area"],
        thana=cam_info["thana"],
        speed=detection.speed,
        confidence=detection.confidence,
        time_str=formatted_time,
        date_str=formatted_date,
        is_alert=is_hotlist_match
    )
    db.add(db_detection)
    db.commit()
    db.refresh(db_detection)

    alert_payload = {
        "id": db_detection.id,
        "plate": db_detection.plate,
        "camera_id": db_detection.camera_id,
        "area": db_detection.area,
        "thana": db_detection.thana,
        "is_alert": is_hotlist_match,
        "lat": cam_info["lat"],
        "lng": cam_info["lng"],
        "timestamp": f"{formatted_date} • {formatted_time}"
    }

    # Broadcast via WebSocket instantly to all connected command center screens
    if is_hotlist_match:
        await manager.broadcast({"type": "HOTLIST_ALERT", "data": alert_payload})

    return {"status": "success", "is_alert": is_hotlist_match, "payload": alert_payload}