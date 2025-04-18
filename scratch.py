import re
from typing import List
from app.models.schemas import VisualClause

def extract_clauses(raw_text: str) -> List[VisualClause]:
    sections = re.split(r"\n{2,}|\.\s+", raw_text)
    sections = [s.strip() for s in sections if len(s.strip()) > 20]  # Filter out very short sections

    clauses = []
    for i, section in enumerate(sections, start=1):
        summary, title = simplify_clause(section)
        clauses.append(
            VisualClause(
                step=i,
                title=title,
                summary=summary,
                raw_text=section
            )
        )
    return clauses


def simplify_clause(text: str) -> tuple[str, str]:
    text_lower = text.lower()
    if "subscription" in text_lower:
        return ("The subscription auto-renews after trial.", "Subscription Terms")
    if "family" in text_lower:
        return ("You can share with up to 5 family members.", "Family Sharing")
    if "cancel" in text_lower:
        return ("You can cancel the subscription anytime.", "Cancellation")
    if "eligible" in text_lower or "device" in text_lower:
        return ("You must buy a new device to qualify.", "Device Eligibility")
    return ("General condition of the offer.", "Other")