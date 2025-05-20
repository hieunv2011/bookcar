from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class BranchBase(BaseModel):
    name: str
    short_name: Optional[str] = None
    customer_id: Optional[int] = None
    config: Optional[Any] = None
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class BranchCreate(BranchBase):
    pass

class BranchOut(BranchBase):
    id: int

    class Config:
        orm_mode = True
