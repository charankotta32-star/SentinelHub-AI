# 🛡️ SentinelHub AI 2.0
> **Autonomous Self-Healing Web Intelligence & Opportunity Radar for Student Engineers**  
> *Built for "Into The Scrape-Verse" Hackathon 2026 | Powered by Bright Data & Google Gemini*

---

## 🎯 Executive Overview
Web data changes faster than static scrapers do. In critical domains like **national hardware prototyping grants (₹10L+ DST NIDHI-PRAYAS), international research fellowships (Mitacs Canada), tier-1 tech internships (Microsoft SWE), and national hackathons (EDGE NOVA / SIH)**, silent scraper failures cause student innovators to miss career-defining opportunities.

**SentinelHub AI 2.0** is an enterprise-grade web intelligence system that doesn't just scrape public portals—it **detects when its scrapers break due to DOM drift, autonomously repairs the extraction logic via Bright Data's Self-Healing tools, validates the repair against strict safety invariants, and verifies every extracted field with direct source HTML evidence.**

---

## ⚠️ The Problem: Why Traditional Scrapers Fail
1. **Dynamic Web Layouts:** Government, university, and career portals constantly update their CSS class names, table formats, and DOM hierarchies.
2. **Silent Failure Mode:** Traditional scrapers don't crash; they simply return empty fields, giving users a false sense of security.
3. **LLM Hallucinations:** Generic AI aggregators often hallucinate funding amounts, eligibility rules, and deadlines.
4. **Schedule Collisions:** Students blindly register for multiple events without realizing that hackathon hack-periods overlap with internal university examinations.

---

## 🏗️ System Architecture & The Self-Healing Loop

The 5-Stage Autonomous Healing Lifecycle:
1. **Detect:** Real-time health monitoring tracks schema completeness, evidence coverage, and DOM delta changes.
2. **Diagnose:** Compares the mutated DOM against the last-known-good structural fingerprint to isolate missing selectors.
3. **Heal:** Invokes Bright Data's Self-Healing Agent to generate a candidate patch using semantic text anchors.
4. **Canary Validate:** Executes the candidate patch in a shadow environment against 4 non-negotiable safety invariants.
5. **Promote / Rollback:** Promotes verified patches to production (restoring health from 31% to 97%) or safely rolls back to baseline.

---

## 🚀 Key Features & The 5 Channels

### 1. 🏆 Hackathons & Competitions (with Smart Collision Detection)
* Aggregates national and global hackathons (EDGE NOVA'26, Into The Scrape-Verse, SIH 2026).
* **Smart Collision Engine:** Flags schedule overlaps between registered hackathon dates and internal university examination windows (Class Tests).

### 2. 💼 Off-Campus Tech Hiring & Internships
* Discovers high-yield undergraduate internships and apprenticeships (Microsoft SWE, Google Application Development).
* Filters dynamically by **CGPA threshold (e.g., >= 9.0)**, graduation batch, and technical domain (Edge AI, Systems, Robotics).

### 3. 🔬 Non-Dilutive Prototyping Grants & Fellowships
* Tracks major government hardware grants (DST NIDHI-PRAYAS ₹10L, iDEX, SERI) and international research fellowships (Mitacs Canada GRI ₹3L+).
* **Cryptographic Evidence Drawer:** Every grant card features an expandable drawer displaying the raw, unedited HTML source snippet proving the deadline and funding figures.

### 4. 🌐 Regional Tech Summits & Campus Events
* Curates developer events, Google Developer Groups (GDG) workshops, and robotics championships (RoboRush AI 2026).

### 5. 🚀 1-Click Cold Outreach AI
* Generates tailored, high-converting 3-sentence outreach pitches for professors and startup founders based directly on scraped opportunity requirements.

### 6. 📡 Scraper Mission Control (Self-Healing Control Plane)
* An interactive console inspired by Mixpanel and Apple VisionOS with real-time telemetry, animated health gauges, live event logging, and a **Deterministic Time-Travel Break & Heal Simulator**.

---

## 📊 Technical Differentiators

- **Failure Handling:** Autonomous Diagnosis -> Patch -> Canary -> Promotion
- **Data Trust:** Direct Evidence Snippets + Source HTML Locators (Zero Hallucinations)
- **Resilience:** Deterministic Recovery (31% to 97% Health Restoration)
- **Safety Gate:** Shadow Canary Validation against 4 Invariants
- **Design System:** Apple VisionOS x Samsung One UI Liquid Glass Aesthetic

---

## 🛠️ Quickstart & Local Execution

1. Clone the repository:
   git clone https://github.com/charankotta32-star/SentinelHub-AI.git
   cd SentinelHub-AI

2. Run the Data Ingestion Pipeline:
   python brightdata_collector.py

3. Run Automated Safety Invariant Tests:
   python test_healing.py

4. Launch the Liquid Glass Dashboard:
   Double-click index.html in your file explorer, or start a local server:
   python -m http.server 3000

---

## 🧪 Automated Safety Invariant Tests

Run the test suite to verify that the self-healing engine strictly adheres to safety invariants:
python test_healing.py

Invariants Tested:
1. Schema Invariants: Guarantees critical fields (title, funding, deadline) are non-empty.
2. Deadline Validity: Validates that extracted deadlines are future-valid ISO dates.
3. Recovery Delta: Confirms that healed scraper versions restore health to >= 90%.
4. Evidence Provenance: Verifies that supporting text snippets match the structured values.

---

## 📁 Repository Structure

- index.html: Apple VisionOS x Samsung One UI Liquid Glass Interface
- brightdata_collector.py: Ingestion Engine & Bright Data Proxy Pipeline
- self_healing_core.py: Closed-Loop Self-Healing & Drift Recovery Kernel
- test_healing.py: Automated Safety Invariant Test Suite
- opportunities.json: Live Normalized Opportunity Database with Evidence
- requirements.txt: Python Environment Dependencies
- README.md: Project Documentation

---

## ⚙️ Tech Stack & Tools

- Data Ingestion & Proxies: Bright Data Web Unlocker & Scraper Studio
- HTML Parsing & Normalization: BeautifulSoup4, lxml
- Cognitive Intelligence: Google Gemini API (Structured JSON Schema Enforcement)
- Frontend Architecture: Apple VisionOS Liquid Glass CSS, Tailwind CSS, Chart.js
- Testing & Quality Assurance: Python unittest Suite

---

## 👤 Author & Acknowledgments

**Kotta Charan Ram Sai**  
*Class Representative | B.Tech CSE (AI & ML) @ SRM Institute of Science and Technology, KTR*  
- GitHub: https://github.com/charankotta32-star  
- LinkedIn: https://www.linkedin.com/in/charan-kotta  

*Built for the Into The Scrape-Verse 2026 National Hackathon, organized by WeMakeDevs and sponsored by Bright Data.*
