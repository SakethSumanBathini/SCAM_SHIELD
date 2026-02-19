# 🛡️ SCAM SHIELD v7.2 — AI-Powered Honeypot System

![Version](https://img.shields.io/badge/Version-7.2-8b5cf6?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)
![AI](https://img.shields.io/badge/AI%20Powered-Multi--LLM-FF6F00?style=for-the-badge)

**An offensive AI-powered honeypot that engages scammers, extracts intelligence, and wastes their time — protecting real victims.**

*India AI Impact Buildathon 2026 — Grand Finale*

---

## Description

Scam Shield is an AI-powered honeypot API that detects scams using 6-layer analysis with 300+ keyword patterns, engages scammers with 10 culturally authentic AI personas, and extracts intelligence including phone numbers, bank accounts, UPI IDs, phishing links, emails, case IDs, policy numbers, and order numbers.

## Tech Stack

- **Language/Framework:** Python 3.11, FastAPI, Pydantic v2, httpx
- **LLM/AI Models:** Groq (Llama 3.1/3.3), Google Gemini 2.0 Flash, OpenAI GPT-4o-mini
- **Deployment:** Render.com
- **Intelligence Extraction:** Regex-based NLP with 33+ format variations

## Setup Instructions

```bash
git clone https://github.com/SakethSumanBathini/SCAM_SHIELD.git
cd SCAM_SHIELD/backend
pip install -r requirements.txt
cp .env.example .env   # Edit with your API keys
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoint

- **URL:** `https://scam-shield-5hnk.onrender.com/api/honeypot`
- **Method:** POST
- **Authentication:** `x-api-key` header

## Approach

### How We Detect Scams
6-layer analysis: keyword matching (300+ patterns), regex pattern detection, behavioral analysis, urgency scoring, sophistication profiling, and cross-session correlation. Supports 8+ scam categories across English, Hindi, Tamil, and Telugu.

### How We Extract Intelligence
Regex-based extraction with 33+ tested format variations for phones, bank accounts, UPI IDs, links, emails, case IDs, policy numbers, and order numbers. Full conversation context stored for cross-reference matching of data spanning multiple messages.

### How We Maintain Engagement
10 culturally authentic AI personas (Sharmila Aunty, Colonel Verma, Amit Patel NRI, etc.) with multi-LLM cascading (Groq → Gemini → OpenAI → Rules). Every reply includes investigative questions, red flag identification, and active elicitation of scammer details. Semantic deduplication prevents repetitive responses.

## Architecture

```
Scammer Message → SCAM SHIELD API → Intelligence Report
                      │
                      ├── 1. SCAM DETECTION (6-layer, 300+ keywords)
                      ├── 2. INTELLIGENCE EXTRACTION (regex + context)
                      ├── 3. AI PERSONA ENGINE (10 personas, multi-LLM)
                      └── 4. CALLBACK & REPORTING (3x retry)
```

## Reliability

- Never crashes (global try/except)
- Never empty reply (5 Hindi fallback phrases)
- Never misses callback (retry 3x)
- Never times out (hard 20s cutoff)
- Rate limit resilient (429 handling)

## Project Structure

```
SCAM_SHIELD/
├── backend/
│   ├── main.py              # Complete API (2400+ lines)
│   ├── requirements.txt     # Dependencies
│   ├── Dockerfile           # Container config
│   └── .env.example         # Environment template
├── frontend/                # Next.js Dashboard
├── test_ultimate.py         # Test suite (25+ scenarios)
└── README.md
```

---

Built with ❤️ for a safer digital India | India AI Impact Buildathon 2026
