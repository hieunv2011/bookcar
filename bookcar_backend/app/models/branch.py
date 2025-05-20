from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    short_name = Column(String)
    # province_id = Column(Integer) 
    customer_id = Column(Integer)
    config = Column(JSON)

    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.now())
    created_by = Column(String)
    updated_by = Column(String)
