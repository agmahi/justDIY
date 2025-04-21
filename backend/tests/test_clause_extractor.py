import os
import sys
import pytest

# Ensure backend is in sys.path
# sys.path.append(os.path.abspath("backend"))

from app.services.clause_extractor import extract_clauses

# Sample input text (excerpt from the Arcade T&Cs or similar)
sample_text = """
Get three months of Apple Arcade when you buy a new iPhone, iPad,
Apple TV, or Mac.
Terms and conditions:
Offer is available for eligible devices for a limited time only.
Offer is not available to current Apple Arcade subscribers. Offer cannot be
combined with Apple One, or other free trials or offers for Apple Arcade.
Only one offer per Family, regardless of number of devices purchased. You can
share your Apple Arcade subscription with up to 5 other family members via
Family Sharing.
This offer is not available if you or your Family have previously accepted an
Apple Arcade three month free offer.
Make sure your device is running the latest iOS, iPadOS, tvOS, or macOS.
Offer must be claimed in the App Store within 3 months after first setting up your
new device. To see the offer appear, you will need to sign in with your Apple
Account on your new device.
Upon claiming the offer, you agree to a $6.99/month subscription that starts
immediately after the free offer period and automatically renews until cancelled.
You can cancel at any time in Settings at least one day before each renewal
date. If you cancel during your free offer period, you and your family members
will immediately lose access to Apple Arcade and the remainder of your free trial.
You can’t reactivate this trial.
Eligible devices:
●
Any new iPhone, iPad, Apple TV, or Mac capable of running the latest iOS,
iPadOS, tvOS, or macOS, from Apple or an Apple authorized reseller.
"""

def test_extract_clauses_llm():
    clauses = extract_clauses(sample_text)
    # assert isinstance(clauses, list)
    # assert len(clauses) >= 3

    for clause in clauses:
        print(f"Title: {clause.title}")
        assert hasattr(clause, "title")
        assert hasattr(clause, "summary")
        assert hasattr(clause, "raw_text")
        assert isinstance(clause.title, str)
        assert isinstance(clause.summary, str)
        assert isinstance(clause.raw_text, str)
        assert len(clause.summary) > 10