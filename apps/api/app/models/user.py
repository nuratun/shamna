from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=True)
    email = Column(String, nullable=True)
    profile_pic = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    standing = Column(String, nullable=False, default="good")  # good | warned | suspended
    warning_reason = Column(String, nullable=True)
    user_type = Column(String, default="regular")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())