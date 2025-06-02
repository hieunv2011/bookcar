from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean, Text, SmallInteger, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class Instructor(Base):
    __tablename__ = "instructors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    birthday = Column(Date, nullable=True)
    id_card = Column(String, nullable=False)
    image_path = Column(String, nullable=True)
    driving_license_no = Column(String, nullable=False)
    rfid_card = Column(String, nullable=True)
    status = Column(Integer, nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id"), nullable=True)
    address = Column(String, nullable=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    teaching_license_no = Column(String, nullable=True)
    rfid_card_name = Column(String, nullable=True)
    synced = Column(Boolean, nullable=True, default=False)
    sync_error = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    gender = Column(SmallInteger, nullable=True)
    level = Column(String, nullable=True)

    created_date = Column(DateTime, server_default=func.now())
    updated_date = Column(DateTime, server_default=func.now(), onupdate=func.now())
    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)
