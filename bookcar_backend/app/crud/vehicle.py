from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate

def create_vehicle(db: Session, vehicle: VehicleCreate):
    db_vehicle = Vehicle(**vehicle.dict())
    try:
        db.add(db_vehicle)
        db.commit()
        db.refresh(db_vehicle)
        return db_vehicle
    except IntegrityError as e:
        db.rollback()
        if 'unique constraint' in str(e.orig).lower() or 'duplicate key value' in str(e.orig).lower():
            raise Exception(f"plate '{db_vehicle.plate}' already exists")
        raise

def get_vehicles(db: Session):
    return db.query(Vehicle).all()
