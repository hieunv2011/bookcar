from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, DateTime, Text
from sqlalchemy.sql import func
from app.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    plate = Column(String, unique=True, nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False)

    notes = Column(Text, nullable=True)
    device_id = Column(String, nullable=True)
    model = Column(String, nullable=True)
    manufacture_year = Column(Integer, nullable=True)
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())
    hang = Column(String, nullable=True)
    gptl = Column(String, nullable=True)
    state = Column(String, nullable=True)
    owner = Column(String, nullable=True)

    synced = Column(Boolean, default=False)
    sync_error = Column(Text, nullable=True)

    type = Column(String, nullable=True)
    color = Column(String, nullable=True)
    gptl_expired_date = Column(Date, nullable=True)
    status = Column(String, nullable=True)

    created_date = Column(DateTime, default=func.now())
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now())
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)
