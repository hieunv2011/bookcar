#Migration script to create tables in the database
from app.database import Base, engine

# Import models from /models
from app.models import branch
from app.models import vehicle

# Tạo toàn bộ bảng từ các model đã khai báo
Base.metadata.create_all(bind=engine)
print("✅ Database tables created!")
