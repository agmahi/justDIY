import requests
import json
from typing import List, Dict


def parse_clauses_with_llm(raw_text: str) -> List[Dict]:
    prompt = f"""
        You are a helpful assistant that reads legal terms of service and summarizes them into simple clauses.
        Your task:
            - Extract key clauses from the following document
            - For each clause, return:
                - title: a short heading
                - summary: a 1 or 2 line plain English explanation
                - icon_prompt: a visual description for image generation
                - raw_text: the original clause text
            
            Respond ONLY with raw JSON, nothing else. Example:
            [
                {{"title": "Subscription Terms", "summary": "Trial ends after 3 months.", "icon_prompt": "credit card renewal", "raw_text": "..."}},
                ...
            ]
        Document:
        {raw_text}
        """

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={"model": "llama3", "prompt": prompt, "stream": False, "max_tokens": 1500},
    )

    if response.ok:
        raw_output = response.json()["response"]
        try:
            return json.loads(raw_output)
        except Exception as e:
            return []
    else:
        raise Exception(f"LLM call failed: {response.status_code}")
