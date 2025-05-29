from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DrivingLessonParticipantBase(BaseModel):
    driving_lesson_id: int
    vehicle_id: Optional[int] = None
    trainee_id: Optional[int]
    vehicle_plate: Optional[str]
    actual_start_time: Optional[datetime] = None
    actual_end_time: Optional[datetime] = None

class DrivingLessonParticipantCreate(DrivingLessonParticipantBase):
    pass

class DrivingLessonParticipantOut(DrivingLessonParticipantBase):
    id: int
    created_date: Optional[datetime]
    updated_date: Optional[datetime]
    class Config:
        orm_mode = True
