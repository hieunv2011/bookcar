# main.py
from fastapi import FastAPI
from app.routers import branch

app = FastAPI()
app.include_router(branch.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}

