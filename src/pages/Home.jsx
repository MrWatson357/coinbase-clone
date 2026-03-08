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

const cryptoColors = {
  BTC:  { bg: "bg-orange-500" }, ETH:  { bg: "bg-indigo-500" },
  SOL:  { bg: "bg-purple-500" }, XRP:  { bg: "bg-blue-500"   },
  BNB:  { bg: "bg-yellow-500" }, ADA:  { bg: "bg-teal-500"   },
  DOGE: { bg: "bg-amber-500"  },
};

/* ── Ticker ── */
function Ticker() {
  const items = [...cryptos.slice(0, 8), ...cryptos.slice(0, 8)];
  return (
    <div className="overflow-hidden border-y border-white/10 py-3" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {items.map((c, i) => {
          const up = c.change >= 0;
          return (
            <Link key={`${c.id}-${i}`} to={`/asset/${c.id}`}
              className="inline-flex items-center gap-2 px-2 hover:opacity-70 transition-opacity">
              <span className="text-sm font-bold text-white">{c.symbol}</span>
              <span className="text-sm text-blue-200">${c.price.toLocaleString()}</span>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? "text-green-300" : "text-red-300"}`}>
                {up ? <TrendUp /> : <TrendDown />}{Math.abs(c.change)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Card themes — solid, high contrast ── */
const cardThemes = [
  { wrapper: "bg-[#0a0a1a]", name: "text-white",     sym: "text-gray-500",   price: "text-white",     changeDark: true  },
  { wrapper: "bg-white",     name: "text-slate-900", sym: "text-slate-400",  price: "text-slate-900", changeDark: false },
  { wrapper: "bg-[#111827]", name: "text-white",     sym: "text-gray-500",   price: "text-white",     changeDark: true  },
  { wrapper: "bg-white",     name: "text-slate-900", sym: "text-slate-400",  price: "text-slate-900", changeDark: false },
  { wrapper: "bg-[#1e1b4b]", name: "text-white",     sym: "text-indigo-300", price: "text-white",     changeDark: true  },
  { wrapper: "bg-[#0a0a1a]", name: "text-white",     sym: "text-gray-500",   price: "text-white",     changeDark: true  },
  { wrapper: "bg-white",     name: "text-slate-900", sym: "text-slate-400",  price: "text-slate-900", changeDark: false },
  { wrapper: "bg-[#111827]", name: "text-white",     sym: "text-gray-500",   price: "text-white",     changeDark: true  },
];

function CryptoCard({ crypto, themeIndex = 0 }) {
  const up  = crypto.change >= 0;
  const col = cryptoColors[crypto.symbol] || { bg: "bg-gray-500" };
  const t   = cardThemes[themeIndex % cardThemes.length];
  const spark      = up ? "M0 20 C8 17,18 13,28 9 S44 3,60 1" : "M0 1 C8 5,18 9,28 13 S44 19,60 21";
  const sparkColor = t.changeDark ? (up ? "#4ade80" : "#f87171") : (up ? "#16a34a" : "#ef4444");

  return (
    <Link to={`/asset/${crypto.id}`}
      className={`group ${t.wrapper} rounded-2xl p-5 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl ${col.bg} flex items-center justify-center text-xs font-black text-white`}>
          {crypto.symbol.slice(0, 2)}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5
          ${t.changeDark
            ? (up ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300")
            : (up ? "bg-green-100 text-green-700"    : "bg-red-100 text-red-600")}`}>
          {up ? <TrendUp /> : <TrendDown />}{up ? "+" : ""}{crypto.change}%
        </span>
      </div>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-widest ${t.sym}`}>{crypto.symbol}</p>
        <p className={`font-bold text-sm mt-0.5 ${t.name}`}>{crypto.name}</p>
      </div>
      <svg viewBox="0 0 60 22" className="w-full h-9" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`sg-${crypto.id}-${themeIndex}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sparkColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={sparkColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${spark} L60,22 L0,22 Z`} fill={`url(#sg-${crypto.id}-${themeIndex})`} />
        <path d={spark} stroke={sparkColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className={`text-xl font-extrabold tracking-tight ${t.price}`}>
        ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
    </Link>
  );
}

/* ── Sidebar widgets ── */
function FearGreedMeter() {
  const score    = 72;
  const label    = score >= 75 ? "Extreme Greed" : score >= 55 ? "Greed" : score >= 45 ? "Neutral" : score >= 25 ? "Fear" : "Extreme Fear";
  const color    = score >= 55 ? "#16a34a" : score >= 45 ? "#ca8a04" : "#ef4444";
  const rotation = -90 + (score / 100) * 180;
  return (
    <div className="bg-[#0a0a1a] rounded-2xl p-5">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fear &amp; Greed Index</p>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 60" className="w-28">
          <path d="M10 60 A50 50 0 0 1 110 60" stroke="#1f2937" strokeWidth="10" fill="none" strokeLinecap="round"/>
          <path d="M10 60 A50 50 0 0 1 110 60" stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
            strokeDasharray={`${(score/100)*157} 157`}/>
          <line x1="60" y1="60"
            x2={60 + 38 * Math.cos((rotation * Math.PI) / 180)}
            y2={60 + 38 * Math.sin((rotation * Math.PI) / 180)}
            stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="60" cy="60" r="4" fill="white"/>
        </svg>
        <p className="text-3xl font-black text-white mt-1">{score}</p>
        <p className="text-sm font-bold mt-0.5" style={{ color }}>{label}</p>
        <p className="text-xs text-gray-500 mt-1">Updated daily</p>
      </div>
      <div className="flex justify-between mt-4 text-[10px] font-semibold text-gray-600">
        <span>Extreme Fear</span><span>Neutral</span><span>Extreme Greed</span>
      </div>
    </div>
  );
}

function MarketDominance() {
  const coins = [
    { sym: "BTC", pct: 52.4, color: "bg-orange-500" },
    { sym: "ETH", pct: 17.1, color: "bg-indigo-500" },
    { sym: "BNB", pct:  3.8, color: "bg-yellow-500" },
    { sym: "SOL", pct:  3.2, color: "bg-purple-500" },
    { sym: "Others", pct: 23.5, color: "bg-gray-600" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Market Dominance</p>
      <div className="flex rounded-full overflow-hidden h-3 mb-4 gap-px">
        {coins.map(c => <div key={c.sym} className={`${c.color} h-full`} style={{ width: `${c.pct}%` }} />)}
      </div>
      <div className="space-y-2.5">
        {coins.map(c => (
          <div key={c.sym} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
              <span className="text-xs font-semibold text-gray-700">{c.sym}</span>
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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Crypto News</p>
      <div className="space-y-4">
        {newsItems.map((n, i) => (
          <div key={i} className="flex gap-3 group cursor-pointer">
            <div className={`w-1 rounded-full flex-shrink-0 ${n.hot ? "bg-orange-400" : "bg-blue-200"}`} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded
                  ${n.hot ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"}`}>{n.tag}</span>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs font-semibold text-gray-700 leading-snug group-hover:text-blue-600 transition-colors">{n.headline}</p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/learn" className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
        View all news <ArrowRight />
      </Link>
    </div>
  );
}

function QuickBuy() {
  return (
    <div className="bg-[#0052FF] rounded-2xl p-5">
      <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Ready to start?</p>
      <p className="text-white font-extrabold text-lg leading-tight mb-4">Buy crypto in under 2 minutes</p>
      <div className="bg-white/15 rounded-xl p-3 mb-3 flex items-center gap-2">
        <span className="text-white/70 text-sm font-semibold">$</span>
        <span className="text-white font-bold text-sm">Enter amount</span>
      </div>
      <Link to="/signup" className="w-full flex items-center justify-center gap-2 bg-white text-[#0052FF] font-bold text-sm py-3 rounded-xl hover:bg-blue-50 transition-colors">
        Get started <ArrowRight />
      </Link>
      <p className="text-blue-200 text-[10px] text-center mt-3">No hidden fees · Instant setup</p>
    </div>
  );
}

/* ── Feature cards ── */
const features = [
  { bg: "bg-[#0052FF]", icon: "🔐", title: "Fort-Knox security",     desc: "98% of crypto held in cold storage. Advanced 2FA, biometrics, and insurance coverage on all digital assets.", cta: "Learn about security", to: "/learn",   dark: true  },
  { bg: "bg-[#1a1a2e]", icon: "⚡", title: "Trade in seconds",       desc: "Buy, sell, or swap 200+ cryptocurrencies instantly. Advanced charts for pro traders.",                          cta: "Start trading",        to: "/explore", dark: true  },
  { bg: "bg-emerald-400",icon:"💸", title: "Earn rewards",           desc: "Stake your crypto and earn up to 5% APY. Your money works even while you sleep.",                               cta: "View rewards",         to: "/explore", dark: false },
  { bg: "bg-amber-300", icon: "📱", title: "One wallet, everywhere", desc: "Manage your portfolio from web or mobile. Your assets follow you wherever you go.",                            cta: "Get the app",          to: "/signup",  dark: false },
  { bg: "bg-[#7c3aed]", icon: "📚", title: "Learn & earn",           desc: "Understand crypto from the ground up. Complete lessons and earn free crypto as you learn.",                    cta: "Start learning",       to: "/learn",   dark: true  },
  { bg: "bg-rose-500",  icon: "🌍", title: "Send anywhere",          desc: "Transfer crypto globally in seconds, not days. Cheaper and faster than traditional wire transfers.",           cta: "Explore transfers",    to: "/explore", dark: true  },
];

const stats    = [
  { value: "$330B+", label: "Quarterly volume traded"   },
  { value: "100M+",  label: "Verified users worldwide"  },
  { value: "200+",   label: "Countries supported"       },
  { value: "$0",     label: "Coinbase One trading fees" },
];
const trustedBy = ["Forbes", "Bloomberg", "The Wall Street Journal", "TechCrunch", "Financial Times"];

/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const trending = cryptos.slice(0, 4);
  const gainers  = [...cryptos].sort((a, b) => b.change - a.change).slice(0, 4);

  return (
    <div style={{ background: "linear-gradient(145deg,#060d2e 0%,#0d1b6e 22%,#0052FF 50%,#1a3fa8 72%,#060d2e 100%)" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* glow orbs */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(0,82,255,0.35) 0%,transparent 68%)" }} />
        <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,0.2) 0%,transparent 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Left copy */}
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-6"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/80">Live markets · 200+ assets</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight">
                The future<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg,#93c5fd,#c4b5fd,#6ee7b7)" }}>
                  of money
                </span><br />
                is here.
              </h1>

              <p className="mt-6 text-lg text-white/55 leading-relaxed">
                Buy, sell, and grow your crypto portfolio with confidence.
                Join 100 million people building financial freedom on Coinbase.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup"
                  className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold
                             text-blue-700 hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/30">
                  Get started for free <ArrowRight />
                </Link>
                <Link to="/explore"
                  className="flex items-center gap-2 rounded-full border-2 border-white/25 px-7 py-3.5
                             text-sm font-bold text-white hover:border-white/60 transition-all">
                  View markets
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[["bg-orange-400","A"],["bg-indigo-400","J"],["bg-teal-400","K"],["bg-rose-400","R"]].map(([c,l]) => (
                    <div key={l} className={`w-8 h-8 rounded-full ${c} border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold`}>{l}</div>
                  ))}
                </div>
                <p className="text-sm text-white/55"><span className="font-bold text-white">100M+</span> users already on Coinbase</p>
              </div>
            </div>

            {/* Right — hero card */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none">
              <div className="relative">
                <div className="backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-white/50 text-sm font-medium">Portfolio value</p>
                    <span className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(74,222,128,0.2)", color: "#86efac" }}>+4.21% today</span>
                  </div>
                  <p className="text-4xl font-black text-white mb-1">$24,831.50</p>
                  <p className="text-green-400 text-sm font-semibold mb-6">↑ $1,002.40 this week</p>
                  {[
                    { sym:"BTC", name:"Bitcoin",  pct:55, col:"bg-orange-500", val:"$13,657" },
                    { sym:"ETH", name:"Ethereum", pct:30, col:"bg-indigo-500", val:"$7,449"  },
                    { sym:"SOL", name:"Solana",   pct:15, col:"bg-purple-500", val:"$3,725"  },
                  ].map(h => (
                    <div key={h.sym} className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full ${h.col} flex items-center justify-center text-xs font-black text-white flex-shrink-0`}>{h.sym[0]}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-semibold text-white/50">{h.name}</span>
                          <span className="text-xs font-bold text-white">{h.val}</span>
                        </div>
                        <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                          <div className={`h-1.5 rounded-full ${h.col}`} style={{ width: `${h.pct}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 border border-blue-100">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-sm font-black text-orange-600">BT</div>
                  <div>
                    <p className="text-xs text-gray-400">Bitcoin</p>
                    <p className="text-sm font-extrabold text-gray-900">$67,234</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+2.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Stats bar ── */}
      <section className="border-y border-white/10 py-12" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-white">{s.value}</p>
              <p className="text-blue-200/60 text-sm mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Markets + Sidebar ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: cards */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Live Markets</p>
                <h2 className="text-3xl font-extrabold text-white">Trending now</h2>
              </div>
              <Link to="/explore" className="flex items-center gap-1 text-sm font-bold text-blue-300 hover:text-white transition-colors">
                See all <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {trending.map((c, i) => <CryptoCard key={c.id} crypto={c} themeIndex={i} />)}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-green-300 uppercase tracking-widest mb-1">🚀 Performance</p>
                <h2 className="text-2xl font-extrabold text-white">Top gainers</h2>
              </div>
              <Link to="/explore" className="flex items-center gap-1 text-sm font-bold text-blue-300 hover:text-white transition-colors">
                See all <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {gainers.map((c, i) => <CryptoCard key={c.id} crypto={c} themeIndex={i + 4} />)}
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-5">
            <FearGreedMeter />
            <MarketDominance />
            <NewsFeed />
            <QuickBuy />
          </div>
        </div>
      </section>

      {/* ── Feature bento ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">Why Coinbase</p>
          <h2 className="text-4xl font-black text-white">Everything you need.<br/>Nothing you don't.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(f => (
            <div key={f.title}
              className={`${f.bg} rounded-3xl p-7 flex flex-col justify-between gap-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 min-h-[220px]`}>
              <div>
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className={`text-xl font-extrabold mb-2 ${f.dark ? "text-white" : "text-gray-900"}`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed ${f.dark ? "text-white/70" : "text-gray-700"}`}>{f.desc}</p>
              </div>
              <Link to={f.to} className={`inline-flex items-center gap-1.5 text-sm font-bold hover:opacity-70 transition-opacity ${f.dark ? "text-white" : "text-gray-900"}`}>
                {f.cta} <ArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Press strip ── */}
      <div className="border-y border-white/10 py-12" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold text-white/25 uppercase tracking-widest mb-8">As seen in</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {trustedBy.map(n => (
              <span key={n} className="text-lg font-black text-white/20 hover:text-white/60 transition-colors tracking-tight">{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Get started today</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Your crypto journey<br />starts with one step.
          </h2>
          <p className="text-white/45 text-lg mb-10">Create your free account in minutes. No experience required.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-700 hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/30">
              Create free account <ArrowRight />
            </Link>
            <Link to="/explore"
              className="flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-sm font-bold text-white hover:border-white/50 transition-all">
              Browse markets
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}