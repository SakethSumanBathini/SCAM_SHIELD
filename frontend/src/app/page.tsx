"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Zap,
  Database,
  TrendingUp,
  MessageSquare,
  Radio,
  Phone,
  CreditCard,
  Link2,
  Mail,
  Target,
  Wifi,
  WifiOff,
  BarChart3,
  PieChart,
  Send,
  Copy,
  RefreshCw,
  Bot,
  UserX,
  Fingerprint,
  Trash2,
  Download,
  Sparkles,
  Scan,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  MapPin,
  FileText,
  Brain,
  ShieldAlert,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const API_URL = "http://127.0.0.1:8000";
const API_KEY = "sk-scamshield-2024-hackathon-key";

// ============================================
// COMPONENTS
// ============================================

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/20"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -500], opacity: [0, 0.6, 0] }}
          transition={{
            duration: Math.random() * 12 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}

function Logo() {
  return (
    <motion.div className="relative w-11 h-11" whileHover={{ scale: 1.1 }}>
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-purple-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 12px rgba(139,92,246,0.4)",
            "0 0 24px rgba(139,92,246,0.6)",
            "0 0 12px rgba(139,92,246,0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Shield className="w-5 h-5 text-white" />
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant = "purple",
}: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      let c = 0;
      const t = setInterval(() => {
        c += value / 25;
        if (c >= value) {
          setCount(value);
          clearInterval(t);
        } else {
          setCount(Math.floor(c));
        }
      }, 40);
      return () => clearInterval(t);
    } else {
      setCount(value);
    }
  }, [value]);

  const borderColors: any = {
    purple: "border-purple-500/30 hover:border-purple-500/50",
    red: "border-red-500/30 hover:border-red-500/50",
    cyan: "border-cyan-500/30 hover:border-cyan-500/50",
    green: "border-green-500/30 hover:border-green-500/50",
  };

  const iconColors: any = {
    purple: "bg-purple-500/20 text-purple-400",
    red: "bg-red-500/20 text-red-400",
    cyan: "bg-cyan-500/20 text-cyan-400",
    green: "bg-green-500/20 text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`p-4 rounded-2xl bg-gray-900/60 backdrop-blur border ${borderColors[variant]} transition-all cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${iconColors[variant]}`}>
          <Icon size={18} />
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-bold flex items-center gap-0.5 ${trend >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {trend >= 0 ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-xl font-bold">
        {typeof value === "number" ? count : count}
      </p>
    </motion.div>
  );
}

function ThreatGauge({
  level,
  confidence,
}: {
  level: string;
  confidence: number;
}) {
  const colors: any = {
    CRITICAL: "#ef4444",
    HIGH: "#f97316",
    MEDIUM: "#eab308",
    LOW: "#22c55e",
    SAFE: "#06b6d4",
  };
  const color = colors[level] || colors.SAFE;

  return (
    <div className="relative w-40 h-24 mx-auto">
      <svg viewBox="0 0 200 110" className="w-full">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path
          d="M 20 95 A 80 80 0 0 1 180 95"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <motion.path
          d="M 20 95 A 80 80 0 0 1 180 95"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: confidence }}
          transition={{ duration: 1.5 }}
        />
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: confidence * 180 - 90 }}
          transition={{ duration: 1.5, type: "spring" }}
          style={{ transformOrigin: "100px 95px" }}
        >
          <line
            x1="100"
            y1="95"
            x2="100"
            y2="45"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="95" r="5" fill={color} />
        </motion.g>
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <p className="text-lg font-bold" style={{ color }}>
          {Math.round(confidence * 100)}%
        </p>
        <p className="text-[9px] font-bold uppercase" style={{ color }}>
          {level}
        </p>
      </div>
    </div>
  );
}

function Btn({
  children,
  onClick,
  disabled,
  loading,
  variant = "primary",
  icon: Icon,
  className = "",
}: any) {
  const variants: any = {
    primary: "bg-purple-600 hover:bg-purple-500 text-white",
    secondary:
      "bg-gray-800 border border-gray-700 hover:border-purple-500/50 text-gray-300",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {loading ? (
        <RefreshCw size={14} className="animate-spin" />
      ) : (
        Icon && <Icon size={14} />
      )}
      {children}
    </motion.button>
  );
}

function IntelCard({ type, value, onCopy }: any) {
  const configs: any = {
    phone: {
      icon: Phone,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    upi: {
      icon: CreditCard,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    link: {
      icon: Link2,
      color: "text-red-400 bg-red-500/10 border-red-500/20",
    },
    email: {
      icon: Mail,
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    },
    aadhaar: {
      icon: Fingerprint,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    keyword: {
      icon: AlertTriangle,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  };
  const config = configs[type] || configs.keyword;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01, x: 2 }}
      onClick={onCopy}
      className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${config.color}`}
    >
      <Icon size={12} />
      <div className="flex-1 min-w-0">
        <p className="text-[8px] opacity-50 uppercase">{type}</p>
        <p className="text-[11px] font-mono truncate">{value}</p>
      </div>
      <Copy size={10} className="opacity-30" />
    </motion.div>
  );
}

function ChatBubble({ sender, text, index }: any) {
  const isScammer = sender === "scammer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div
        className={`p-2.5 rounded-lg ${isScammer ? "bg-red-500/10 border-l-2 border-red-500 mr-4" : "bg-green-500/10 border-l-2 border-green-500 ml-4"}`}
      >
        <div className="flex items-center gap-1 mb-1">
          {isScammer ? (
            <UserX size={10} className="text-red-400" />
          ) : (
            <Bot size={10} className="text-green-400" />
          )}
          <span
            className={`text-[9px] font-bold uppercase ${isScammer ? "text-red-400" : "text-green-400"}`}
          >
            {isScammer ? "Scammer" : "AI Agent"}
          </span>
        </div>
        <p className="text-xs">{text}</p>
      </div>
    </motion.div>
  );
}

function PhishingScanner({ links }: { links: string[] }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
      <h4 className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1">
        <ShieldAlert size={12} /> Phishing Analysis
      </h4>
      {links.map((link, i) => (
        <div
          key={i}
          className="text-[10px] p-1.5 rounded bg-black/20 mb-1 flex items-center gap-2"
        >
          <Link2 size={10} className="text-red-400" />
          <span className="font-mono truncate flex-1">{link}</span>
          <span className="px-1.5 py-0.5 rounded bg-red-500/30 text-red-300">
            DANGEROUS
          </span>
        </div>
      ))}
    </div>
  );
}

function PhoneReputation({ phones }: { phones: string[] }) {
  if (!phones || phones.length === 0) return null;

  return (
    <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
      <h4 className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1">
        <Phone size={12} /> Phone Reputation
      </h4>
      {phones.slice(0, 3).map((phone, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-[10px] p-1.5 rounded bg-black/20 mb-1"
        >
          <span className="font-mono">{phone}</span>
          <span className="px-1.5 py-0.5 rounded bg-yellow-500/30 text-yellow-300">
            SUSPICIOUS
          </span>
        </div>
      ))}
    </div>
  );
}

function ScammerPrediction({ category }: { category: string }) {
  const predictions: any = {
    BANKING_FRAUD: [
      "Will ask for OTP",
      "May request screen share",
      "Will create urgency",
    ],
    UPI_FRAUD: ["Will send fake screenshot", "Will ask to install app"],
    LOTTERY_SCAM: ["Will ask for processing fee", "Will request bank details"],
    KYC_FRAUD: ["Will send phishing link", "Will ask for Aadhaar"],
    JOB_SCAM: ["Will ask for registration fee"],
    INVESTMENT_FRAUD: ["Will show fake profits", "Will ask for investment"],
  };
  const preds = predictions[category] || [
    "Will extract personal info",
    "Will create false urgency",
  ];

  return (
    <div className="mt-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
      <h4 className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1">
        <Brain size={12} /> Behavior Prediction
      </h4>
      {preds.map((pred: string, i: number) => (
        <div
          key={i}
          className="flex items-center gap-1.5 text-[10px] text-gray-300 mb-1"
        >
          <div className="w-1 h-1 rounded-full bg-purple-400" />
          {pred}
        </div>
      ))}
    </div>
  );
}

function LocationHeatmap() {
  const locations = [
    { state: "Maharashtra", count: 45 },
    { state: "Delhi", count: 32 },
    { state: "Karnataka", count: 28 },
    { state: "West Bengal", count: 24 },
    { state: "Tamil Nadu", count: 18 },
  ];

  return (
    <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800">
      <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
        <MapPin size={12} className="text-red-400" /> Scam Heatmap
      </h4>
      {locations.map((loc, i) => (
        <div key={i} className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] w-20 truncate">{loc.state}</span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${(loc.count / 45) * 100}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          </div>
          <span className="text-[10px] text-gray-500 w-6">{loc.count}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================
// EXAMPLES
// ============================================
const EXAMPLES = [
  {
    id: "bank",
    label: "Banking Fraud",
    icon: CreditCard,
    text: "URGENT! SBI account BLOCKED! Call +91-9876543210, share OTP! Acc: 12345678901234",
  },
  {
    id: "upi",
    label: "UPI Fraud",
    icon: Zap,
    text: "₹15,000 cashback! Send ₹99 to verify. UPI: cashback@ybl. Call: 8765432109",
  },
  {
    id: "lottery",
    label: "Lottery Scam",
    icon: Sparkles,
    text: "Won ₹25 Lakhs! Pay ₹5,000 to lottery@paytm. Call: +91-7654321098",
  },
  {
    id: "kyc",
    label: "KYC Fraud",
    icon: FileText,
    text: "Paytm suspended! http://paytm-kyc.xyz Share Aadhaar+OTP. Call: 9123456780",
  },
  {
    id: "job",
    label: "Job Scam",
    icon: Target,
    text: "Work from home ₹50K! Pay ₹1,000 registration. Call: +91-8899776655",
  },
  {
    id: "crypto",
    label: "Crypto Scam",
    icon: TrendingUp,
    text: "DOUBLE money! 200% returns! http://crypto-profit.ml UPI: invest@ybl",
  },
];

// ============================================
// MAIN DASHBOARD
// ============================================
export default function Dashboard() {
  const [connected, setConnected] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [intelligence, setIntelligence] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState(`session-${Date.now()}`);
  const [conversation, setConversation] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("test");
  const [toast, setToast] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chart data
  const chartData = [
    { time: "00", scams: 4 },
    { time: "04", scams: 8 },
    { time: "08", scams: 15 },
    { time: "12", scams: 22 },
    { time: "16", scams: 28 },
    { time: "20", scams: 18 },
  ];

  const pieData = [
    { name: "Banking", value: 35, color: "#ef4444" },
    { name: "UPI", value: 25, color: "#a855f7" },
    { name: "Lottery", value: 15, color: "#f59e0b" },
    { name: "KYC", value: 12, color: "#f97316" },
    { name: "Job", value: 8, color: "#22c55e" },
    { name: "Other", value: 5, color: "#06b6d4" },
  ];

  const radarData = [
    { subject: "Urgency", value: 85 },
    { subject: "Threats", value: 70 },
    { subject: "Money", value: 65 },
    { subject: "Creds", value: 90 },
    { subject: "Links", value: 55 },
  ];

  // API calls
  const checkConnection = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/health`, {
        headers: { "x-api-key": API_KEY },
      });
      setConnected(res.ok);
    } catch {
      setConnected(false);
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!connected) return;
    try {
      const [analyticsRes, sessionsRes, intelRes] = await Promise.all([
        fetch(`${API_URL}/api/analytics/dashboard`, {
          headers: { "x-api-key": API_KEY },
        }),
        fetch(`${API_URL}/api/sessions`, { headers: { "x-api-key": API_KEY } }),
        fetch(`${API_URL}/api/intelligence`, {
          headers: { "x-api-key": API_KEY },
        }),
      ]);
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (sessionsRes.ok)
        setSessions((await sessionsRes.json()).sessions || []);
      if (intelRes.ok)
        setIntelligence((await intelRes.json()).intelligence || []);
    } catch (e) {
      console.error(e);
    }
  }, [connected]);

  useEffect(() => {
    checkConnection();
    const interval = setInterval(() => {
      checkConnection();
      loadData();
    }, 5000);
    return () => clearInterval(interval);
  }, [checkConnection, loadData]);

  useEffect(() => {
    if (connected) loadData();
  }, [connected, loadData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const sendMessage = async () => {
    if (!message.trim() || !connected || loading) return;
    const currentMessage = message;
    setLoading(true);

    try {
      const currentConversation = [...conversation];

      const res = await fetch(`${API_URL}/api/honeypot`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({
          sessionId,
          message: {
            sender: "scammer",
            text: currentMessage,
            timestamp: Date.now(),
          },
          conversationHistory: currentConversation,
          metadata: { channel: "SMS", language: "English", locale: "IN" },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setToast(
          `Error ${res.status}: ${errData.detail || errData.message || "Request failed"}`,
        );
        setTimeout(() => setToast(""), 4000);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.reply) {
        setConversation([
          ...currentConversation,
          { sender: "scammer", text: currentMessage, timestamp: Date.now() },
          { sender: "agent", text: data.reply, timestamp: Date.now() },
        ]);
        setResult(data);
        setMessage("");
        loadData();
      } else {
        setToast("No reply received from API");
        setTimeout(() => setToast(""), 4000);
      }
    } catch (e: any) {
      console.error("Send failed:", e);
      setToast(`Network error: ${e.message}`);
      setTimeout(() => setToast(""), 4000);
    }

    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast("Copied!");
    setTimeout(() => setToast(""), 2000);
  };

  const clearSession = () => {
    setConversation([]);
    setResult(null);
    setSessionId(`session-${Date.now()}`);
  };

  const generateReport = () => {
    if (!result) return;

    const reportText = `SCAM SHIELD REPORT
========================================
Session: ${sessionId}
Date: ${new Date().toLocaleString()}

THREAT ANALYSIS
----------------------------------------
Level: ${result.analysis?.threatLevel || "N/A"}
Category: ${result.analysis?.scamCategory || "N/A"}
Confidence: ${Math.round((result.analysis?.confidenceScore || 0) * 100)}%

EXTRACTED INTELLIGENCE
----------------------------------------
${JSON.stringify(result.extractedIntelligence, null, 2)}

CONVERSATION
----------------------------------------
${conversation.map((m) => `[${m.sender.toUpperCase()}]: ${m.text}`).join("\n\n")}
`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scam-report-${sessionId}.txt`;
    a.click();
    setToast("Report Downloaded!");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Particles />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-lg text-green-400 text-xs font-semibold backdrop-blur flex items-center gap-1"
          >
            <CheckCircle size={12} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-[#0a0a0f]/80 border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo />
            <div>
              <h1 className="font-bold text-lg">
                SCAM
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  SHIELD
                </span>
              </h1>
              <p className="text-[9px] text-gray-500">AI Honeypot • v4.0</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${connected ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-red-400"} animate-pulse`}
            />
            {connected ? "Connected" : "Offline"}
            {connected ? <Wifi size={12} /> : <WifiOff size={12} />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <StatCard
            icon={Radio}
            label="Sessions"
            value={analytics?.realtime?.activeSessions || 0}
            trend={12}
            variant="purple"
          />
          <StatCard
            icon={Target}
            label="Scams"
            value={analytics?.realtime?.scamsDetectedToday || 0}
            trend={8}
            variant="red"
          />
          <StatCard
            icon={Database}
            label="Intel"
            value={analytics?.realtime?.intelligenceExtracted || 0}
            trend={25}
            variant="cyan"
          />
          <StatCard
            icon={Zap}
            label="Response"
            value={analytics?.realtime?.avgResponseTime || "1.2s"}
            variant="green"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto">
          {[
            { id: "test", icon: Send, label: "Test" },
            { id: "sessions", icon: MessageSquare, label: "Sessions" },
            { id: "intel", icon: Database, label: "Intel" },
            { id: "analytics", icon: BarChart3, label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* TEST TAB */}
          {activeTab === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-4"
            >
              {/* Column 1 */}
              <div className="space-y-4">
                {/* Examples */}
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-yellow-400" />
                    Examples
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {EXAMPLES.map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => setMessage(ex.text)}
                        className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700/50 hover:border-purple-500/30 transition-all text-left"
                      >
                        <ex.icon size={12} className="text-purple-400" />
                        <span className="text-[10px] font-medium">
                          {ex.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-red-400" />
                    Input
                  </h3>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Paste scam message..."
                    rows={2}
                    className="w-full p-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-xs placeholder-gray-500 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <Btn
                      onClick={sendMessage}
                      disabled={!message.trim() || !connected}
                      loading={loading}
                      icon={Send}
                      className="flex-1"
                    >
                      Analyze
                    </Btn>
                    <Btn
                      onClick={clearSession}
                      variant="secondary"
                      icon={Trash2}
                    />
                  </div>
                </div>

                {/* Chat */}
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold flex items-center gap-1.5">
                      <MessageSquare size={14} className="text-cyan-400" />
                      Chat
                    </h3>
                    <span className="text-[8px] text-gray-500 font-mono">
                      {sessionId.slice(0, 10)}...
                    </span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {conversation.length === 0 ? (
                      <p className="text-center py-6 text-gray-500 text-xs">
                        Send message to start
                      </p>
                    ) : (
                      conversation.map((msg, i) => (
                        <ChatBubble
                          key={i}
                          sender={msg.sender}
                          text={msg.text}
                          index={i}
                        />
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                {result ? (
                  <>
                    {/* Threat Analysis */}
                    <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold flex items-center gap-1.5">
                          <Scan size={14} className="text-purple-400" />
                          Threat
                        </h3>
                        <Btn
                          onClick={generateReport}
                          variant="secondary"
                          icon={Download}
                          className="text-[10px] px-2 py-1"
                        >
                          Report
                        </Btn>
                      </div>
                      <ThreatGauge
                        level={result.analysis?.threatLevel || "SAFE"}
                        confidence={result.analysis?.confidenceScore || 0}
                      />
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="p-2 rounded-lg bg-gray-800/50 text-center">
                          <p className="text-[9px] text-gray-500">Category</p>
                          <p className="text-xs font-semibold">
                            {result.analysis?.scamCategory?.replace(
                              /_/g,
                              " ",
                            ) || "N/A"}
                          </p>
                        </div>
                        <div className="p-2 rounded-lg bg-gray-800/50 text-center">
                          <p className="text-[9px] text-gray-500">Agent</p>
                          <p className="text-xs font-semibold">
                            {result.agentState?.personaName || "N/A"}
                          </p>
                        </div>
                      </div>
                      {result.analysis?.detectedKeywords?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[9px] text-gray-500 mb-1">
                            Keywords
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {result.analysis.detectedKeywords
                              .slice(0, 6)
                              .map((kw: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px]"
                                >
                                  {kw}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <ScammerPrediction
                      category={result.analysis?.scamCategory}
                    />
                    <PhishingScanner
                      links={result.extractedIntelligence?.phishingLinks || []}
                    />
                    <PhoneReputation
                      phones={result.extractedIntelligence?.phoneNumbers || []}
                    />
                  </>
                ) : (
                  <div className="p-6 rounded-xl bg-gray-900/60 border border-gray-800 text-center">
                    <Scan className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                    <p className="text-gray-500 text-xs">
                      Results will appear here
                    </p>
                  </div>
                )}
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                {/* Intelligence */}
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                    <Fingerprint size={14} className="text-cyan-400" />
                    Intel
                  </h3>
                  {result?.extractedIntelligence ? (
                    <div className="space-y-1.5 max-h-44 overflow-y-auto">
                      {Object.entries(result.extractedIntelligence)
                        .filter(
                          ([key, values]: any) =>
                            Array.isArray(values) && values.length > 0,
                        )
                        .map(([key, values]: any) =>
                          values.map((value: string, i: number) => (
                            <IntelCard
                              key={`${key}-${i}`}
                              type={key
                                .replace("Numbers", "")
                                .replace("Ids", "")
                                .replace("Links", "")
                                .replace("Addresses", "")
                                .toLowerCase()}
                              value={value}
                              onCopy={() => copyToClipboard(value)}
                            />
                          )),
                        )}
                      {Object.values(result.extractedIntelligence).flat()
                        .length === 0 && (
                        <p className="text-center py-4 text-gray-500 text-xs">
                          No intelligence
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500 text-xs">
                      Intel will appear here
                    </p>
                  )}
                </div>

                <LocationHeatmap />
              </div>
            </motion.div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {/* Area Chart */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                  <TrendingUp size={14} className="text-purple-400" />
                  Activity (24h)
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient
                          id="colorArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#a855f7"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#a855f7"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          background: "#1a1a2e",
                          border: "1px solid #333",
                          borderRadius: 6,
                          fontSize: 11,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="scams"
                        stroke="#a855f7"
                        fill="url(#colorArea)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                  <PieChart size={14} className="text-cyan-400" />
                  Categories
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={entry.color}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#1a1a2e",
                          border: "1px solid #333",
                          borderRadius: 6,
                          fontSize: 11,
                        }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {pieData.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-[10px] text-gray-400"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                  <Activity size={14} className="text-red-400" />
                  Threat Radar
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#888", fontSize: 9 }}
                      />
                      <Radar
                        dataKey="value"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
                  <BarChart3 size={14} className="text-green-400" />
                  Stats
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
                    <p className="text-[10px] text-gray-400">Sessions</p>
                    <p className="text-lg font-bold text-purple-400">
                      {analytics?.totals?.totalSessions || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                    <p className="text-[10px] text-gray-400">Scams</p>
                    <p className="text-lg font-bold text-red-400">
                      {analytics?.totals?.totalScamsDetected || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                    <p className="text-[10px] text-gray-400">Intel</p>
                    <p className="text-lg font-bold text-cyan-400">
                      {analytics?.totals?.totalIntelligence || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <p className="text-[10px] text-gray-400">Success</p>
                    <p className="text-lg font-bold text-green-400">
                      {analytics?.totals?.successRate || "0%"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SESSIONS TAB */}
          {activeTab === "sessions" && (
            <motion.div
              key="sessions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3">
                  Sessions ({sessions.length})
                </h3>
                {sessions.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-xs">
                    No sessions yet
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {sessions.map((session, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/50 border border-gray-700"
                      >
                        <div>
                          <p className="text-xs font-mono">
                            #{session.sessionId?.slice(0, 12)}...
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {session.scamCategory?.replace(/_/g, " ") ||
                              "Unknown"}{" "}
                            • {session.messageCount} msgs
                          </p>
                        </div>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            session.threatLevel === "CRITICAL"
                              ? "bg-red-500/20 text-red-400"
                              : session.threatLevel === "HIGH"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {session.threatLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* INTELLIGENCE TAB */}
          {activeTab === "intel" && (
            <motion.div
              key="intel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800">
                <h3 className="text-sm font-semibold mb-3">
                  Intelligence ({intelligence.length})
                </h3>
                {intelligence.length === 0 ? (
                  <p className="text-center py-8 text-gray-500 text-xs">
                    No intelligence yet
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                    {intelligence.slice(0, 30).map((item, i) => (
                      <IntelCard
                        key={i}
                        type={item.type}
                        value={item.value}
                        onCopy={() => copyToClipboard(item.value)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-4">
        <div className="max-w-[1600px] mx-auto px-4 py-2 flex justify-between items-center text-[10px] text-gray-500">
          <span>🛡️ SCAM SHIELD v4.0 • GUVI Hackathon</span>
          <span className="font-mono text-purple-400">{API_KEY}</span>
        </div>
      </footer>
    </div>
  );
}
