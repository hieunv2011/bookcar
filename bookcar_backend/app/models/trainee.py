from sqlalchemy import Column, Integer, String, Date, DateTime, Text, Boolean, ForeignKey, Float
from app.database import Base

class Trainee(Base):
    __tablename__ = "trainees"

    id = Column(Integer, primary_key=True, autoincrement=True)
    so_tt = Column(Integer)
    ma_dk = Column(String)
    ho_ten_dem = Column(String)
    ten = Column(String)
    ho_va_ten = Column(String)
    ngay_sinh = Column(Date)
    ma_quoc_tich = Column(String)
    ten_quoc_tich = Column(String)
    noi_tt = Column(String)
    noi_tt_ma_dvhc = Column(String)
    noi_tt_ma_dvql = Column(String)
    noi_ct = Column(String)
    noi_ct_ma_dvhc = Column(String)
    noi_ct_ma_dvql = Column(String)
    so_cmt = Column(String)
    ngay_cap_cmt = Column(Date)
    noi_cap_cmt = Column(String)
    gioi_tinh = Column(String)
    ho_va_ten_in = Column(String)
    so_ho_so = Column(String)
    ma_dv_nhan_hoso = Column(String)
    ten_dv_nhan_hoso = Column(String)
    ngay_nhan_hoso = Column(Date)
    nguoi_nhan_hoso = Column(String)
    ma_loai_hoso = Column(String)
    ten_loai_hoso = Column(String)
    anh_chan_dung = Column(String)
    chat_luong_anh = Column(Integer)
    ngay_thu_nhan_anh = Column(Date)
    nguoi_thu_nhan_anh = Column(String)
    so_gplx_da_co = Column(String)
    hang_gplx_da_co = Column(String)
    dv_cap_gplx_daco = Column(String)
    ten_dv_cap_gplx_daco = Column(String)
    noi_cap_gplx_daco = Column(String)
    ngay_cap_gplx_daco = Column(Date)
    ngay_hh_gplx_daco = Column(Date)
    ngay_tt_gplx_daco = Column(Date)
    ma_noi_hoc_laixe = Column(String)
    ten_noi_hoc_laixe = Column(String)
    nam_hoc_laixe = Column(Integer)
    so_nam_laixe = Column(Integer)
    so_km_antoan = Column(Integer)
    giay_cnsk = Column(String)
    hinh_thuc_cap = Column(String)
    hang_gplx = Column(String)
    hang_daotao = Column(String)
    rfid_card = Column(String)
    indoor_hour = Column(Integer)
    outdoor_hour = Column(Integer)
    fingerprint_count = Column(Integer)
    face_count = Column(Integer)
    course_id = Column(Integer, ForeignKey("courses.id"))
    rfid_card_name = Column(String)
    outdoor_distance = Column(Integer)
    outdoor_session_count = Column(Integer)
    faceid_failed_count = Column(Integer)
    faceid_success_count = Column(Integer)
    status1 = Column(Integer)
    status2 = Column(Integer)
    synced = Column(Boolean)
    sync_error = Column(Text)
    synced_outdoor_hours = Column(Float)
    synced_outdoor_distance = Column(Float)
    synced_verified_date = Column(DateTime)
    synced_outdoor_status = Column(Integer)
    anh_chan_dung_url = Column(String)
    night_duration = Column(Integer)
    auto_duration = Column(Integer)
    inactive_face_count = Column(Integer)
    lms_status = Column(Integer)
    password = Column(String)
    created_date = Column(DateTime)
    updated_date = Column(DateTime)
    created_by = Column(String)
    updated_by = Column(String)
