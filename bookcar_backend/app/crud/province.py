from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.province import Province
from app.schemas.province import ProvinceCreate, ProvinceUpdate

def create_province(db: Session, province: ProvinceCreate):
    db_province = Province(**province.dict())
    try:
        db.add(db_province)
        db.commit()
        db.refresh(db_province)
        return db_province
    except IntegrityError as e:
        db.rollback()
        raise Exception("Province creation failed: " + str(e))

def get_province(db: Session, province_id: int):
    return db.query(Province).filter(Province.id == province_id).first()

def get_provinces(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Province).offset(skip).limit(limit).all()

def update_province(db: Session, province_id: int, province: ProvinceUpdate):
    db_province = db.query(Province).filter(Province.id == province_id).first()
    if not db_province:
        return None
    for key, value in province.dict(exclude_unset=True).items():
        setattr(db_province, key, value)
    db.commit()
    db.refresh(db_province)
    return db_province

def delete_province(db: Session, province_id: int):
    db_province = db.query(Province).filter(Province.id == province_id).first()
    if not db_province:
        return None
    db.delete(db_province)
    db.commit()
    return db_province
