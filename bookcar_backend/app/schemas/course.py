from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class CourseBase(BaseModel):
    ma_giao_dich: Optional[str] = None
    ma_dv_gui: Optional[str] = None
    ten_dv_gui: Optional[str] = None
    ngay_gui: Optional[datetime] = None
    nguoi_gui: Optional[str] = None
    tong_so_ban_ghi: Optional[int] = None
    ma_bci: Optional[str] = None
    ma_so_gtvt: Optional[str] = None
    ten_so_gtvt: Optional[str] = None
    ma_csdt: Optional[str] = None
    ten_csdt: Optional[str] = None
    ma_khoa_hoc: Optional[str] = None
    ten_khoa_hoc: Optional[str] = None
    ma_hang_dao_tao: Optional[str] = None
    hang_gplx: Optional[str] = None
    so_bci: Optional[str] = None
    ngay_bci: Optional[datetime] = None
    luu_luong: Optional[int] = None
    so_hoc_sinh: Optional[int] = None
    ngay_khai_giang: Optional[datetime] = None
    ngay_be_giang: Optional[datetime] = None
    so_qd_kg: Optional[str] = None
    ngay_qd_kg: Optional[datetime] = None
    ngay_sat_hach: Optional[datetime] = None
    thoi_gian_dt: Optional[int] = None
    so_qdkt: Optional[str] = None
    ddkt: Optional[str] = None
    so_qdtt: Optional[str] = None
    status: Optional[int] = None
    card_status: Optional[int] = None
    stats: Optional[Any] = None
    branch_id: Optional[int] = None
    synced: Optional[bool] = None
    sync_error: Optional[str] = None
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    id: int
    class Config:
        orm_mode = True
