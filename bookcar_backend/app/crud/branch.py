# Like Controller in Node.js
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app import models
from app.schemas.branch import BranchCreate

def create_branch(db: Session, branch: BranchCreate):
    db_branch = models.branch.Branch(**branch.dict())
    try:
        db.add(db_branch)
        db.commit()
        db.refresh(db_branch)
        return db_branch
    except IntegrityError as e:
        db.rollback()
        if 'unique constraint' in str(e.orig).lower() or 'duplicate key value' in str(e.orig).lower():
            raise Exception(f"id '{db_branch.id}' already exists")
        raise

def get_branches(db: Session):
    return db.query(models.branch.Branch).all()
