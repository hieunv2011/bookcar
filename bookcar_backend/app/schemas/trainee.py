from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class TraineeBase(BaseModel):
    so_tt: Optional[int] = None
    ma_dk: Optional[str] = None
    ho_ten_dem: Optional[str] = None
    ten: Optional[str] = None
    ho_va_ten: Optional[str] = None
    ngay_sinh: Optional[date] = None
    ma_quoc_tich: Optional[str] = None
    ten_quoc_tich: Optional[str] = None
    noi_tt: Optional[str] = None
    noi_tt_ma_dvhc: Optional[str] = None
    noi_tt_ma_dvql: Optional[str] = None
    noi_ct: Optional[str] = None
    noi_ct_ma_dvhc: Optional[str] = None
    noi_ct_ma_dvql: Optional[str] = None
    so_cmt: Optional[str] = None
    ngay_cap_cmt: Optional[date] = None
    noi_cap_cmt: Optional[str] = None
    gioi_tinh: Optional[str] = None
    ho_va_ten_in: Optional[str] = None
    so_ho_so: Optional[str] = None
    ma_dv_nhan_hoso: Optional[str] = None
    ten_dv_nhan_hoso: Optional[str] = None
    ngay_nhan_hoso: Optional[date] = None
    nguoi_nhan_hoso: Optional[str] = None
    ma_loai_hoso: Optional[str] = None
    ten_loai_hoso: Optional[str] = None
    anh_chan_dung: Optional[str] = None
    chat_luong_anh: Optional[int] = None
    ngay_thu_nhan_anh: Optional[date] = None
    nguoi_thu_nhan_anh: Optional[str] = None
    so_gplx_da_co: Optional[str] = None
    hang_gplx_da_co: Optional[str] = None
    dv_cap_gplx_daco: Optional[str] = None
    ten_dv_cap_gplx_daco: Optional[str] = None
    noi_cap_gplx_daco: Optional[str] = None
    ngay_cap_gplx_daco: Optional[date] = None
    ngay_hh_gplx_daco: Optional[date] = None
    ngay_tt_gplx_daco: Optional[date] = None
    ma_noi_hoc_laixe: Optional[str] = None
    ten_noi_hoc_laixe: Optional[str] = None
    nam_hoc_laixe: Optional[int] = None
    so_nam_laixe: Optional[int] = None
    so_km_antoan: Optional[int] = None
    giay_cnsk: Optional[str] = None
    hinh_thuc_cap: Optional[str] = None
    hang_gplx: Optional[str] = None
    hang_daotao: Optional[str] = None
    rfid_card: Optional[str] = None
    indoor_hour: Optional[int] = None
    outdoor_hour: Optional[int] = None
    fingerprint_count: Optional[int] = None
    face_count: Optional[int] = None
    course_id: Optional[int] = None
    rfid_card_name: Optional[str] = None
    outdoor_distance: Optional[int] = None
    outdoor_session_count: Optional[int] = None
    faceid_failed_count: Optional[int] = None
    faceid_success_count: Optional[int] = None
    status1: Optional[int] = None
    status2: Optional[int] = None
    synced: Optional[bool] = None
    sync_error: Optional[str] = None
    synced_outdoor_hours: Optional[float] = None
    synced_outdoor_distance: Optional[float] = None
    synced_verified_date: Optional[datetime] = None
    synced_outdoor_status: Optional[int] = None
    anh_chan_dung_url: Optional[str] = None
    night_duration: Optional[int] = None
    auto_duration: Optional[int] = None
    inactive_face_count: Optional[int] = None
    lms_status: Optional[int] = None
    password: Optional[str] = None
    created_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None

class TraineeCreate(TraineeBase):
    pass

class TraineeOut(TraineeBase):
    id: int
    class Config:
        orm_mode = True
