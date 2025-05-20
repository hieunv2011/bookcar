from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Date, DateTime, Text, JSON, SmallInteger
from sqlalchemy.sql import func
from app.database import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    plate = Column(String, nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=False)

    notes = Column(String, nullable=True)
    device_id = Column(Integer, nullable=True)
    model = Column(String, nullable=True)
    manufacture_year = Column(String, nullable=True)
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())
    hang = Column(String, nullable=True)
    gptl = Column(String, nullable=True)
    state = Column(JSON, nullable=True)
    owner = Column(String, nullable=True)

    synced = Column(Boolean, default=False)
    sync_error = Column(Text, nullable=True)

    type = Column(String, nullable=True)
    color = Column(String, nullable=True)
    gptl_expired_date = Column(Date, nullable=True)
    status = Column(SmallInteger, nullable=True)

    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.now())
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)
