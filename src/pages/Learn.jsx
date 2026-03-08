import { useState } from "react";
import { Link } from "react-router-dom";

/* ── icons ─────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const Clock = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
  </svg>
);
const BookOpen = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const Star = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
const PlayCircle = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const CheckCircle = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const Zap = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

/* ── DATA ──────────────────────────────────────────────────────── */
const CATEGORIES = ["All", "Basics", "Blockchain", "Investing", "Security", "DeFi"];

const articles = [
  {
    id: 1, category: "Basics", level: "Beginner", readTime: "3 min",
    emoji: "₿", title: "What is Bitcoin?",
    desc: "The original cryptocurrency that started it all. Understand how Bitcoin works, why it was created, and why it matters in today's financial world.",
    tags: ["BTC", "Basics"],
    card: { bg: "#FF6B35", text: "#fff", accent: "#FFD93D" },
  },
  {
    id: 2, category: "Basics", level: "Beginner", readTime: "4 min",
    emoji: "🌐", title: "What is crypto?",
    desc: "Digital money, decentralized networks, and a new financial system. Learn what makes cryptocurrency fundamentally different from traditional money.",
    tags: ["Crypto", "Money"],
    card: { bg: "#fff", text: "#0a0e27", accent: "#0052FF" },
  },
  {
    id: 3, category: "Blockchain", level: "Intermediate", readTime: "6 min",
    emoji: "⛓️", title: "What is a blockchain?",
    desc: "The revolutionary technology behind every cryptocurrency. Explore how distributed ledgers create trust without a central authority.",
    tags: ["Blockchain", "Tech"],
    card: { bg: "#0a0e27", text: "#fff", accent: "#818cf8" },
  },
  {
    id: 4, category: "Security", level: "Beginner", readTime: "5 min",
    emoji: "🔐", title: "How to set up a crypto wallet",
    desc: "Your crypto wallet is your bank account, vault, and identity all in one. Learn how to set one up safely and protect your assets.",
    tags: ["Wallet", "Security"],
    card: { bg: "#10b981", text: "#fff", accent: "#d1fae5" },
  },
  {
    id: 5, category: "Basics", level: "Beginner", readTime: "4 min",
    emoji: "📤", title: "How to send crypto",
    desc: "Sending crypto is simpler than a bank wire and faster than a check. Learn the step-by-step process and key safety tips.",
    tags: ["Transfers", "Basics"],
    card: { bg: "#7c3aed", text: "#fff", accent: "#ddd6fe" },
  },
  {
    id: 6, category: "Investing", level: "Intermediate", readTime: "7 min",
    emoji: "📊", title: "Crypto basics for investors",
    desc: "Market caps, volatility, portfolios — what every investor needs to understand before putting money into digital assets.",
    tags: ["Investing", "Markets"],
    card: { bg: "#fff", text: "#0a0e27", accent: "#f59e0b" },
  },
  {
    id: 7, category: "DeFi", level: "Advanced", readTime: "8 min",
    emoji: "🏦", title: "What is DeFi?",
    desc: "Decentralized Finance is rebuilding banking on the blockchain. Discover lending, borrowing, and earning without traditional banks.",
    tags: ["DeFi", "Advanced"],
    card: { bg: "#0052FF", text: "#fff", accent: "#93c5fd" },
  },
  {
    id: 8, category: "Investing", level: "Intermediate", readTime: "5 min",
    emoji: "📈", title: "Tips & tutorials",
    desc: "Practical strategies, common mistakes to avoid, and pro tips from experienced crypto investors to help you navigate the market.",
    tags: ["Tips", "Strategy"],
    card: { bg: "#f59e0b", text: "#0a0e27", accent: "#fff" },
  },
  {
    id: 9, category: "Blockchain", level: "Advanced", readTime: "9 min",
    emoji: "🔮", title: "Crypto glossary",
    desc: "HODL, gas fees, staking, yield farming — learn every term you'll encounter in the crypto ecosystem with clear, plain-English definitions.",
    tags: ["Reference", "All levels"],
    card: { bg: "#0a0e27", text: "#fff", accent: "#f97316" },
  },
];

const levelColors = {
  Beginner:     { pill: "bg-green-400/20 text-green-300",     dot: "bg-green-400" },
  Intermediate: { pill: "bg-amber-400/20 text-amber-300",     dot: "bg-amber-400" },
  Advanced:     { pill: "bg-red-400/20 text-red-300",         dot: "bg-red-400"   },
};

/* ── Featured article ──────────────────────────────────────────── */
function FeaturedCard({ article }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[280px]
                 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      style={{ backgroundColor: article.card.bg }}
    >
      {/* big background emoji */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] opacity-15 select-none pointer-events-none leading-none">
        {article.emoji}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: article.card.accent + "30", color: article.card.accent }}>
            ⭐ Featured
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${levelColors[article.level].pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${levelColors[article.level].dot}`} />
            {article.level}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-3"
          style={{ color: article.card.text }}>
          {article.title}
        </h2>
        <p className="text-sm leading-relaxed max-w-lg"
          style={{ color: article.card.text + "bb" }}>
          {article.desc}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-8">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: article.card.text + "80" }}>
            <Clock />{article.readTime} read
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold"
            style={{ color: article.card.text + "80" }}>
            <BookOpen />{article.category}
          </span>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
                     hover:scale-105 active:scale-95 transition-all duration-150"
          style={{ backgroundColor: article.card.accent, color: article.card.bg }}
        >
          Read now <ArrowRight />
        </button>
      </div>
    </div>
  );
}

/* ── Article card ──────────────────────────────────────────────── */
function ArticleCard({ article, index }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col justify-between
                 p-6 min-h-[220px] hover:-translate-y-1.5 hover:shadow-2xl
                 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: article.card.bg,
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* decorative circle */}
      <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: article.card.accent }} />

      {/* top row */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl leading-none">{article.emoji}</span>
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 ${levelColors[article.level].pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${levelColors[article.level].dot}`} />
            {article.level}
          </span>
        </div>

        {/* category chip */}
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2"
          style={{ backgroundColor: article.card.accent + "25", color: article.card.accent === "#fff" ? article.card.text : article.card.accent }}>
          {article.category}
        </span>

        <h3 className="text-lg font-extrabold leading-tight mb-2"
          style={{ color: article.card.text }}>
          {article.title}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2"
          style={{ color: article.card.text + "90" }}>
          {article.desc}
        </p>
      </div>

      {/* bottom row */}
      <div className="relative z-10 flex items-center justify-between mt-4 pt-3"
        style={{ borderTop: `1px solid ${article.card.text}15` }}>
        <span className="flex items-center gap-1 text-[11px] font-semibold"
          style={{ color: article.card.text + "60" }}>
          <Clock />{article.readTime} read
        </span>
        <span className="flex items-center gap-1 text-[11px] font-bold group-hover:gap-2 transition-all"
          style={{ color: article.card.accent === "#fff" ? article.card.text : article.card.accent }}>
          Read <ArrowRight />
        </span>
      </div>
    </div>
  );
}

/* ── Quick facts strip ─────────────────────────────────────────── */
const facts = [
  { icon: "🌍", stat: "420M+",  label: "Crypto users worldwide"     },
  { icon: "⚡", stat: "10 min", label: "Avg Bitcoin block time"      },
  { icon: "🏦", stat: "$3T+",   label: "Total crypto market cap"     },
  { icon: "🔗", stat: "21K+",   label: "Cryptocurrencies in existence"},
];

/* ── Learning path cards ───────────────────────────────────────── */
const paths = [
  {
    title: "Crypto 101", steps: ["What is crypto?", "What is Bitcoin?", "How to buy"],
    color: "#FF6B35", cardBg: "#fff", titleC: "#0a0e27", subC: "#6b7280", stepC: "#374151",
    btnBg: "#FF6B35", btnText: "#fff",
    icon: "🚀", duration: "15 min", level: "Beginner",
  },
  {
    title: "Blockchain Deep Dive", steps: ["What is a blockchain?", "What is DeFi?", "Crypto glossary"],
    color: "#7c3aed", cardBg: "#1e1b4b", titleC: "#fff", subC: "rgba(255,255,255,0.5)", stepC: "rgba(255,255,255,0.75)",
    btnBg: "#7c3aed", btnText: "#fff",
    icon: "⛓️", duration: "23 min", level: "Advanced",
  },
  {
    title: "Investor Starter Pack", steps: ["Crypto basics", "Tips & tutorials", "How to send crypto"],
    color: "#10b981", cardBg: "#f0fdf4", titleC: "#064e3b", subC: "#6b7280", stepC: "#374151",
    btnBg: "#10b981", btnText: "#fff",
    icon: "📈", duration: "16 min", level: "Intermediate",
  },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featured = articles[0];
  const rest = filtered.filter(a => a.id !== featured.id);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(145deg,#060d2e 0%,#0d1b6e 22%,#0052FF 50%,#1a3fa8 72%,#060d2e 100%)" }}
    >

      {/* ── HERO HEADER ── */}
      <div className="border-b border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-5"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                <BookOpen />
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Learn Center</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
                Learn crypto.<br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg,#fbbf24,#f97316,#ef4444)" }}>
                  Earn rewards.
                </span>
              </h1>
              <p className="text-white/55 text-lg leading-relaxed">
                From zero to crypto-fluent. Free guides, tutorials, and deep dives written for real people — not just developers.
              </p>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 gap-3 lg:w-72">
              {[
                { v: `${articles.length}`, l: "Free articles" },
                { v: "3",   l: "Learning paths" },
                { v: "5 min", l: "Avg read time" },
                { v: "100%", l: "Free forever" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl border border-white/10 px-4 py-3 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                  <p className="text-xl font-black text-white">{s.v}</p>
                  <p className="text-xs text-white/45 mt-0.5 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── QUICK FACTS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {facts.map(f => (
            <div key={f.label} className="rounded-2xl border border-white/10 px-5 py-4 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-2xl block mb-2">{f.icon}</span>
              <p className="text-xl font-black text-white">{f.stat}</p>
              <p className="text-xs text-white/45 mt-0.5 font-medium leading-snug">{f.label}</p>
            </div>
          ))}
        </div>

        {/* ── FEATURED ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Star /><Star /><Star />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Start here</h2>
          </div>
          <FeaturedCard article={featured} />
        </div>

        {/* ── LEARNING PATHS ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">Curated</p>
              <h2 className="text-2xl font-extrabold text-white">Learning paths</h2>
            </div>
            <span className="text-xs text-white/40 font-medium">Follow a guided track</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paths.map(p => (
              <div key={p.title}
                className="rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-2xl
                           transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: p.cardBg }}>

                {/* icon + title */}
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: p.color + "20" }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-base leading-tight" style={{ color: p.titleC }}>{p.title}</p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: p.subC }}>{p.duration} · {p.level}</p>
                  </div>
                </div>

                {/* divider */}
                <div className="h-px" style={{ backgroundColor: p.color + "20" }} />

                {/* steps */}
                <div className="space-y-2.5">
                  {p.steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                        style={{ backgroundColor: p.color, color: "#fff" }}>
                        {i + 1}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: p.stepC }}>{s}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold
                                   hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: p.btnBg, color: p.btnText }}>
                  <PlayCircle /> Start path
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── ALL ARTICLES ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Library</p>
              <h2 className="text-2xl font-extrabold text-white">All articles</h2>
            </div>

            {/* category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150
                    ${activeCategory === c
                      ? "bg-blue-600 text-white"
                      : "border border-white/20 text-white/55 hover:border-white/40 hover:text-white"
                    }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            {rest.length === 0 && (
              <div className="col-span-3 py-16 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-white/50 font-medium">No articles in this category yet</p>
              </div>
            )}
          </div>
        </div>

        {/* ── NEWSLETTER / CTA ── */}
        <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          {/* deco */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(251,191,36,0.2) 0%,transparent 70%)" }} />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(0,82,255,0.3) 0%,transparent 70%)" }} />

          <div className="relative z-10">
            <span className="text-4xl block mb-4">📬</span>
            <h3 className="text-3xl font-black text-white mb-3">Stay in the know</h3>
            <p className="text-white/55 text-base mb-8 max-w-md mx-auto">
              Get the latest crypto news, tutorials, and market updates delivered straight to your inbox — no spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full text-sm text-white placeholder-white/30
                           border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-bold text-sm rounded-full
                                 hover:bg-blue-50 active:scale-95 transition-all whitespace-nowrap">
                Subscribe free
              </button>
            </div>
            <p className="text-white/25 text-xs mt-4">Join 2M+ subscribers · Unsubscribe any time</p>
          </div>
        </div>

        {/* ── READY CTA ── */}
        <div className="text-center pb-8">
          <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">Ready to apply what you know?</p>
          <h3 className="text-3xl font-black text-white mb-6">Put your knowledge to work</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/explore"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold
                         text-blue-700 hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/30">
              Browse markets <ArrowRight />
            </Link>
            <Link to="/signup"
              className="flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-4
                         text-sm font-bold text-white hover:border-white/50 transition-all">
              Create free account
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.4s ease both; }
      `}</style>
    </div>
  );
}