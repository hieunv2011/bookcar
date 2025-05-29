from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.driving_lesson import DrivingLessonCreate, DrivingLessonUpdate, DrivingLessonOut
from app.schemas.driving_lesson_participant import DrivingLessonParticipantCreate, DrivingLessonParticipantOut
from app.crud import driving_lesson

router = APIRouter(prefix="/api/v1/driving-lessons", tags=["DrivingLesson"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=DrivingLessonOut)
def create_lesson(lesson_in: DrivingLessonCreate, db: Session = Depends(get_db)):
    return driving_lesson.create_driving_lesson(db, lesson_in)

@router.get("/", response_model=list[DrivingLessonOut])
def read_lessons(db: Session = Depends(get_db)):
    return driving_lesson.get_driving_lessons(db)

@router.get("/{lesson_id}", response_model=DrivingLessonOut)
def read_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = driving_lesson.get_driving_lesson(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Driving lesson not found")
    return lesson

@router.put("/{lesson_id}", response_model=DrivingLessonOut)
def update_lesson(lesson_id: int, lesson_in: DrivingLessonUpdate, db: Session = Depends(get_db)):
    lesson = driving_lesson.update_driving_lesson(db, lesson_id, lesson_in)
    if not lesson:
        raise HTTPException(status_code=404, detail="Driving lesson not found")
    return lesson

@router.delete("/{lesson_id}", response_model=DrivingLessonOut)
def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = driving_lesson.delete_driving_lesson(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Driving lesson not found")
    return lesson

@router.get("/course/{course_id}", response_model=list[DrivingLessonOut])
def get_lessons_by_course(course_id: int, db: Session = Depends(get_db)):
    return driving_lesson.get_driving_lessons_by_course(db, course_id)


@router.get("/trainee/{trainee_id}", response_model=list[DrivingLessonOut])
def get_lessons_by_trainee(trainee_id: int, db: Session = Depends(get_db)):
    lessons = driving_lesson.get_driving_lessons_by_trainee(db, trainee_id)
    if not lessons:
        raise HTTPException(status_code=404, detail="No driving lessons found for this trainee")
    return lessons


@router.get("/participants/lesson-id/{lesson_id}", response_model=list[DrivingLessonParticipantOut])
def get_participants(lesson_id: int, db: Session = Depends(get_db)):
    participants = driving_lesson.get_participants_by_lesson(db, lesson_id)
    return participants

@router.get("/participants/trainee-id/{trainee_id}", response_model=list[DrivingLessonParticipantOut])
def get_participants_by_trainee(trainee_id: int, db: Session = Depends(get_db)):
    participants = driving_lesson.get_participants_by_trainee(db, trainee_id)
    if not participants:
        raise HTTPException(status_code=404, detail="No participants found for this trainee")
    return participants

@router.post("/participants", response_model=list[DrivingLessonParticipantOut])
def create_participants(
    participants: list[DrivingLessonParticipantCreate],
    db: Session = Depends(get_db)
):
    return driving_lesson.create_driving_lesson_participants(db, participants)