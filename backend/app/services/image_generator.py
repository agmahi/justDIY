import uuid
from typing import List, Dict

def generate_images(parsed_steps: List[Dict]) -> List[Dict]:
    """
    Simulate the generation of images based on parsed steps.
    """
    for step in parsed_steps:
        step["image_url"] = f"https://dummyimage.com/600x400/000/fff&text=Step+{step['step']}"
    return parsed_steps