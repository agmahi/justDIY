from pydantic import BaseModel
from typing import List, Optional

class Step(BaseModel):
    step: int
    instruction: str
    image_url: Optional[str] = None  # Optional for now

class VisualClause(BaseModel):
    step: Optional[int] = None  # Optional for now, can be used for ordering
    title: str     # e.g. "Subscription Terms"
    summary: str   # simplified explanation
    raw_text: str  # original text from the document
    icon_prompt: Optional[str] = None  # description for image generation
    image_url: Optional[str] = None  # URL of the generated image, if available

class InstructionResponse(BaseModel):
    job_id: str
    status: str
    steps: List[VisualClause]
