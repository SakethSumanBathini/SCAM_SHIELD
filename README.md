# 🛡️ SCAM SHIELD — AI-Powered Honeypot for Cyber Fraud Detection

[![Version](https://img.shields.io/badge/Version-5.0-8b5cf6?style=for-the-badge)](https://github.com/SakethSumanBathini/SCAM_SHIELD)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Multi--LLM-FF6F00?style=for-the-badge)](https://groq.com)
[![Live](https://img.shields.io/badge/Status-Live-00C853?style=for-the-badge)](https://scam-shield-5hnk.onrender.com)

> **An offensive AI honeypot system that engages scammers with realistic personas, extracts actionable intelligence, and wastes their time — protecting real victims across India.**

**🏆 India AI Impact Buildathon 2026 — Grand Finale | Top 850 out of 38,000+ participants**

---

## 📌 The Problem

India loses over **₹10,000+ crores annually** to cyber fraud. Scammers target vulnerable citizens through banking fraud, UPI scams, phishing, fake lottery, job scams, and impersonation calls. Traditional approaches are reactive — they only help *after* victims lose money.

## 💡 Our Solution

Scam Shield takes an **offensive approach**. Instead of blocking scammers, we **engage them** with AI-powered personas that:
- 🎭 Act as convincing victims to keep scammers occupied
- 🔍 Extract intelligence (phone numbers, bank accounts, UPI IDs, links)
- ⏱️ Waste scammer time, reducing their capacity to target real victims
- 📊 Generate actionable reports for law enforcement

---

## 🏗️ Architecture

```
┌─────────────────┐        ┌──────────────────────────────────────┐
│  Scammer sends   │───────▶│         SCAM SHIELD API              │
│  message (SMS/   │        │                                      │
│  call/WhatsApp)  │        │  ┌──────────────────────────────┐   │
│                  │        │  │  1. SCAM DETECTION ENGINE     │   │
│                  │        │  │  • 6-layer analysis            │   │
│                  │        │  │  • 300+ keyword patterns       │   │
│                  │        │  │  • 11 fraud categories         │   │
│                  │        │  │  • 8+ Indian languages         │   │
│                  │        │  └──────────────────────────────┘   │
│                  │        │  ┌──────────────────────────────┐   │
│                  │        │  │  2. INTELLIGENCE EXTRACTOR     │   │
│                  │        │  │  • Phone numbers (all formats) │   │
│                  │        │  │  • Bank accounts & UPI IDs     │   │
│                  │        │  │  • Phishing links & emails     │   │
│                  │        │  │  • Case/Policy/Order numbers   │   │
│                  │        │  └──────────────────────────────┘   │
│                  │        │  ┌──────────────────────────────┐   │
│                  │        │  │  3. AI PERSONA ENGINE          │   │
│                  │◀───────│  │  • 10 culturally authentic     │   │
│  Gets realistic  │        │  │    Indian personas             │   │
│  victim response │        │  │  • Multi-LLM cascade           │   │
│                  │        │  │    (Groq→Gemini→Rules)         │   │
│                  │        │  └──────────────────────────────┘   │
│                  │        │  ┌──────────────────────────────┐   │
│                  │        │  │  4. REPORTING & ANALYTICS      │   │
│                  │        │  │  • Real-time dashboard         │   │
│                  │        │  │  • Cross-session correlation   │   │
│                  │        │  │  • Intelligence summaries      │   │
│                  │        │  └──────────────────────────────┘   │
└─────────────────┘        └──────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend Framework** | FastAPI + Pydantic v2 | High-performance async API |
| **Primary LLM** | Groq (Llama 3.1/3.3) | Ultra-fast response generation (~500ms) |
| **Backup LLM** | Google Gemini 2.0 Flash | Fallback AI provider |
| **Intelligence Extraction** | Regex + NLP | 33+ format patterns for Indian data |
| **Deployment** | Render.com + Docker | Auto-scaling cloud hosting |
| **Frontend** | Next.js + TypeScript | Analytics dashboard |
| **Monitoring** | Cron-job.org | Keep-alive + uptime monitoring |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- API keys for Groq and/or Gemini (optional — rule-based fallback works without keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/SakethSumanBathini/SCAM_SHIELD.git
cd SCAM_SHIELD/backend

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker

```bash
docker build -t scam-shield .
docker run -p 8000:8000 --env-file .env scam-shield
```

---

## 📡 API Endpoint

| Property | Value |
|----------|-------|
| **URL** | `https://scam-shield-5hnk.onrender.com/api/honeypot` |
| **Method** | `POST` |
| **Auth** | `x-api-key` header |
| **Timeout** | < 30 seconds |

### Request Format

```json
{
  "sessionId": "unique-session-id",
  "message": {
    "sender": "scammer",
    "text": "URGENT: Your SBI account has been compromised. Share OTP immediately.",
    "timestamp": 1740000000000
  },
  "conversationHistory": [],
  "metadata": {
    "channel": "SMS",
    "language": "English",
    "locale": "IN"
  }
}
```

### Response Format

```json
{
  "status": "success",
  "reply": "Haan? Bank wale? Mujhe thoda darr lag raha hai... What is your employee ID?",
  "sessionId": "unique-session-id",
  "scamDetected": true,
  "scamType": "BANKING_FRAUD",
  "confidenceLevel": "HIGH",
  "extractedIntelligence": {
    "phoneNumbers": ["+91-9876543210"],
    "bankAccounts": ["1234567890123456"],
    "upiIds": ["scammer@ybl"],
    "phishingLinks": ["http://fake-sbi.xyz"],
    "emailAddresses": ["fraud@fake.com"],
    "caseIds": ["CASE-2026-78432"],
    "policyNumbers": ["POL-INS-998877"],
    "orderNumbers": ["ORD-FLIP-2026-55443"]
  },
  "engagementMetrics": {
    "engagementDurationSeconds": 240,
    "totalMessagesExchanged": 12
  },
  "agentNotes": "Scam Type: BANKING_FRAUD. Threat: HIGH. Confidence: 85."
}
```

---

## 🎭 AI Personas

Scam Shield deploys 10 culturally authentic Indian personas to engage scammers naturally:

| Persona | Age | Personality | Best For |
|---------|-----|------------|----------|
| **Sharmila Aunty** | 62 | Confused but trusting grandmother | Banking, KYC fraud |
| **Colonel Verma** | 70 | Retired army officer, authoritative | Impersonation scams |
| **Priya Sharma** | 28 | Young professional, slightly naive | Job, investment scams |
| **Rajesh Kumar** | 45 | Small business owner, busy | UPI, payment fraud |
| **Amit Patel NRI** | 35 | NRI, unfamiliar with Indian banking | Phishing, tech support |
| **Lakshmi Devi** | 55 | Temple-going homemaker | Lottery, prize scams |
| **Vikram Singh** | 40 | Government employee, cautious | Tax, legal threat scams |
| **Meera Iyer** | 32 | IT professional, semi-technical | Tech support scams |
| **Dharmesh Bhai** | 50 | Gujarati trader, haggling nature | Investment fraud |
| **Ananya Reddy** | 24 | College student, worried | Romance, extortion scams |

Each persona has unique speaking patterns, cultural references, language mixing (Hinglish, regional phrases), and behavioral traits that make conversations feel authentic to scammers.

---

## 🔍 Scam Detection Approach

### 6-Layer Detection Engine

1. **Keyword Analysis** — 300+ patterns across 11 fraud categories in English, Hindi, Tamil, Telugu, Kannada, and Malayalam
2. **Regex Pattern Matching** — Identifies suspicious data patterns (fake account numbers, malicious URLs)
3. **Behavioral Analysis** — Detects urgency pressure, authority claims, emotional manipulation
4. **Sophistication Profiling** — Rates scammer skill level (1-100) to calibrate AI responses
5. **Cross-Session Correlation** — Links intelligence across multiple sessions to identify scam networks
6. **Confidence Scoring** — Multi-factor scoring (0-100) with dynamic thresholds

### Supported Fraud Categories

| Category | Detection Patterns |
|----------|-------------------|
| Banking Fraud | Account blocked, OTP requests, SBI/HDFC impersonation |
| UPI Fraud | Payment requests, QR code scams, cashback lures |
| Phishing | Fake URLs, KYC verification links, login pages |
| Lottery/Prize | Congratulations messages, prize claims, processing fees |
| Impersonation | Police/CBI/bank officer claims, government threats |
| Investment Fraud | High returns, crypto schemes, trading platforms |
| Job Scams | Fake offers, registration fees, data entry jobs |
| Tech Support | Virus warnings, remote access requests, AnyDesk/TeamViewer |
| Romance Scams | Emotional manipulation, gift/money requests |
| Extortion | Threatening messages, fake legal cases, arrest warrants |
| KYC Fraud | Aadhaar/PAN update requests, identity verification |

---

## 📊 Intelligence Extraction

The system extracts 13 types of intelligence from scammer conversations:

| Data Type | Formats Supported | Example |
|-----------|-------------------|---------|
| Phone Numbers | +91-XXXXX, 0091-XXXXX, 10-digit | +91-9876543210 |
| Bank Accounts | 9-18 digit, ACCT- prefixed | 1234567890123456 |
| UPI IDs | name@bank format | scammer@ybl |
| Phishing Links | http/https URLs | http://fake-sbi-kyc.com |
| Email Addresses | Standard email format | fraud@fake.com |
| Case IDs | CASE-XXX, FRD-CASE-XXX | CASE-2026-78432 |
| Policy Numbers | POL-XXX format | POL-INS-998877 |
| Order Numbers | ORD-XXX format | ORD-FLIP-2026-55443 |
| Aadhaar Numbers | 12-digit XXXX-XXXX-XXXX | 1234-5678-9012 |
| PAN Numbers | ABCDE1234F format | ABCDE1234F |
| IFSC Codes | 4 letters + 0 + 6 chars | SBIN0001234 |
| Crypto Wallets | BTC/ETH addresses | 0x742d35Cc... |
| Remote Access IDs | AnyDesk/TeamViewer IDs | 123-456-789 |

All extraction uses generic regex patterns — no hardcoded test data. Tested against 33+ format variations with 100% accuracy.

---

## 🔄 Multi-LLM Cascade (Reliability Architecture)

```
Request → Groq (Llama 3.1 8B, ~500ms)
              │ fails?
              ▼
          Groq (Llama 3.3 70B, ~1.5s)
              │ fails?
              ▼
          Gemini 2.0 Flash (~2s)
              │ fails?
              ▼
          Rule-Based Engine (instant, always works)
```

**Reliability guarantees:**
- ✅ **Never crashes** — Global exception handling on every endpoint
- ✅ **Never returns empty** — 5+ Hindi fallback phrases as last resort
- ✅ **Never times out** — Hard 20-second cutoff with graceful degradation
- ✅ **Rate limit resilient** — 429 handling with automatic provider rotation
- ✅ **Circuit breaker** — Degraded providers skipped temporarily (auto-recovery)

---

## 📁 Project Structure

```
SCAM_SHIELD/
├── backend/
│   ├── main.py              # Complete API implementation (2400+ lines)
│   │   ├── ScamDetector      # 6-layer scam detection engine
│   │   ├── IntelligenceExtractor  # 13-type regex extraction
│   │   ├── HoneypotAgent     # Multi-LLM response generation
│   │   ├── PersonaEngine     # 10 AI persona management
│   │   └── AnalyticsEngine   # Behavioral & threat analysis
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Container configuration
│   └── .env.example         # Environment variables template
├── frontend/                # Next.js analytics dashboard
│   ├── src/
│   │   ├── app/             # Dashboard pages
│   │   └── components/      # React components
│   └── package.json
├── .gitignore
├── START.bat                # Windows quick-start script
└── README.md
```

---

## 🧪 Testing

The system has been tested against 25+ scenarios covering:
- All 11 fraud categories
- Multi-turn conversations (up to 10 turns)
- Hindi, Tamil, Telugu mixed-language inputs
- Edge cases: pure numeric input, ALL CAPS, extra-long messages
- Intelligence extraction across 33+ format variations

### Run Tests Locally

```bash
cd backend
python -m uvicorn main:app --port 8000 &
python test_ultimate_v2.py
```

---

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/honeypot` | POST | Main honeypot — scam detection + engagement |
| `/api/scam-honey-pot` | POST | Alias endpoint (GUVI compatibility) |
| `/api/sessions` | GET | List all active sessions |
| `/api/sessions/{id}` | GET | Single session deep dive |
| `/api/analytics/dashboard` | GET | Aggregate statistics |
| `/api/intelligence` | GET | All extracted intelligence |
| `/api/health` | GET | Health check + provider status |

---

## 🔒 Security

- API keys stored in environment variables (never in code)
- `.env` excluded via `.gitignore`
- `x-api-key` header authentication on all endpoints
- No sensitive data logged or exposed
- `.env.example` provided as template

---

## 👤 Author

**Bathini Saketh Suman**
- GitHub: [@SakethSumanBathini](https://github.com/SakethSumanBathini)
- Competition: India AI Impact Buildathon 2026 — Grand Finale

---

## 📜 License

This project was built for the India AI Impact Buildathon 2026. All rights reserved.

---

<p align="center">
  Built with ❤️ for a safer digital India<br>
  <strong>🛡️ Scam Shield — Because every grandmother deserves protection from fraud 🛡️</strong>
</p>
