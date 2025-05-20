from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.trainee import Trainee
from app.schemas.trainee import TraineeCreate

def create_trainee(db: Session, trainee: TraineeCreate):
    db_trainee = Trainee(**trainee.dict())
    try:
        db.add(db_trainee)
        db.commit()
        db.refresh(db_trainee)
        return db_trainee
    except IntegrityError as e:
        db.rollback()
        raise

def get_trainees(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Trainee).order_by(Trainee.id).offset(skip).limit(limit).all()
