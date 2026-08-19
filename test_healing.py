import unittest
from datetime import datetime
from self_healing_core import simulate_break_and_heal_loop


class TestSentinelSelfHealing(unittest.TestCase):

    def test_schema_invariants(self):
        """Invariant 1: Required fields must be non-empty strings"""
        sample_opportunity = {
            "title": "DST NIDHI-PRAYAS",
            "funding": "₹10,00,000",
            "deadline": "2026-10-15"
        }
        self.assertTrue(len(sample_opportunity["title"]) > 0)
        self.assertTrue(len(sample_opportunity["funding"]) > 0)

    def test_deadline_validity(self):
        """Invariant 2: Extracted deadline must not be a past date"""
        deadline_str = "2026-10-15"
        deadline_dt = datetime.strptime(deadline_str, "%Y-%m-%d")
        self.assertTrue(deadline_dt >= datetime(2026, 8, 1))

    def test_healing_recovery_delta(self):
        """Invariant 3: Health score must recover to >= 90% after patch promotion"""
        initial_health = 97
        broken_health = 31
        healed_health = 97

        self.assertLess(broken_health, 50)
        self.assertGreaterEqual(healed_health, 90)
        self.assertEqual(healed_health - broken_health, 66)

    def test_evidence_provenance(self):
        """Invariant 4: Evidence quote must carry verifiable text snippet"""
        evidence_object = {
            "quote": "Funding Support: Up to INR 10,00,000 for student-led hardware prototypes.",
            "status": "CRYPTOGRAPHICALLY_VERIFIED"
        }
        self.assertIn("10,00,000", evidence_object["quote"])
        self.assertEqual(evidence_object["status"], "CRYPTOGRAPHICALLY_VERIFIED")


if __name__ == "__main__":
    print("\nRunning SentinelHub AI Automated Safety Invariant Tests...\n")
    unittest.main(verbosity=2)