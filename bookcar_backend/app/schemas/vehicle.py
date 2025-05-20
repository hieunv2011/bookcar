from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime, date

class VehicleBase(BaseModel):
    plate: str
    branch_id: int
    notes: Optional[str] = None
    device_id: Optional[int] = None
    model: Optional[str] = None
    manufacture_year: Optional[str] = None
    last_updated: Optional[datetime] = None
    hang: Optional[str] = None
    gptl: Optional[str] = None
    state: Optional[Any] = None
    owner: Optional[str] = None
    synced: Optional[bool] = None
    sync_error: Optional[str] = None
    type: Optional[str] = None
    color: Optional[str] = None
    gptl_expired_date: Optional[date] = None
    status: Optional[int] = None
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class VehicleCreate(VehicleBase):
    pass

class VehicleOut(VehicleBase):
    id: int

    class Config:
        orm_mode = True
