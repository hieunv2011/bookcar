from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.sql import func
from app.database import Base
from sqlalchemy import Enum

states = ('done', 'doing', 'todo', 'late')

class DrivingLesson(Base):
    __tablename__ = "driving_lessons"

    id = Column(Integer, primary_key=True, autoincrement=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    hang_gplx = Column(String)
    lesson_name = Column(String, nullable=False)
    lesson_date = Column(DateTime)
    duration = Column(Integer)
    status = Column(String)
    start_time_window = Column(DateTime)
    end_time_window = Column(DateTime)    
    created_date = Column(DateTime, default=func.now())
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now())

# Association table: driving_lesson <-> vehicle <-> trainee
class DrivingLessonParticipant(Base):
    __tablename__ = "driving_lesson_participants"
    id = Column(Integer, primary_key=True, autoincrement=True)
    driving_lesson_id = Column(Integer, ForeignKey("driving_lessons.id"), nullable=False)
    vehicle_id = Column(Integer,ForeignKey("vehicles.id"),nullable=True)
    vehicle_plate = Column(String, nullable=True)
    trainee_id = Column(Integer, ForeignKey("trainees.id"), nullable=True)
    actual_start_time = Column(DateTime)  
    actual_end_time = Column(DateTime)
    # state = Column(Enum(*states, name="state_enum"), default='todo')    
    created_date = Column(DateTime, default=func.now())
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now())
