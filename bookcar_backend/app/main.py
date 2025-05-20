# main.py
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.handlers import exception_handler

from app.routers import branch, vehicle, course, trainee, test

app = FastAPI()

# Đăng ký custom exception handler
app.add_exception_handler(StarletteHTTPException, exception_handler.http_exception_handler)
app.add_exception_handler(RequestValidationError, exception_handler.validation_exception_handler)
app.add_exception_handler(Exception, exception_handler.generic_exception_handler)

app.include_router(branch.router)
app.include_router(vehicle.router)
app.include_router(course.router)
app.include_router(trainee.router)
app.include_router(test.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}