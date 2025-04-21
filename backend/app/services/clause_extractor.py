import re
from typing import List
from app.models.schemas import VisualClause
from app.services.llm_client import parse_clauses_with_llm

def extract_clauses(raw_text: str) -> List[VisualClause]:
    clauses = []
    llm_results = parse_clauses_with_llm(raw_text)
    print(f"Extracted {len(llm_results)} clauses from LLM")
    for i, clause in enumerate(llm_results, start=1):
        clauses.append(
            VisualClause(
                step=i,
                title=clause.get("title", "Other"),
                summary=clause.get("summary", ""),
                raw_text=clause.get("raw_text", ""),
                icon_prompt=clause.get("icon_prompt", None),
                image_url=clause.get("image_url", None)
            )
        )

    return clauses
    