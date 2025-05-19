from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.branch import BranchCreate, BranchOut
from app.crud import branch

router = APIRouter(prefix="/branches", tags=["Branches"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=BranchOut)
def create_branch(branch_in: BranchCreate, db: Session = Depends(get_db)):
    return branch.create_branch(db, branch_in)

@router.get("/", response_model=list[BranchOut])
def read_branches(db: Session = Depends(get_db)):
    return branch.get_branches(db)
