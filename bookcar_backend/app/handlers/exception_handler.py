from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi import status

# Handle common HTTP errors (404, 403, ...)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    # Custom 404 message with path
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"error": True, "message": f"Not found {request.url.path}"},
        )
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": True, "message": exc.detail},
    )

# Handle request validation errors
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"error": True, "message": "Validation error", "details": exc.errors()},
    )

# Handle generic/unexpected errors
async def generic_exception_handler(request: Request, exc: Exception):
    # If the error is about duplicate id, return a clear message
    msg = str(exc)
    if "already exists" in msg or "đã tồn tại" in msg:
        return JSONResponse(
            status_code=400,
            content={"error": True, "message": msg},
        )
    return JSONResponse(
        status_code=500,
        content={"error": True, "message": "Internal server error"},
    )
