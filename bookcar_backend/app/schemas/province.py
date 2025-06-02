from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProvinceBase(BaseModel):
    ma_so: Optional[str] = None
    name: str
    id_so: Optional[str] = None
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class ProvinceCreate(ProvinceBase):
    pass

class ProvinceUpdate(ProvinceBase):
    pass

class ProvinceOut(ProvinceBase):
    id: int

    class Config:
        orm_mode = True
