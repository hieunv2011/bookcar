from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.course import Course
from app.schemas.course import CourseCreate

def create_course(db: Session, course: CourseCreate):
    db_course = Course(**course.dict())
    try:
        db.add(db_course)
        db.commit()
        db.refresh(db_course)
        return db_course
    except IntegrityError as e:
        db.rollback()
        raise

def get_courses(db: Session):
    return db.query(Course).all()
