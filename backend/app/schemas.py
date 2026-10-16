from pydantic import BaseModel
from typing import Optional

# Detection Schemas
class DetectionBase(BaseModel):
    plate: str
    camera_id: str
    speed: Optional[str] = "0 KM/H"
    confidence: Optional[str] = "95%"

class DetectionCreate(DetectionBase):
    pass

class DetectionResponse(DetectionBase):
    id: int
    area: Optional[str] = None
    thana: Optional[str] = None
    time_str: Optional[str] = None
    date_str: Optional[str] = None
    is_alert: bool = False

    class Config:
        from_attributes = True

# Watchlist / Hotlist Schemas
class WatchlistBase(BaseModel):
    plate: str
    reason: str

class WatchlistCreate(WatchlistBase):
    pass

class WatchlistResponse(WatchlistBase):
    id: int

    class Config:
        from_attributes = True