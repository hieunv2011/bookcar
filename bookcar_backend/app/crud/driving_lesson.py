from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.driving_lesson import DrivingLesson, DrivingLessonParticipant
from app.models.course import Course
from app.models.vehicle import Vehicle
from app.models.trainee import Trainee
from app.schemas.driving_lesson import DrivingLessonCreate, DrivingLessonUpdate
from app.schemas.driving_lesson_participant import DrivingLessonParticipantCreate

# Create
#Tạo bài học lái xe-> tạo luôn driving lesson participant với vehicle_id, driving_lesson_id, trainee_id=None
def create_driving_lesson(db: Session, lesson_in: DrivingLessonCreate):
    # Lấy course tương ứng
    course = db.query(Course).filter(Course.id == lesson_in.course_id).first()
    if not course:
        raise ValueError("Course not found")

    # Copy hang_gplx từ course
    data = lesson_in.dict()
    data["hang_gplx"] = course.hang_gplx

    # Tạo driving lesson
    db_lesson = DrivingLesson(**data)
    try:
        db.add(db_lesson)
        db.commit()
        db.refresh(db_lesson)
    except IntegrityError:
        db.rollback()
        raise

    # Lấy branch_id của course
    branch_id = course.branch_id

    # Lấy các vehicle trong branch có hang trùng hang_gplx
    vehicles = (
        db.query(Vehicle)
        .filter(Vehicle.branch_id == branch_id, Vehicle.hang == data["hang_gplx"])
        .all()
    )

    # Tạo DrivingLessonParticipant với vehicle_id, driving_lesson_id, trainee_id=None
    for vehicle in vehicles:
        participant = DrivingLessonParticipant(
            driving_lesson_id=db_lesson.id,
            vehicle_id=vehicle.id,
            vehicle_plate=vehicle.plate,
            trainee_id=None
        )
        db.add(participant)

    db.commit()

    return db_lesson
    # Lấy course tương ứng
    course = db.query(Course).filter(Course.id == lesson_in.course_id).first()
    if not course:
        raise ValueError("Course not found")

    # Copy hang_gplx từ course
    data = lesson_in.dict()
    data["hang_gplx"] = course.hang_gplx

    db_lesson = DrivingLesson(**data)
    try:
        db.add(db_lesson)
        db.commit()
        db.refresh(db_lesson)
        return db_lesson
    except IntegrityError:
        db.rollback()
        raise
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

# Get all driving lessons by trainee_id
def get_driving_lessons_by_trainee(db: Session, trainee_id: int):
    course_ids = (
        db.query(Trainee.course_id)
        .filter(Trainee.id == trainee_id)
        .all()
    )
    course_ids = [c[0] for c in course_ids]

    if not course_ids:
        return []


    driving_lessons = (
        db.query(DrivingLesson)
        .filter(DrivingLesson.course_id.in_(course_ids))
        .all()
    )
    return driving_lessons

# Get participants by driving lesson id
def get_participants_by_lesson(db: Session, lesson_id: int):
    return db.query(DrivingLessonParticipant).filter(
        DrivingLessonParticipant.driving_lesson_id == lesson_id
    ).all()

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

#Update participants with selected from frontend
def create_driving_lesson_participants(db: Session, participants_data: list[DrivingLessonParticipantCreate]):
    created = []
    for data in participants_data:
        data_dict = data.model_dump()

        if not data_dict.get("vehicle_id") and data_dict.get("vehicle_plate"):
            existing = db.query(DrivingLessonParticipant).filter(
                DrivingLessonParticipant.vehicle_plate == data_dict["vehicle_plate"]
            ).first()
            if existing and existing.vehicle_id:
                data_dict["vehicle_id"] = existing.vehicle_id
            else:
                raise ValueError(f"Không tìm thấy vehicle_id tương ứng với biển số: {data_dict['vehicle_plate']} trong DrivingLessonParticipant")

        participant = DrivingLessonParticipant(**data_dict)
        db.add(participant)
        created.append(participant)

    db.commit()
    for p in created:
        db.refresh(p)
    return created

#Get participants by trainee_id
def get_participants_by_trainee(db: Session, trainee_id: int):
    return db.query(DrivingLessonParticipant).filter(
        DrivingLessonParticipant.trainee_id == trainee_id
    ).all()