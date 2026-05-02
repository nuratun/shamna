"""add bio, standing, warning_reason to users

Revision ID: 1.2_user_profile_fields
Revises: 1.0
Create Date: 2026-05-02
"""
from alembic import op
import sqlalchemy as sa

revision = "1.2_user_profile_fields"
down_revision = "8a5d4dc3c4c1"
branch_labels = None
depends_on = None

def upgrade():
    op.add_column("users", sa.Column("bio", sa.String(), nullable=True))
    op.add_column("users", sa.Column(
        "standing",
        sa.String(),
        nullable=False,
        server_default="good"
    ))
    op.add_column("users", sa.Column("warning_reason", sa.String(), nullable=True))

def downgrade():
    op.drop_column("users", "bio")
    op.drop_column("users", "standing")
    op.drop_column("users", "warning_reason")