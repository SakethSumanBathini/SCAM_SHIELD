"""
LIVE DEPLOYMENT TEST — Run this from your PC to test your Render deployment
Usage: python test_live_deploy.py
"""
import requests
import json
import time

BASE = "https://scam-shield-5hnk.onrender.com"
HEADERS = {"Content-Type": "application/json", "x-api-key": "sk-scamshield-2024-hackathon-key"}

tests = [
    ("Bank Fraud + Phone + UPI", {
        "sessionId": "live-001",
        "message": {"sender": "scammer", "text": "Your SBI account blocked! Call +91-8765432109 and pay via fraud@ybl", "timestamp": 1234567890}
    }),
    ("Phishing Link + Email", {
        "sessionId": "live-002",
        "message": {"sender": "scammer", "text": "Click http://fake-sbi.com/verify and email scammer@fake.com", "timestamp": 1234567891}
    }),
    ("Bank Account Hyphenated", {
        "sessionId": "live-003",
        "message": {"sender": "scammer", "text": "Transfer to account 1234-5678-9012-3456 immediately", "timestamp": 1234567892}
    }),
    ("Phone Dots Format", {
        "sessionId": "live-004",
        "message": {"sender": "scammer", "text": "Call officer at +91.9876.543210 for KYC now", "timestamp": 1234567893}
    }),
    ("Multi-turn (2nd msg)", {
        "sessionId": "live-001",
        "message": {"sender": "scammer", "text": "Sir hurry! Send money to scam.fraud@fakebank or account closes", "timestamp": 1234567894},
        "conversationHistory": [
            {"sender": "scammer", "text": "Your SBI account blocked!", "timestamp": 1234567890},
            {"sender": "user", "text": "Oh no! What happened?", "timestamp": 1234567891}
        ]
    }),
]

print("=" * 70)
print("  LIVE DEPLOYMENT TEST")
print(f"  Target: {BASE}")
print("=" * 70)

for i, (name, payload) in enumerate(tests):
    print(f"\n  Test {i+1}: {name}")
    t0 = time.time()
    try:
        r = requests.post(f"{BASE}/api/honeypot", json=payload, headers=HEADERS, timeout=30)
        ms = round((time.time() - t0) * 1000)
        data = r.json()
        
        print(f"  ✅ {r.status_code} — {ms}ms")
        print(f"  Reply: {data.get('reply', 'N/A')[:80]}")
        
        intel = data.get("extractedIntelligence", {})
        for key in ["phoneNumbers", "upiIds", "bankAccounts", "phishingLinks", "emailAddresses"]:
            vals = intel.get(key, [])
            if vals: print(f"    {key}: {vals[:3]}")
        
        eng = data.get("engagementMetrics", {})
        if eng: print(f"  ⏱️ {eng.get('engagementDurationSeconds',0)}s, {eng.get('totalMessagesExchanged',0)} msgs")
    except Exception as e:
        print(f"  ❌ ERROR: {e}")

# Check all sessions
print(f"\n{'=' * 70}")
print("  ALL SESSIONS")
print(f"{'=' * 70}")
try:
    r = requests.get(f"{BASE}/api/sessions", timeout=10)
    for s in r.json().get("sessions", []):
        print(f"  {s['sessionId']}: {s.get('scamCategory','?')} | msgs:{s.get('messageCount',0)} | {s.get('persona','?')}")
except: pass

# Analytics
print(f"\n{'=' * 70}")
print("  ANALYTICS")
print(f"{'=' * 70}")
try:
    r = requests.get(f"{BASE}/api/analytics/dashboard", timeout=10)
    d = r.json()
    print(f"  Sessions: {d.get('totalSessions',0)} | Messages: {d.get('totalMessages',0)}")
    print(f"  Categories: {d.get('scamCategories', {})}")
except: pass

print(f"\n  🏆 DONE — Check Render Logs to see all requests!")
