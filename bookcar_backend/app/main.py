# main.py
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.handlers import exception_handler
from fastapi.middleware.cors import CORSMiddleware

from app.routers import branch, vehicle, course, trainee, test, driving_lesson

app = FastAPI()

# Thêm middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký custom exception handler
app.add_exception_handler(StarletteHTTPException, exception_handler.http_exception_handler)
app.add_exception_handler(RequestValidationError, exception_handler.validation_exception_handler)
app.add_exception_handler(Exception, exception_handler.generic_exception_handler)

app.include_router(branch.router)
app.include_router(vehicle.router)
app.include_router(course.router)
app.include_router(trainee.router)
app.include_router(test.router)
app.include_router(driving_lesson.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}