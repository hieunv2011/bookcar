from fastapi import APIRouter, Depends, Query, HTTPException, Body, Response, status
from sqlalchemy.orm import Session
from jose import jwt
from datetime import timedelta, datetime
from passlib.context import CryptContext
from pydantic import BaseModel
from app.database import SessionLocal
from app.schemas.user import UserCreate, UserOut, UserBase
from app.crud import user
from app.models.user import User
from app.models.customer import Customer
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/api/v1/users", tags=["Users"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    db_user = user.get_user_by_email(db, user_in.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user.create_user(db, user_in)

@router.get("/", response_model=list[UserOut])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user.get_users(db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user.get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, user_in: UserBase, db: Session = Depends(get_db)):
    db_user = user.get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.update_user(db, db_user, user_in)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user.get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user.delete_user(db, db_user)
    return None

# Login model
class UserLoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login_user(
    body: UserLoginRequest = Body(...),
    db: Session = Depends(get_db),
    response: Response = None
):
    db_user = db.query(User).filter(User.email == body.email).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")
    if not pwd_context.verify(body.password, db_user.password_hash):  # Đúng tên trường
        raise HTTPException(status_code=401, detail="Wrong password")

    data = {
        "sub": str(db_user.id),
        "email": db_user.email,
        "role": "admin" if db_user.is_admin else "user",
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

    user_data = {k: v for k, v in db_user.__dict__.items() if not k.startswith('_')}

    # Fetch associated customer data
    if db_user.customer_id:
        customer = db.query(Customer).filter(Customer.id == db_user.customer_id).first()
        user_data["customer"] = customer

    return user_data
