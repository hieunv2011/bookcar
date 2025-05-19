from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/test", tags=["Test"])

# Gây lỗi 404
@router.get("/notfound")
def raise_404():
    raise HTTPException(status_code=404, detail="Không tìm thấy tài nguyên")

# Gây lỗi 422 (validation)
@router.get("/validate/{item_id}")
def validate_item(item_id: int):  # truyền chuỗi sẽ gây lỗi
    return {"item_id": item_id}

# Gây lỗi không xác định
@router.get("/crash")
def crash():
    1 / 0  # chia cho 0 gây lỗi runtime
