#Migration script to create tables in the database
from app.database import Base, engine
from app.models import branch  # Import tất cả các model bạn muốn tạo bảng

# Tạo toàn bộ bảng từ các model đã khai báo
Base.metadata.create_all(bind=engine)
print("✅ Database tables created!")
