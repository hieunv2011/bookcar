from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.vehicle import VehicleCreate, VehicleOut
from app.crud import vehicle

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=VehicleOut)
def create_vehicle(vehicle_in: VehicleCreate, db: Session = Depends(get_db)):
    return vehicle.create_vehicle(db, vehicle_in)

@router.get("/", response_model=list[VehicleOut])
def read_vehicles(db: Session = Depends(get_db)):
    return vehicle.get_vehicles(db)
