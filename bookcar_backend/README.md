# BookCar Backend - FastAPI

## Mục lục
- [Giới thiệu](#giới-thiệu)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt & Khởi tạo](#cài-đặt--khởi-tạo)
- [Chạy server](#chạy-server)
- [Quy trình phát triển API mới](#quy-trình-phát-triển-api-mới)
- [Alembic - Database Migration](#alembic---database-migration)
- [Ghi chú](#ghi-chú)

---

## Giới thiệu
Đây là backend cho hệ thống BookCar, sử dụng FastAPI, SQLAlchemy và PostgreSQL.

## Yêu cầu hệ thống
- Python >= 3.10
- PostgreSQL
- pip (Python package manager)

## Cấu trúc dự án
```
bookcar_backend/
├── app/
│   ├── main.py           # Điểm khởi động FastAPI
│   ├── config.py         # Cấu hình ứng dụng
│   ├── database.py       # Kết nối DB
│   ├── create_tables.py  # Tạo bảng DB
│   ├── models/           # Định nghĩa ORM models
│   ├── schemas/          # Định nghĩa Pydantic schemas
│   ├── crud/             # Hàm thao tác DB (Create, Read, Update, Delete)
│   └── routers/          # Định nghĩa các route (API endpoints)
├── requirements.txt      # Danh sách package Python
├── .env                  # Thông tin kết nối DB
└── ...
```

## Cài đặt & Khởi tạo
1. **Clone dự án**
2. **Tạo virtual environment** (khuyến nghị):
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. **Cài đặt dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
4. **Cấu hình database:**
   - Sửa file `.env` với thông tin kết nối PostgreSQL:
     ```
     DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db_name>
     ```
5. **Tạo bảng database:**
   ```powershell
   python app/create_tables.py
   ```inside fodler backend
   python -m app.create_tables


## Chạy server
- **Vào thư mục app:**
  ```powershell
  cd app
  uvicorn main:app --reload
  ```
- Hoặc chạy từ ngoài thư mục app:
  ```powershell
  uvicorn app.main:app --reload
  ```

API docs tự động: http://localhost:8000/docs

## Quy trình phát triển API mới
1. **Tạo model mới** trong `app/models/` (ví dụ: `car.py`).
2. **Tạo schema mới** trong `app/schemas/` (ví dụ: `car.py`).
3. **Tạo hàm CRUD** trong `app/crud/` (ví dụ: `car.py`).
4. **Tạo router** trong `app/routers/` (ví dụ: `car.py`).
5. **Import và include router** vào `app/main.py`.
6. **Tạo bảng mới** (nếu cần):
   ```powershell
   python app/create_tables.py
   ```
7. **Test API** qua Swagger UI hoặc Postman.

## Alembic - Database Migration
Alembic là công cụ quản lý migration cho SQLAlchemy, giúp bạn cập nhật cấu trúc database (tạo/sửa/xoá bảng, cột,...) một cách tự động và có kiểm soát.

### Cài đặt Alembic
```powershell
pip install alembic
```

### Khởi tạo Alembic (chạy 1 lần ở thư mục backend)
```powershell
alembic init alembic
```

- Thư mục `alembic/` và file `alembic.ini` sẽ được tạo ra.
- Cấu hình kết nối DB trong `alembic.ini` (sửa dòng sqlalchemy.url=... giống DATABASE_URL trong .env).
- Cấu hình import models trong `alembic/env.py` (thêm models vào target_metadata).

### Tạo migration mới
```powershell
alembic revision --autogenerate -m "Tên migration"
```

### Áp dụng migration lên database
```powershell
alembic upgrade head
```

### Tài liệu tham khảo
- https://alembic.sqlalchemy.org/en/latest/

## Ghi chú
- Đảm bảo PostgreSQL đang chạy và database đã được tạo.
- Có thể chỉnh sửa file `.env` để đổi thông tin kết nối DB.
- Khi thay đổi models, cần chạy lại script tạo bảng.
- Khi thay đổi models, hãy tạo migration mới và upgrade DB bằng Alembic thay vì xoá/tạo lại bảng thủ công.
