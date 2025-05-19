from pydantic import BaseModel

class BranchBase(BaseModel):
    name: str
    address: str

class BranchCreate(BranchBase):
    pass

class BranchOut(BranchBase):
    id: int

    class Config:
        orm_mode = True
