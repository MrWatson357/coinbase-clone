import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const TrendUp = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const TrendDown = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

/* ── Ticker ── */
function Ticker() {
  const items = [...cryptos.slice(0, 8), ...cryptos.slice(0, 8)];
  return (
    <div style={{ overflow: "hidden", backgroundColor: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "10px 0", position: "relative", zIndex: 10 }}>
      <div style={{ display: "flex", gap: "40px", whiteSpace: "nowrap", width: "max-content", animation: "ticker 30s linear infinite" }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}>
        {items.map((c, i) => {
          const up = c.change >= 0;
          const accent = getAccent(c.symbol);
          return (
            <Link key={`${c.id}-${i}`} to={`/asset/${c.id}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 8px", textDecoration: "none", opacity: 1, transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: accent, flexShrink: 0, display: "inline-block" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>{c.symbol}</span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>${c.price.toLocaleString()}</span>
              <span style={{ fontSize: "11px", fontWeight: 700, color: up ? "#059669" : "#dc2626", display: "inline-flex", alignItems: "center", gap: "2px" }}>
                {up ? "▲" : "▼"}{Math.abs(c.change)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const cryptoAccent = {
  BTC: "#F7931A", ETH: "#627EEA", SOL: "#9945FF",
  XRP: "#00AAE4", BNB: "#F3BA2F", ADA: "#627EEA",
  DOGE: "#C2A633", USDT: "#26A17B", DOT: "#E6007A",
  AVAX: "#E84142", MATIC: "#8247E5", LINK: "#2A5ADA",
};
const getAccent = (sym) => cryptoAccent[sym] || "#0052FF";

/* ── Typewriter ── */
const WORDS = ["crypto platform", "financial future", "digital wallet", "crypto journey", "investment hub"];

function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => { setPause(false); setDeleting(true); }, 1400);
      return () => clearTimeout(t);
    }
    const current = WORDS[wordIndex];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) { setPause(true); return; }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }
  }, [displayed, deleting, wordIndex, pause]);

  return (
    <span style={{ color: "#0052FF" }}>
      {displayed}
      <span className="animate-blink" style={{ color: "#0052FF" }}>|</span>
    </span>
  );
}

/* ── Crypto Card ── */
function CryptoCard({ crypto, index = 0 }) {
  const up = crypto.change >= 0;
  const accent = getAccent(crypto.symbol);
  const spark = up ? "M0 20 C10 15,22 10,32 7 S50 2,60 0" : "M0 0 C10 5,22 10,32 13 S50 18,60 20";
  const sc = up ? "#059669" : "#dc2626";

  return (
    <Link to={`/asset/${crypto.id}`}
      className="group relative rounded-2xl p-5 flex flex-col gap-3 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
      style={{ border: "1px solid #e5e7eb", animationDelay: `${index * 60}ms` }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent}0d 0%, transparent 65%)` }} />
      <div className="flex items-center justify-between relative z-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black"
          style={{ backgroundColor: accent + "15", border: `1px solid ${accent}25`, color: accent }}>
          {crypto.symbol.slice(0, 2)}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-0.5 ${up ? "text-emerald-700" : "text-red-600"}`}
          style={{ backgroundColor: up ? "#d1fae5" : "#fee2e2" }}>
          {up ? <TrendUp /> : <TrendDown />}{up ? "+" : ""}{crypto.change}%
        </span>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{crypto.symbol}</p>
        <p className="text-sm font-bold text-gray-900 mt-0.5">{crypto.name}</p>
      </div>
      <svg viewBox="0 0 60 22" className="w-full h-8 relative z-10" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`hg-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sc} stopOpacity="0.18" />
            <stop offset="100%" stopColor={sc} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${spark} L60,22 L0,22 Z`} fill={`url(#hg-${crypto.id})`} />
        <path d={spark} stroke={sc} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-lg font-black text-gray-900 tracking-tight relative z-10">
        ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
    </Link>
  );
}

/* ── Sidebar widgets ── */
function FearGreedMeter() {
  const score = 72;
  const label = score >= 55 ? "Greed" : score >= 45 ? "Neutral" : "Fear";
  const color = score >= 55 ? "#059669" : score >= 45 ? "#d97706" : "#dc2626";
  const rotation = -90 + (score / 100) * 180;
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e5e7eb" }}>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Fear &amp; Greed</p>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 60" className="w-28">
          <path d="M10 60 A50 50 0 0 1 110 60" stroke="#f3f4f6" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M10 60 A50 50 0 0 1 110 60" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 157} 157`} />
          <line x1="60" y1="60"
            x2={60 + 38 * Math.cos((rotation * Math.PI) / 180)}
            y2={60 + 38 * Math.sin((rotation * Math.PI) / 180)}
            stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4" fill="#111827" />
        </svg>
        <p className="text-3xl font-black text-gray-900 mt-1">{score}</p>
        <p className="text-sm font-bold mt-0.5" style={{ color }}>{label}</p>
        <p className="text-[10px] text-gray-400 mt-1">Updated daily</p>
      </div>
    </div>
  );
}

function MarketDominance() {
  const coins = [
    { sym: "BTC", pct: 52.4, color: "#F7931A" },
    { sym: "ETH", pct: 17.1, color: "#627EEA" },
    { sym: "BNB", pct: 3.8,  color: "#F3BA2F" },
    { sym: "SOL", pct: 3.2,  color: "#9945FF" },
    { sym: "Others", pct: 23.5, color: "#e5e7eb" },
  ];
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e5e7eb" }}>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Market Dominance</p>
      <div className="flex rounded-full overflow-hidden h-2 mb-5 gap-px">
        {coins.map(c => <div key={c.sym} className="h-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />)}
      </div>
      <div className="space-y-2.5">
        {coins.map(c => (
          <div key={c.sym} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-xs font-semibold text-gray-600">{c.sym}</span>
            </div>
            <span className="text-xs font-bold text-gray-900">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const newsItems = [
  { tag: "Bitcoin",  headline: "BTC breaks above $67K resistance as institutional demand surges", time: "2m ago",  hot: true  },
  { tag: "Ethereum", headline: "ETH staking yields hit 5.2% APY after latest network upgrade",    time: "18m ago", hot: false },
  { tag: "Markets",  headline: "Total crypto market cap reclaims $2.4 trillion milestone",         time: "1h ago",  hot: true  },
  { tag: "Solana",   headline: "SOL DEX volume surpasses Ethereum for third consecutive week",     time: "3h ago",  hot: false },
];

function NewsFeed() {
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #e5e7eb" }}>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Crypto News</p>
      <div className="space-y-4">
        {newsItems.map((n, i) => (
          <div key={i} className="flex gap-3 group cursor-pointer">
            <div className={`w-0.5 rounded-full flex-shrink-0 ${n.hot ? "bg-amber-400" : "bg-blue-400"}`} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded ${n.hot ? "text-amber-700 bg-amber-50" : "text-blue-700 bg-blue-50"}`}>{n.tag}</span>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-snug group-hover:text-blue-600 transition-colors">{n.headline}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/learn" className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
        View all news <ArrowRight />
      </Link>
    </div>
  );
}

function QuickBuy() {
  return (
    <div className="rounded-2xl p-5 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0052FF 0%, #003BB3 100%)" }}>
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)" }} />
      <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Ready to start?</p>
      <p className="text-white font-extrabold text-lg leading-tight mb-4">Buy crypto in under 2 minutes</p>
      <div className="rounded-xl p-3 mb-3 flex items-center gap-2 bg-white/10">
        <span className="text-white/50 text-sm font-semibold">$</span>
        <span className="text-white/50 font-medium text-sm">Enter amount</span>
      </div>
      <Link to="/signup" className="w-full flex items-center justify-center gap-2 bg-white font-bold text-sm py-3 rounded-xl hover:bg-blue-50 transition-colors"
        style={{ color: "#0052FF" }}>
        Get started <ArrowRight />
      </Link>
      <p className="text-blue-200/60 text-[10px] text-center mt-3">No hidden fees · Instant setup</p>
    </div>
  );
}

const features = [
  { bg: "#0052FF", icon: "🔐", title: "Fort-Knox security",    desc: "98% of crypto held in cold storage. Advanced 2FA, biometrics, and insurance coverage.", cta: "Learn about security", to: "/learn",   dark: true  },
  { bg: "#f8fafc", icon: "⚡", title: "Trade in seconds",      desc: "Buy, sell, or swap 200+ cryptocurrencies instantly. Advanced charts for pro traders.",  cta: "Start trading",       to: "/explore", dark: false },
  { bg: "#f0fdf4", icon: "💸", title: "Earn rewards",          desc: "Stake your crypto and earn up to 5% APY. Your money works even while you sleep.",         cta: "View rewards",        to: "/explore", dark: false },
  { bg: "#fefce8", icon: "📱", title: "One wallet, everywhere",desc: "Manage your portfolio from web or mobile. Your assets follow you wherever you go.",       cta: "Get the app",         to: "/signup",  dark: false },
  { bg: "#faf5ff", icon: "📚", title: "Learn & earn",          desc: "Understand crypto from the ground up. Complete lessons and earn free crypto.",             cta: "Start learning",      to: "/learn",   dark: false },
  { bg: "#fff1f2", icon: "🌍", title: "Send anywhere",         desc: "Transfer crypto globally in seconds. Cheaper and faster than traditional wire transfers.", cta: "Explore transfers",   to: "/explore", dark: false },
];

const stats = [
  { value: "$330B+", label: "Quarterly volume traded"  },
  { value: "100M+",  label: "Verified users worldwide" },
  { value: "200+",   label: "Countries supported"      },
  { value: "$0",     label: "Coinbase One trading fees"},
];

const trustedBy = ["Forbes", "Bloomberg", "Wall Street Journal", "TechCrunch", "Financial Times"];

export default function Home() {
  const trending = cryptos.slice(0, 4);
  const gainers  = [...cryptos].sort((a, b) => b.change - a.change).slice(0, 4);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Spacer for sticky navbar */}
      <div style={{ height: "88px" }} />
      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 70%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(#dde8ff 1px, transparent 1px), linear-gradient(90deg, #dde8ff 1px, transparent 1px)",
          backgroundSize: "60px 60px", opacity: 0.35,
        }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,82,255,0.07) 0%, transparent 65%)" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-xs font-semibold text-gray-600"
                style={{ backgroundColor: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by 100+ million people worldwide
              </div>
              <h1 className="text-5xl sm:text-6xl font-black leading-[1.08] tracking-tight text-gray-900 mb-6">
                The most trusted<br /><TypewriterText />
              </h1>
              <p className="text-lg leading-relaxed text-gray-500 mb-8">
                Buy, sell, and grow your crypto portfolio with confidence.
                Join 100 million people building financial freedom on Coinbase.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4 max-w-md">
                <input type="email" placeholder="Email address"
                  className="flex-1 px-5 py-3.5 rounded-full text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none"
                  style={{ border: "1.5px solid #d1d5db" }} />
                <button className="px-7 py-3.5 rounded-full text-sm font-bold text-white whitespace-nowrap hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#0052FF" }}>
                  Get started
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-10">Free to sign up. No hidden fees.</p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[["#F7931A","A"],["#627EEA","J"],["#34d399","K"],["#f87171","R"]].map(([c,l]) => (
                    <div key={l} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: c }}>{l}</div>
                  ))}
                </div>
                <p className="text-sm text-gray-500"><span className="font-bold text-gray-900">100M+</span> users already on Coinbase</p>
              </div>
            </div>

            {/* Portfolio card */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none relative">
              <div className="relative rounded-3xl p-6 bg-white shadow-2xl" style={{ border: "1px solid #e5e7eb" }}>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm font-medium text-gray-500">Portfolio value</p>
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-emerald-700 bg-emerald-50">+4.21% today</span>
                </div>
                <p className="text-4xl font-black text-gray-900 mb-1">$24,831.50</p>
                <p className="text-emerald-600 text-sm font-semibold mb-6">↑ $1,002.40 this week</p>
                {[
                  { sym:"BTC", name:"Bitcoin",  pct:55, color:"#F7931A", val:"$13,657" },
                  { sym:"ETH", name:"Ethereum", pct:30, color:"#627EEA", val:"$7,449"  },
                  { sym:"SOL", name:"Solana",   pct:15, color:"#9945FF", val:"$3,725"  },
                ].map(h => (
                  <div key={h.sym} className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ backgroundColor: h.color+"18", color: h.color }}>{h.sym[0]}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-500">{h.name}</span>
                        <span className="text-xs font-bold text-gray-900">{h.val}</span>
                      </div>
                      <div className="w-full rounded-full h-1.5 bg-gray-100">
                        <div className="h-1.5 rounded-full" style={{ width:`${h.pct}%`, backgroundColor:h.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                style={{ border:"1px solid #e5e7eb" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                  style={{ backgroundColor:"#fff7ed", color:"#F7931A" }}>BT</div>
                <div>
                  <p className="text-[10px] text-gray-400">Bitcoin</p>
                  <p className="text-sm font-extrabold text-gray-900">$67,234</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">+2.4%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-14 border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-gray-900">{s.value}</p>
              <p className="text-sm mt-1 font-medium text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Markets + Sidebar ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color:"#0052FF" }}>Live Markets</p>
                <h2 className="text-3xl font-extrabold text-gray-900">Trending now</h2>
              </div>
              <Link to="/explore" className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
                See all <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-14">
              {trending.map((c, i) => <CryptoCard key={c.id} crypto={c} index={i} />)}
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-emerald-600">🚀 Performance</p>
                <h2 className="text-2xl font-extrabold text-gray-900">Top gainers</h2>
              </div>
              <Link to="/explore" className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">
                See all <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gainers.map((c, i) => <CryptoCard key={c.id} crypto={c} index={i+4} />)}
            </div>
          </div>

          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">
            <FearGreedMeter />
            <MarketDominance />
            <NewsFeed />
            <QuickBuy />
          </div>
        </div>
      </section>

      {/* ── Feature bento ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color:"#0052FF" }}>Why Coinbase</p>
          <h2 className="text-4xl font-black text-gray-900">Everything you need.<br />Nothing you don't.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title}
              className="rounded-3xl p-7 flex flex-col justify-between gap-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 min-h-[220px]"
              style={{ backgroundColor: f.bg, border:"1px solid #e5e7eb" }}>
              <div>
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className={`text-xl font-extrabold mb-2 ${f.dark ? "text-white" : "text-gray-900"}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${f.dark ? "text-blue-100" : "text-gray-500"}`}>{f.desc}</p>
              </div>
              <Link to={f.to} className={`inline-flex items-center gap-1.5 text-sm font-bold hover:opacity-70 transition-opacity ${f.dark ? "text-white" : "text-blue-600"}`}>
                {f.cta} <ArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Press strip ── */}
      <div className="border-y border-gray-100 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-8">As seen in</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {trustedBy.map(n => (
              <span key={n} className="text-lg font-black tracking-tight text-gray-300 hover:text-gray-600 transition-colors cursor-default">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="py-28 px-4" style={{ background:"linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-widest mb-4" style={{ color:"#0052FF" }}>Get started today</p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Your crypto journey<br />starts with one step.
          </h2>
          <p className="text-lg text-gray-500 mb-10">Create your free account in minutes. No experience required.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor:"#0052FF", boxShadow:"0 8px 30px rgba(0,82,255,0.25)" }}>
              Create free account <ArrowRight />
            </Link>
            <Link to="/explore"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-gray-700 transition-all hover:border-gray-400 bg-white"
              style={{ border:"1.5px solid #d1d5db" }}>
              Browse markets
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-end infinite; }
        input:focus { box-shadow: 0 0 0 2px rgba(0,82,255,0.25); }
      `}</style>
    </div>
  );
}