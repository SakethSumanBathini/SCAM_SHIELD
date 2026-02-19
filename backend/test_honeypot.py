"""
🧪 SCAM SHIELD — Complete Test Suite
Tests your honeypot against ALL 15 evaluation scenarios
Uses the EXACT same scoring logic as the GUVI evaluator

Usage:
  1. Start your backend: cd backend && uvicorn main:app --reload --port 8000
  2. Run this: python test_honeypot.py

It will:
  - Test all 15 scam scenarios (same as real evaluation)
  - Multi-turn conversation (up to 5 turns per scenario)
  - Score using EXACT evaluator logic
  - Show per-scenario breakdown
  - Show final weighted score
"""

import requests
import uuid
import time
import json
import re

# ============================================================
# CONFIG — Change these to match your setup
# ============================================================
ENDPOINT_URL = "http://127.0.0.1:8000/api/honeypot"
API_KEY = "sk-scamshield-2024-hackathon-key"

# ============================================================
# ALL 15 TEST SCENARIOS (from actual Round 1 evaluation)
# ============================================================
SCENARIOS = [
    {
        "scenarioId": "bank_fraud",
        "name": "Bank Fraud Detection",
        "scamType": "bank_fraud",
        "weight": 1/15,
        "initialMessage": "URGENT: Your SBI account has been compromised. Your account will be blocked in 2 hours. Share your account number and OTP immediately to verify your identity.",
        "followUps": [
            "I am calling from SBI Fraud Prevention Unit. My ID is FPU-7823. Your account {bankAccount} shows unauthorized transactions of Rs 45,000.",
            "For immediate resolution, verify by sending Rs 1 to our secure UPI: {upiId}",
            "You can reach our dedicated helpline at {phoneNumber}. This is time-sensitive.",
            "Sir this is very urgent. Your account will be permanently blocked. Please cooperate.",
        ],
        "fakeData": {"bankAccount": "1234567890123456", "upiId": "scammer.fraud@fakebank", "phoneNumber": "+91-9876543210"},
        "metadata": {"channel": "SMS", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "upi_fraud",
        "name": "UPI Fraud Multi-turn",
        "scamType": "upi_fraud",
        "weight": 1/15,
        "initialMessage": "Congratulations! You have won a cashback of Rs. 5000 from Paytm. To claim your reward, please verify your UPI details. This is from official customer support.",
        "followUps": [
            "To process your cashback, send a verification fee of Rs 1 to {upiId}",
            "Our helpline is {phoneNumber}. Call us for any queries about your cashback.",
            "This is a limited time offer. Please complete verification in 10 minutes.",
        ],
        "fakeData": {"upiId": "cashback.scam@fakeupi", "phoneNumber": "+91-8765432109"},
        "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "phishing_link",
        "name": "Phishing Link Detection",
        "scamType": "phishing",
        "weight": 1/15,
        "initialMessage": "You have been selected for iPhone 15 Pro at just Rs. 999! Click here to claim: http://amaz0n-deals.fake-site.com/claim?id=12345. Offer expires in 10 minutes!",
        "followUps": [
            "Hurry! Contact {emailAddress} for exclusive deal details. Only 3 units left!",
            "Click the link {phishingLink} to claim now before stock runs out!",
            "Don't miss this once in a lifetime deal. Act now!",
        ],
        "fakeData": {"phishingLink": "http://amaz0n-deals.fake-site.com/claim?id=12345", "emailAddress": "offers@fake-amazon-deals.com"},
        "metadata": {"channel": "Email", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "kyc_fraud",
        "name": "KYC Fraud",
        "scamType": "kyc_fraud",
        "weight": 1/15,
        "initialMessage": "Dear Customer, your KYC verification is pending. Your bank account will be suspended within 24 hours if not updated. Click link to update now.",
        "followUps": [
            "Please update your KYC at {phishingLink} to avoid account suspension.",
            "For assistance, call our KYC helpline at {phoneNumber}.",
            "Share your account number {bankAccount} for verification.",
            "This is mandatory RBI compliance. Failure will result in permanent account freeze.",
        ],
        "fakeData": {"phoneNumber": "+91-7654321098", "bankAccount": "9876543210123456", "phishingLink": "http://kyc-update.fake-bank.com/verify"},
        "metadata": {"channel": "SMS", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "job_scam",
        "name": "Job Scam",
        "scamType": "job_scam",
        "weight": 1/15,
        "initialMessage": "Congratulations! You have been selected for a Work From Home position at Amazon. Salary: Rs 50,000/month. Deposit Rs 500 registration fee to start immediately.",
        "followUps": [
            "Please deposit registration fee to our UPI: {upiId}",
            "For any queries contact HR at {phoneNumber}.",
            "This position is filling fast. Only 2 slots remaining. Deposit now to confirm.",
        ],
        "fakeData": {"upiId": "amazon.jobs@fakepay", "phoneNumber": "+91-6543210987"},
        "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "lottery_scam",
        "name": "Lottery Scam",
        "scamType": "lottery_scam",
        "weight": 1/15,
        "initialMessage": "🎉 CONGRATULATIONS! Your mobile number has won Rs 25,00,000 in the KBC Lucky Draw! Claim your prize by contacting our office immediately.",
        "followUps": [
            "To claim your prize, pay processing fee of Rs 2,500 to account {bankAccount}.",
            "Contact our prize distribution officer at {phoneNumber}.",
            "Send processing fee via UPI to {upiId}. Prize will be transferred within 24 hours.",
        ],
        "fakeData": {"bankAccount": "5678901234567890", "phoneNumber": "+91-5432109876", "upiId": "kbc.prize@fakebank"},
        "metadata": {"channel": "SMS", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "electricity_bill",
        "name": "Electricity Bill Scam",
        "scamType": "electricity_bill",
        "weight": 1/15,
        "initialMessage": "NOTICE: Your electricity connection will be disconnected TODAY due to pending bill of Rs 8,450. Pay immediately to avoid disconnection.",
        "followUps": [
            "Pay your pending bill to {upiId} immediately to avoid disconnection.",
            "Contact our billing department at {phoneNumber} for payment confirmation.",
            "Your consumer number is linked to account {bankAccount}. Pay now or face legal action.",
        ],
        "fakeData": {"upiId": "electricity.bill@fakepay", "phoneNumber": "+91-4321098765", "bankAccount": "1122334455667788"},
        "metadata": {"channel": "SMS", "language": "Hindi", "locale": "IN"},
    },
    {
        "scenarioId": "govt_scheme",
        "name": "Government Scheme Fraud",
        "scamType": "govt_scheme",
        "weight": 1/15,
        "initialMessage": "PM Awas Yojana: You are eligible for Rs 2,50,000 housing subsidy! Apply now with your Aadhaar number. Limited slots available.",
        "followUps": [
            "Pay Rs 1,000 registration fee to UPI {upiId} to complete your application.",
            "For verification, call our office at {phoneNumber}.",
            "Visit {phishingLink} to complete your application form.",
        ],
        "fakeData": {"upiId": "pmay.subsidy@fakegov", "phoneNumber": "+91-3210987654", "phishingLink": "http://pm-awas-yojana.fake-gov.in/apply"},
        "metadata": {"channel": "WhatsApp", "language": "Hindi", "locale": "IN"},
    },
    {
        "scenarioId": "crypto_investment",
        "name": "Crypto Investment Scam",
        "scamType": "crypto_investment",
        "weight": 1/15,
        "initialMessage": "EXCLUSIVE OFFER: Invest Rs 10,000 in Bitcoin and get GUARANTEED 300% returns in 7 days! Join 50,000+ happy investors. Limited time offer!",
        "followUps": [
            "Invest now via UPI: {upiId}. Returns guaranteed in 7 days!",
            "Contact our investment advisor at {phoneNumber} for premium plans.",
            "Register at {phishingLink} to start your investment journey.",
        ],
        "fakeData": {"upiId": "crypto.invest@fakeexchange", "phoneNumber": "+91-2109876543", "phishingLink": "http://bitcoin-invest.fake-crypto.com/register"},
        "metadata": {"channel": "WhatsApp", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "customs_parcel",
        "name": "Customs Parcel Scam",
        "scamType": "customs_parcel",
        "weight": 1/15,
        "initialMessage": "ALERT: Your international parcel has been seized by Indian Customs. Pay Rs 5,000 clearance fee or face legal proceedings under NDPS Act.",
        "followUps": [
            "Transfer clearance fee to account {bankAccount}, IFSC: FAKE0001234",
            "Contact our customs officer at {phoneNumber} for case details.",
            "Pay via UPI: {upiId} to release your parcel immediately.",
        ],
        "fakeData": {"bankAccount": "2233445566778899", "phoneNumber": "+91-1098765432", "upiId": "customs.fee@fakebank"},
        "metadata": {"channel": "Phone", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "tech_support",
        "name": "Tech Support Scam",
        "scamType": "tech_support",
        "weight": 1/15,
        "initialMessage": "⚠️ WARNING: Your computer has been infected with a dangerous virus! Call Microsoft Support immediately to prevent data loss. Your files are at risk!",
        "followUps": [
            "Please install AnyDesk and share the access code. Our technician will fix it remotely.",
            "To renew your antivirus license, pay Rs 3,999 to {upiId}",
            "Call our tech support at {phoneNumber}. Our certified engineer will assist you.",
            "Visit {phishingLink} to download our security scanner.",
        ],
        "fakeData": {"upiId": "microsoft.support@fakepay", "phoneNumber": "+91-9988776655", "phishingLink": "http://microsoft-support.fake-tech.com/scan"},
        "metadata": {"channel": "Email", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "loan_approval",
        "name": "Loan Approval Scam",
        "scamType": "loan_approval",
        "weight": 1/15,
        "initialMessage": "Your pre-approved personal loan of Rs 5,00,000 is ready for disbursement! No documents required. Low interest rate of 2%. Apply now!",
        "followUps": [
            "Pay processing fee of Rs 2,000 to {upiId} to activate your loan.",
            "Contact our loan officer at {phoneNumber} for faster processing.",
            "Loan amount will be credited to your account {bankAccount} within 2 hours.",
        ],
        "fakeData": {"upiId": "loan.process@fakebank", "phoneNumber": "+91-8877665544", "bankAccount": "3344556677889900"},
        "metadata": {"channel": "SMS", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "income_tax",
        "name": "Income Tax Scam",
        "scamType": "income_tax",
        "weight": 1/15,
        "initialMessage": "NOTICE from Income Tax Department: You have a pending tax refund of Rs 15,000. Verify your bank details immediately to receive the refund.",
        "followUps": [
            "Verify your bank account {bankAccount} linked to PAN for refund processing.",
            "Contact our tax officer at {phoneNumber} for refund status.",
            "Complete verification at {phishingLink} to claim your refund.",
        ],
        "fakeData": {"bankAccount": "4455667788990011", "phoneNumber": "+91-7766554433", "phishingLink": "http://incometax-refund.fake-gov.in/verify"},
        "metadata": {"channel": "Email", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "refund_scam",
        "name": "Refund Scam",
        "scamType": "refund_scam",
        "weight": 1/15,
        "initialMessage": "Dear customer, an excess amount of Rs 12,000 was accidentally credited to your account. Please refund the amount immediately to avoid legal action.",
        "followUps": [
            "Return the excess amount to UPI: {upiId}",
            "Contact our accounts department at {phoneNumber} to resolve this.",
            "Transfer Rs 12,000 to account {bankAccount} immediately.",
        ],
        "fakeData": {"upiId": "refund.dept@fakebank", "phoneNumber": "+91-6655443322", "bankAccount": "5566778899001122"},
        "metadata": {"channel": "Phone", "language": "English", "locale": "IN"},
    },
    {
        "scenarioId": "insurance",
        "name": "Insurance Scam",
        "scamType": "insurance",
        "weight": 1/15,
        "initialMessage": "Your LIC policy has matured! Claim your bonus of Rs 3,00,000. Contact our agent immediately to process your claim before it expires.",
        "followUps": [
            "Pay claim processing fee of Rs 5,000 to {upiId}",
            "Contact our insurance agent at {phoneNumber} for claim details.",
            "Provide your policy linked account {bankAccount} for direct transfer.",
        ],
        "fakeData": {"upiId": "lic.claims@fakepay", "phoneNumber": "+91-5544332211", "bankAccount": "6677889900112233"},
        "metadata": {"channel": "Phone", "language": "English", "locale": "IN"},
    },
]

# ============================================================
# EVALUATOR'S EXACT SCORING FUNCTION
# ============================================================
def evaluate_final_output(callback_payload, scenario):
    score = {
        'scamDetection': 0,
        'intelligenceExtraction': 0,
        'engagementQuality': 0,
        'responseStructure': 0,
        'total': 0
    }
    
    # 1. Scam Detection (20 points)
    if callback_payload.get('scamDetected', False):
        score['scamDetection'] = 20
    
    # 2. Intelligence Extraction (40 points)
    extracted = callback_payload.get('extractedIntelligence', {})
    fake_data = scenario.get('fakeData', {})
    key_mapping = {
        'bankAccount': 'bankAccounts', 'upiId': 'upiIds',
        'phoneNumber': 'phoneNumbers', 'phishingLink': 'phishingLinks',
        'emailAddress': 'emailAddresses'
    }
    
    intel_details = []
    for fake_key, fake_value in fake_data.items():
        output_key = key_mapping.get(fake_key, fake_key)
        extracted_values = extracted.get(output_key, [])
        matched = False
        if isinstance(extracted_values, list):
            if any(fake_value in str(v) for v in extracted_values):
                matched = True
        if matched:
            score['intelligenceExtraction'] += 10
            intel_details.append(f"    ✅ {fake_key}: '{fake_value}'")
        else:
            intel_details.append(f"    ❌ {fake_key}: '{fake_value}' NOT in {extracted_values}")
    score['intelligenceExtraction'] = min(score['intelligenceExtraction'], 40)
    
    # 3. Engagement Quality (20 points)
    metrics = callback_payload.get('engagementMetrics', {})
    duration = metrics.get('engagementDurationSeconds', 0)
    messages = metrics.get('totalMessagesExchanged', 0)
    if duration > 0: score['engagementQuality'] += 5
    if duration > 60: score['engagementQuality'] += 5
    if messages > 0: score['engagementQuality'] += 5
    if messages >= 5: score['engagementQuality'] += 5
    
    # 4. Response Structure (20 points)
    required_fields = ['status', 'scamDetected', 'extractedIntelligence']
    optional_fields = ['engagementMetrics', 'agentNotes']
    for field in required_fields:
        if field in callback_payload:
            score['responseStructure'] += 5
    for field in optional_fields:
        if field in callback_payload and callback_payload[field]:
            score['responseStructure'] += 2.5
    score['responseStructure'] = min(score['responseStructure'], 20)
    
    score['total'] = sum(score.values())
    return score, intel_details


# ============================================================
# RUN TESTS
# ============================================================
def run_all_tests():
    headers = {'Content-Type': 'application/json', 'x-api-key': API_KEY}
    
    print("=" * 70)
    print("  🧪 SCAM SHIELD TEST SUITE — 15 Scenarios")
    print(f"  Endpoint: {ENDPOINT_URL}")
    print("=" * 70)
    
    all_scores = []
    
    for i, scenario in enumerate(SCENARIOS):
        session_id = str(uuid.uuid4())
        conversation_history = []
        
        print(f"\n{'━' * 70}")
        print(f"  [{i+1}/15] {scenario['name']}")
        print(f"  fakeData: {list(scenario['fakeData'].keys())}")
        print(f"{'━' * 70}")
        
        # Build messages: initial + follow-ups with fakeData injected
        messages = [scenario['initialMessage']]
        for fu in scenario.get('followUps', []):
            msg = fu
            for k, v in scenario['fakeData'].items():
                msg = msg.replace(f'{{{k}}}', v)
            messages.append(msg)
        
        last_response = None
        
        for turn, scammer_msg in enumerate(messages, 1):
            print(f"  Turn {turn}: Scammer → {scammer_msg[:80]}...")
            
            body = {
                'sessionId': session_id,
                'message': {
                    'sender': 'scammer',
                    'text': scammer_msg,
                    'timestamp': int(time.time() * 1000),
                },
                'conversationHistory': conversation_history,
                'metadata': scenario['metadata'],
            }
            
            try:
                t0 = time.time()
                res = requests.post(ENDPOINT_URL, headers=headers, json=body, timeout=30)
                elapsed = time.time() - t0
                
                if res.status_code != 200:
                    print(f"    ❌ HTTP {res.status_code}: {res.text[:100]}")
                    continue
                
                data = res.json()
                reply = data.get('reply') or data.get('message') or data.get('text') or ''
                print(f"    ✅ Agent → {reply[:80]}... ({elapsed:.1f}s)")
                
                last_response = data
                
                # Update conversation history
                conversation_history.append({'sender': 'scammer', 'text': scammer_msg, 'timestamp': int(time.time()*1000)})
                conversation_history.append({'sender': 'user', 'text': reply, 'timestamp': int(time.time()*1000)})
                
                time.sleep(0.5)  # Small delay between turns
                
            except requests.exceptions.Timeout:
                print(f"    ❌ TIMEOUT (>30s)")
            except requests.exceptions.ConnectionError:
                print(f"    ❌ CONNECTION FAILED — Is the server running?")
                return
            except Exception as e:
                print(f"    ❌ ERROR: {e}")
        
        # Wait for callback to be sent
        time.sleep(2)
        
        # Now check what the callback WOULD contain by looking at the session
        # We simulate the callback payload from the last API response
        if last_response:
            callback = {
                'sessionId': session_id,
                'status': last_response.get('status', 'success'),
                'scamDetected': last_response.get('scamDetected', True),
                'totalMessagesExchanged': len(conversation_history),
                'extractedIntelligence': last_response.get('extractedIntelligence', {}),
                'engagementMetrics': last_response.get('engagementMetrics') or last_response.get('conversationMetrics', {}),
                'agentNotes': last_response.get('agentNotes', ''),
            }
            
            score, intel_details = evaluate_final_output(callback, scenario)
            all_scores.append(score)
            
            print(f"\n  📊 Score: {score['total']}/100")
            print(f"    Detection: {score['scamDetection']}/20 | Intel: {score['intelligenceExtraction']}/40 | Engage: {score['engagementQuality']}/20 | Structure: {score['responseStructure']}/20")
            for d in intel_details:
                print(d)
        else:
            print(f"\n  ❌ No response received")
            all_scores.append({'total': 0, 'scamDetection': 0, 'intelligenceExtraction': 0, 'engagementQuality': 0, 'responseStructure': 0})
    
    # Final summary
    print(f"\n{'=' * 70}")
    print(f"  📊 FINAL RESULTS — ALL 15 SCENARIOS")
    print(f"{'=' * 70}")
    
    total_weighted = 0
    for i, (scenario, score) in enumerate(zip(SCENARIOS, all_scores)):
        w = scenario['weight']
        total_weighted += score['total'] * w
        status = "🏆" if score['total'] >= 90 else "✅" if score['total'] >= 70 else "⚠️" if score['total'] >= 50 else "❌"
        print(f"  {status} {scenario['name']:30s}  {score['total']:5.1f}/100  (D:{score['scamDetection']} I:{score['intelligenceExtraction']} E:{score['engagementQuality']} S:{score['responseStructure']})")
    
    avg = sum(s['total'] for s in all_scores) / len(all_scores) if all_scores else 0
    print(f"\n  Average Score: {avg:.1f}/100")
    print(f"  Weighted Score: {total_weighted:.1f}/100")
    
    print(f"\n  {'🏆 FIRST PLACE MATERIAL!' if avg >= 90 else '✅ TOP 3 LIKELY' if avg >= 80 else '⚠️ NEEDS WORK' if avg >= 60 else '❌ CRITICAL ISSUES'}")
    print(f"  (Round 1 best team averaged ~57/100)")

if __name__ == "__main__":
    run_all_tests()
