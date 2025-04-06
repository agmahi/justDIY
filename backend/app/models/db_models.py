from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.config import Base

class Job(Base):
    __tablename__ = "jobs"
    id = Column(String(36), primary_key=True, index=True)
    status = Column(String(50), default="created")
    steps = relationship("Step", back_populates="job")

class Step(Base):
    __tablename__ = "steps"
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String(36), ForeignKey("jobs.id"))
    step_number = Column(Integer)
    instruction = Column(String)
    image_url = Column(String)

    job = relationship("Job", back_populates="steps")