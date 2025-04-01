import re
from typing import List, Dict

def parse_instructions(raw_text: str) -> List[Dict]:
    """
    Parses the instruction text to extract steps
    """
    # Define a regex pattern to match steps in the format "Step X: Description"
    pattern = r"(?:Step\s*(\d+):\s*)(.+?)(?=(?:Step\s*\d+:)|$)"
    # Find all matches in the text
    matches = re.findall(pattern, raw_text, re.DOTALL | re.IGNORECASE)
    
    parsed = [{"step": int(step_num), "instruction": instr.strip()} for step_num, instr in matches]
    return parsed