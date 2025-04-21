from fastapi import (
    APIRouter, 
    UploadFile, 
    File, 
    Form, 
    Depends, 
    BackgroundTasks, 
    HTTPException
    )
from app.models.schemas import InstructionResponse, Step, VisualClause
from app.services import parser, image_generator, clause_extractor
from typing import Optional
from sqlalchemy.orm import Session
from app.core.config import SessionLocal
from app.models import db_models
import asyncio
import uuid

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.post("/instructions/submit", response_model=InstructionResponse)
async def submit_instruction(
    background_tasks: BackgroundTasks,
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """ Submit an instruction with optional text or file.
    """
    if not text and not file:
        return InstructionResponse(job_id=str(uuid.uuid4()), status="Error: No input provided")
    clauses = []
    job_id = str(uuid.uuid4())
    parsed_clauses = clause_extractor.extract_clauses(text)
    extracted_clauses = []
    for clause in parsed_clauses:
        print(f"Title: {clause.title}")
        
    # parsed_steps = parser.parse_instructions(text)
    # steps_with_images = image_generator.generate_images(parsed_steps)

    # Save Job
    job = db_models.Job(id=job_id, status="pending")
    db.add(job)
    db.commit()

    # background_tasks.add_task(process_image_generation, job_id, parsed_clauses)

    # Save Steps
    for clause in parsed_clauses:
        db_step = db_models.Clause(
            job_id=job_id,
            title=clause.title,
            summary=clause.summary,
            icon_prompt=clause.icon_prompt if clause.icon_prompt else None,  # Handle optional icon_prompt
            # id=clause.step,  # Assuming step is an integer
            raw_text=clause.raw_text,
            image_url=clause.image_url if clause.image_url else None,  # Handle optional image_url
        )
        db.add(db_step)
        clauses.append(clause)
    job = db.query(db_models.Job).filter(db_models.Job.id == job_id).first()
    job.status = "Completed - Clauses Extracted"
    db.commit()

    #The **step syntax is Python's dictionary unpacking feature. 
    # It passes the key-value pairs of the dictionary as keyword arguments to the Step constructor.
    # steps = [Step(**step) for step in steps_with_images]
    
    status = "parsed" if text or file else "failed"
    # Later, you would handle the instruction processing here

    return InstructionResponse(job_id=job_id, status=status, steps=[])

@router.get("/jobs/{job_id}", response_model=InstructionResponse)
def get_job(job_id: str, db: Session = Depends(get_db)):
    """ Get job status and steps by job ID.
    """
    job = db.query(db_models.Job).filter(db_models.Job.id == job_id).first()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        # return InstructionResponse(job_id=job_id, status="Job not found", steps=[])

    # steps = db.query(db_models.Step).filter(db_models.Step.job_id == job_id).order_by(db_models.Step.step_number).all()
    clauses = db.query(db_models.Clause).filter(db_models.Clause.job_id == job_id).all()
    parsed_clauses = [
        VisualClause(
            # step=clause.id,  # Assuming id is used as step number
            title = clause.title,
            summary = clause.summary,
            raw_text = clause.raw_text,
            icon_prompt=clause.icon_prompt,
            image_url=clause.image_url,
        )
        for clause in clauses
    ]

    return InstructionResponse(job_id=job_id, status=job.status, steps=parsed_clauses)


def process_image_generation(job_id: str, parsed_steps: list):
    """ Background task to process image generation.
    """
    # Simulate a long-running task
    asyncio.sleep(5)

    db = SessionLocal()
    try:
        steps_with_images = image_generator.generate_images(parsed_steps)
        # Save steps
        for step in steps_with_images:
            db_step = db_models.Step(
                job_id=job_id,
                step_number=int(step["step"]),
                instruction=step["instruction"],
                image_url=step["image_url"]
            )
            db.add(db_step)

        # Update job status
        job = db.query(db_models.Job).filter(db_models.Job.id == job_id).first()
        job.status = "images_generated"
        db.commit()
    finally:
        db.close()    
    # Here you would implement the actual image generation logic
    # For example, you could call a function from the image_generator module
    # image_generator.generate_images(parsed_steps)