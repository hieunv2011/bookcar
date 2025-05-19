# Like Controller in Node.js
from sqlalchemy.orm import Session
from app import models
from app.schemas.branch import BranchCreate

def create_branch(db: Session, branch: BranchCreate):
    db_branch = models.branch.Branch(**branch.dict())
    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)
    return db_branch

def get_branches(db: Session):
    return db.query(models.branch.Branch).all()
