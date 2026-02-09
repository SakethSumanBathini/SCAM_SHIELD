# 🛡️ SCAM SHIELD - Complete AI Honeypot System

<div align="center">

![Version](https://img.shields.io/badge/Version-3.0-8b5cf6?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?style=for-the-badge&logo=tailwindcss)

**AI-Powered Honeypot for Scam Detection & Intelligence Extraction**

</div>

---

## 🚀 QUICK START (3 Steps)

### Step 1: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Run Everything
**Terminal 1 - Start Backend:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

### Step 4: Open Dashboard
Go to: **http://localhost:3000**

---

## 📦 Project Structure

```
SCAM_SHIELD_FINAL/
├── backend/                 # FastAPI Backend
│   ├── main.py             # Complete API (1200+ lines)
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # Next.js Frontend
│   ├── src/app/           
│   │   ├── page.tsx       # Main Dashboard
│   │   ├── layout.tsx     # Root Layout
│   │   └── globals.css    # All styles & animations
│   ├── package.json       
│   ├── tailwind.config.js # Theme & animations
│   └── next.config.js     
│
└── README.md
```

---

## ✨ Features

### 🔍 Scam Detection
- **10+ Categories:** Banking, UPI, Phishing, Lottery, KYC, Job, Investment, etc.
- **Multi-layer Detection:** Keyword + Pattern + LLM analysis
- **Multi-language:** English, Hindi, Tamil, Telugu
- **Real-time Analysis:** Instant threat assessment

### 🎭 AI Agent Personas
| Persona | Effectiveness | Strategy |
|---------|--------------|----------|
| Sharmila Aunty (Confused Elderly) | HIGHEST | Acts confused, asks for help |
| Rajesh Kumar (Suspicious Verifier) | HIGH | Questions everything, asks proof |
| Priya Sharma (Tech Naive) | MEDIUM | Worried, follows instructions |
| Venkat Rao (Overly Helpful) | HIGH | Shares extra info |
| Anita Desai (Busy Professional) | MEDIUM | Impatient, short responses |

### 🧠 Intelligence Extraction
- 📱 Phone Numbers (Indian format)
- 💳 UPI IDs (All major apps)
- 🏦 Bank Account Numbers
- 🔗 Phishing Links
- ✉️ Email Addresses
- 🆔 Aadhaar Numbers
- 📋 PAN Numbers
- 🔑 IFSC Codes

### 🎨 Dashboard Features
- Beautiful Solo Leveling / Cyberpunk UI
- Real-time stats with animated counters
- Conversation history
- Session management
- Intelligence database
- Analytics & charts
- 40+ animations

---

## 🔧 Configuration

### API Key
Default API Key: `sk-scamshield-2024-hackathon-key`

### Gemini API (Optional - for better AI responses)
1. Get free key from: https://aistudio.google.com/apikey
2. Set environment variable:
```bash
export GEMINI_API_KEY=your_key_here
```

Or edit `backend/main.py` line 20:
```python
GEMINI_API_KEY = "your_key_here"
```

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/honeypot` | POST | Main detection endpoint |
| `/api/sessions` | GET | List all sessions |
| `/api/sessions/{id}` | GET | Get session details |
| `/api/intelligence` | GET | Get extracted intelligence |
| `/api/analytics/dashboard` | GET | Get analytics data |
| `/api/health` | GET | Health check |

### Example Request
```bash
curl -X POST http://localhost:8000/api/honeypot \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk-scamshield-2024-hackathon-key" \
  -d '{
    "sessionId": "test-123",
    "message": {
      "sender": "scammer",
      "text": "Your bank account blocked! Call 9876543210",
      "timestamp": 1234567890
    },
    "conversationHistory": [],
    "metadata": {"channel": "SMS", "language": "English", "locale": "IN"}
  }'
```

---

## 🎯 How It Works

```
Scammer Message
     ↓
┌─────────────────────────────────────┐
│      SCAM SHIELD API                │
├─────────────────────────────────────┤
│ 1. DETECTION                        │
│    ├── Keyword Analysis (150+ words)│
│    ├── Pattern Matching (10+ cats)  │
│    └── Confidence Scoring           │
├─────────────────────────────────────┤
│ 2. INTELLIGENCE EXTRACTION          │
│    ├── Phone Numbers                │
│    ├── UPI IDs                      │
│    ├── Bank Accounts                │
│    └── Phishing Links               │
├─────────────────────────────────────┤
│ 3. AI AGENT RESPONSE                │
│    ├── Select Persona               │
│    ├── Generate Believable Reply    │
│    └── Keep Scammer Engaged         │
└─────────────────────────────────────┘
     ↓
Response + Intelligence + Analysis
```

---

## 🏆 Built For

**GUVI Hackathon 2024**
- Problem Statement: AI-Powered Agentic Honeypot
- Callback URL: `https://hackathon.guvi.in/api/updateHoneyPotFinalResult`

---

## 📄 License

MIT License - Free to use and modify

---

<div align="center">
  <p><strong>Built with ❤️ for a safer digital India</strong></p>
</div>
