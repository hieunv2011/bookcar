from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.course import CourseCreate, CourseOut
from app.crud import course

router = APIRouter(prefix="/courses", tags=["Courses"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CourseOut)
def create_course(course_in: CourseCreate, db: Session = Depends(get_db)):
    return course.create_course(db, course_in)

@router.get("/", response_model=list[CourseOut])
def read_courses(db: Session = Depends(get_db)):
    return course.get_courses(db)
