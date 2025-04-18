from app.services.clause_extractor import extract_clauses

def test_extract_clauses_from_arcade_terms():
    input_text = """
    Promotion Offer valid for new and qualified returning subscribers only. Must redeem within 3 months after first activating your eligible device.
    Only one offer per Apple ID and only one offer per family if you’re part of a Family Sharing group.
    Plan automatically renews at $6.99/month after promotion until cancelled.
    Restrictions and other terms apply.
    """

    clauses = extract_clauses(input_text)
    print(f"Extracted Clauses: {clauses}")

    assert len(clauses) >= 3
    assert clauses[0].title in ["Subscription Terms", "Device Eligibility", "Other"]
    assert isinstance(clauses[0].summary, str)
    assert "promotion" in clauses[0].raw_text.lower()
