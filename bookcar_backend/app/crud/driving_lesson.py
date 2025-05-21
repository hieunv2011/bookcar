from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.driving_lesson import DrivingLesson
from app.schemas.driving_lesson import DrivingLessonCreate, DrivingLessonUpdate

# Create
def create_driving_lesson(db: Session, lesson_in: DrivingLessonCreate):
    db_lesson = DrivingLesson(**lesson_in.dict())
    try:
        db.add(db_lesson)
        db.commit()
        db.refresh(db_lesson)
        return db_lesson
    except IntegrityError:
        db.rollback()
        raise

# Read all
def get_driving_lessons(db: Session):
    return db.query(DrivingLesson).all()

# Read one
def get_driving_lesson(db: Session, lesson_id: int):
    return db.query(DrivingLesson).filter(DrivingLesson.id == lesson_id).first()

# Get all driving lessons by course_id
def get_driving_lessons_by_course(db: Session, course_id: int):
    return db.query(DrivingLesson).filter(DrivingLesson.course_id == course_id).all()

# Get all driving lessons by trainee_id and course_id
def get_driving_lessons_by_trainee_and_course(db: Session, trainee_id: int, course_id: int):
    from app.models.driving_lesson import DrivingLessonParticipant
    return (
        db.query(DrivingLesson)
        .join(DrivingLessonParticipant, DrivingLesson.id == DrivingLessonParticipant.driving_lesson_id)
        .filter(DrivingLessonParticipant.trainee_id == trainee_id)
        .filter(DrivingLesson.course_id == course_id)
        .all()
    )

# Update
def update_driving_lesson(db: Session, lesson_id: int, lesson_in: DrivingLessonUpdate):
    db_lesson = db.query(DrivingLesson).filter(DrivingLesson.id == lesson_id).first()
    if not db_lesson:
        return None
    for field, value in lesson_in.dict(exclude_unset=True).items():
        setattr(db_lesson, field, value)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

# Delete
def delete_driving_lesson(db: Session, lesson_id: int):
    db_lesson = db.query(DrivingLesson).filter(DrivingLesson.id == lesson_id).first()
    if not db_lesson:
        return None
    db.delete(db_lesson)
    db.commit()
    return db_lesson
