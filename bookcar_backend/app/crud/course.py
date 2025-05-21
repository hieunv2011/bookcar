from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.course import Course
from app.schemas.course import CourseCreate

def create_course(db: Session, course: CourseCreate):
    # Lấy id lớn nhất hiện tại
    max_id = db.query(Course.id).order_by(Course.id.desc()).first()
    next_id = (max_id[0] + 1) if max_id and max_id[0] is not None else 1
    db_course = Course(id=next_id, **course.dict())
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
