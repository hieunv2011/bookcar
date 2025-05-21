from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DrivingLessonBase(BaseModel):
    course_id: int
    lesson_name: str
    lesson_date: Optional[datetime] = None
    duration: Optional[int] = None
    status: Optional[str] = None
    start_time_window: Optional[datetime] = None
    end_time_window: Optional[datetime] = None

class DrivingLessonCreate(DrivingLessonBase):
    pass

class DrivingLessonUpdate(DrivingLessonBase):
    pass

class DrivingLessonOut(DrivingLessonBase):
    id: int
    created_date: Optional[datetime]
    updated_date: Optional[datetime]
    class Config:
        orm_mode = True
