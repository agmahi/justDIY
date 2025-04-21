from sqlalchemy import Column, Integer, String, ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.config import Base

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String(36), primary_key=True, index=True)
    status = Column(String(50), default="created")
    clauses = relationship("Clause", back_populates="job")

class Clause(Base):
    __tablename__ = "clauses"
    id = Column(Integer, primary_key=True, index=False, autoincrement=True)
    job_id = Column(String(36), ForeignKey("jobs.id"))
    title = Column(String(255))
    summary = Column(String(500))
    raw_text = Column(Text, nullable=False)
    icon_prompt = Column(String(500), nullable=True)
    image_url = Column(String, nullable=True)  # Added nullable=True for image_url


    job = relationship("Job", back_populates="clauses")

    __table_args__ = (
        UniqueConstraint("id", "job_id", name="uq_job_clause"),
    )