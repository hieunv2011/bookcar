from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.trainee import TraineeCreate, TraineeOut
from app.crud import trainee

router = APIRouter(prefix="/trainees", tags=["Trainees"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=TraineeOut)
def create_trainee(trainee_in: TraineeCreate, db: Session = Depends(get_db)):
    return trainee.create_trainee(db, trainee_in)

@router.get("/", response_model=list[TraineeOut])
def read_trainees(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100)
):
    skip = (page - 1) * page_size
    limit = page_size
    return trainee.get_trainees(db, skip=skip, limit=limit)
