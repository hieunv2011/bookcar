from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    short_name = Column(String)
    # province_id = Column(Integer, ForeignKey("provinces.id"))
    customer_id = Column(Integer)
    config = Column(JSON)

    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), onupdate=func.now())
    created_by = Column(String)
    updated_by = Column(String)
