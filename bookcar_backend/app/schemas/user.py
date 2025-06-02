from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    customer_id: Optional[int] = None
    status: Optional[bool] = True
    is_admin: Optional[bool] = False
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class UserCreate(UserBase):
    password: str  # plain password nhận từ client

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True
