from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from .database import Base

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    plate = Column(String, index=True)
    camera_id = Column(String)
    area = Column(String, nullable=True)
    thana = Column(String, nullable=True)
    speed = Column(String, nullable=True, default="0 KM/H")
    confidence = Column(String, nullable=True, default="95%")
    time_str = Column(String, nullable=True)
    date_str = Column(String, nullable=True)
    is_alert = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Watchlist(Base):
    __tablename__ = "watchlist"

    id = Column(Integer, primary_key=True, index=True)
    plate = Column(String, unique=True, index=True)
    reason = Column(String)
    case_id = Column(String, nullable=True)
    police_station = Column(String, nullable=True)
    station_address = Column(String, nullable=True)
    officer_id = Column(String, nullable=True)
    officer_contact = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())