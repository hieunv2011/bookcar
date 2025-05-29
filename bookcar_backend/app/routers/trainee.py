from fastapi import APIRouter, Depends, Query, HTTPException, Body, Response
from sqlalchemy.orm import Session
from jose import jwt
from datetime import timedelta, datetime
from passlib.context import CryptContext
from pydantic import BaseModel
from app.database import SessionLocal
from app.schemas.trainee import TraineeCreate, TraineeOut
from app.crud import trainee
from app.models.trainee import Trainee
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/v1/trainees", tags=["Trainees"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

class TraineeLoginRequest(BaseModel):
    so_cmt: str
    password: str = ""

@router.post("/login")
def login_trainee(
    body: TraineeLoginRequest = Body(...),
    db: Session = Depends(get_db),
    response: Response = None
):
    trainee = db.query(Trainee).filter(Trainee.so_cmt == body.so_cmt).first()
    if not trainee:
        raise HTTPException(status_code=401, detail="Trainee not found")
    if trainee.password:
        if not pwd_context.verify(body.password, trainee.password):
            raise HTTPException(status_code=401, detail="Wrong password")
    # Lấy tất cả course_id của người này (cùng so_cmt)
    all_trainees = db.query(Trainee).filter(Trainee.so_cmt == body.so_cmt).all()
    course_ids = [t.course_id for t in all_trainees if t.course_id is not None]
    data = {
        "sub": str(trainee.id),
        "so_cmt": trainee.so_cmt,
        "ho_va_ten": trainee.ho_va_ten,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False
    )
    trainee_data = {k: v for k, v in trainee.__dict__.items() if not k.startswith('_')}
    trainee_data["course_ids"] = course_ids
    return trainee_data