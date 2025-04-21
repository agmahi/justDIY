import fitz
from app.services.clause_parser import extract_clauses

def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file using PyMuPDF (fitz).
    
    Args:
        pdf_path (str): Path to the PDF file.
        
    Returns:
        str: Extracted text from the PDF.
    """
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

print("Extracting text from PDF...")
raw_text = extract_text_from_pdf("/Users/amahi/Downloads/EN_US_Arcade_Promo_TandCs.pdf")


clauses = extract_clauses(raw_text)
for clause in clauses:
    print(f"Step {clause.step}: {clause.title}")
    print(f"Summary: {clause.summary}")
    print(f"Raw Text: {clause.raw_text[:100]}...")  # Print first 100 chars of raw text
    print("-" * 40)