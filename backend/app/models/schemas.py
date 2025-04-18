from pydantic import BaseModel
from typing import List, Optional

class Step(BaseModel):
    step: int
    instruction: str
    image_url: Optional[str] = None  # Optional for now

class InstructionResponse(BaseModel):
    job_id: str
    status: str
    steps: List[Step]

class VisualClause(BaseModel):
    step: int
    title: str     # e.g. "Subscription Terms"
    summary: str   # simplified explanation
    raw_text: str  # original text from the document
