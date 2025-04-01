from fastapi import APIRouter, UploadFile, File, Form 
from app.models.schemas import InstructionResponse, Step
from app.services import parser, image_generator
from typing import Optional
import uuid

router = APIRouter()

@router.post("/instructions/submit", response_model=InstructionResponse)
async def submit_instruction(
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    """ Submit an instruction with optional text or file.
    """
    if not text and not file:
        return InstructionResponse(job_id=str(uuid.uuid4()), status="Error: No input provided")

    # Here you would typically process the instruction (text or file)
    # For demonstration, we are just returning a mock response
    job_id = str(uuid.uuid4())
    
    parsed_steps = parser.parse_instructions(text)
    steps_with_images = image_generator.generate_images(parsed_steps)

    #The **step syntax is Python's dictionary unpacking feature. 
    # It passes the key-value pairs of the dictionary as keyword arguments to the Step constructor.
    steps = [Step(**step) for step in steps_with_images]
    
    status = "parsed" if text or file else "failed"
    # Later, you would handle the instruction processing here

    print("=== Final Steps Before Returning ===")
    for step in steps:
        print(step)

    return InstructionResponse(job_id=job_id, status=status, steps=steps)