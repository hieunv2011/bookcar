"""Add vehicle_id to driving_lesson_participants

Revision ID: 1ca833ed7911
Revises: 623bf6a3ae1f
Create Date: 2025-05-26 10:37:40.150764
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '1ca833ed7911'
down_revision: Union[str, None] = '623bf6a3ae1f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Xoá cột province_id trong bảng branches
    op.drop_column('branches', 'province_id')

    # B1: Thêm cột tạm kiểu Integer
    op.add_column('driving_lesson_participants', sa.Column('vehicle_id_int', sa.Integer(), nullable=True))

    # B2: Chuyển dữ liệu từ VARCHAR -> Integer (nếu chuỗi là số)
    op.execute("""
        UPDATE driving_lesson_participants
        SET vehicle_id_int = vehicle_id::integer
        WHERE vehicle_id ~ '^[0-9]+$'
    """)

    # B3: Xoá cột cũ
    op.drop_column('driving_lesson_participants', 'vehicle_id')

    # B4: Đổi tên cột mới thành vehicle_id
    op.alter_column('driving_lesson_participants', 'vehicle_id_int', new_column_name='vehicle_id')

    # B5: Thêm khóa ngoại
    op.create_foreign_key(
        'fk_driving_lesson_participants_vehicle_id',
        'driving_lesson_participants',
        'vehicles',
        ['vehicle_id'],
        ['id']
    )


def downgrade() -> None:
    """Downgrade schema."""
    # B1: Xoá foreign key
    op.drop_constraint('fk_driving_lesson_participants_vehicle_id', 'driving_lesson_participants', type_='foreignkey')

    # B2: Thêm cột tạm kiểu VARCHAR
    op.add_column('driving_lesson_participants', sa.Column('vehicle_id_str', sa.VARCHAR(), nullable=True))

    # B3: Chuyển dữ liệu từ Integer -> VARCHAR
    op.execute("""
        UPDATE driving_lesson_participants
        SET vehicle_id_str = vehicle_id::varchar
    """)

    # B4: Xoá cột integer
    op.drop_column('driving_lesson_participants', 'vehicle_id')

    # B5: Đổi tên cột tạm thành vehicle_id
    op.alter_column('driving_lesson_participants', 'vehicle_id_str', new_column_name='vehicle_id')

    # B6: Thêm lại cột province_id
    op.add_column('branches', sa.Column('province_id', sa.INTEGER(), autoincrement=False, nullable=True))
