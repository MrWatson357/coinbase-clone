import { useState } from "react";
import { Link } from "react-router-dom";

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
const PlayCircle = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CATEGORIES = ["All", "Basics", "Blockchain", "Investing", "Security", "DeFi"];

const articles = [
  { id: 1, category: "Basics", level: "Beginner", readTime: "3 min", emoji: "₿", title: "What is Bitcoin?", desc: "The original cryptocurrency that started it all. Understand how Bitcoin works, why it was created, and why it matters.", tags: ["BTC", "Basics"], accent: "#F7931A" },
  { id: 2, category: "Basics", level: "Beginner", readTime: "4 min", emoji: "🌐", title: "What is crypto?", desc: "Digital money, decentralized networks, and a new financial system. Learn what makes cryptocurrency fundamentally different.", tags: ["Crypto", "Money"], accent: "#0052FF" },
  { id: 3, category: "Blockchain", level: "Intermediate", readTime: "6 min", emoji: "⛓️", title: "What is a blockchain?", desc: "The revolutionary technology behind every cryptocurrency. Explore how distributed ledgers create trust without a central authority.", tags: ["Blockchain", "Tech"], accent: "#818cf8" },
  { id: 4, category: "Security", level: "Beginner", readTime: "5 min", emoji: "🔐", title: "How to set up a crypto wallet", desc: "Your crypto wallet is your bank account, vault, and identity all in one. Learn how to set one up safely.", tags: ["Wallet", "Security"], accent: "#059669" },
  { id: 5, category: "Basics", level: "Beginner", readTime: "4 min", emoji: "📤", title: "How to send crypto", desc: "Sending crypto is simpler than a bank wire and faster than a check. Learn the step-by-step process and key safety tips.", tags: ["Transfers", "Basics"], accent: "#7c3aed" },
  { id: 6, category: "Investing", level: "Intermediate", readTime: "7 min", emoji: "📊", title: "Crypto basics for investors", desc: "Market caps, volatility, portfolios — what every investor needs to understand before putting money into digital assets.", tags: ["Investing", "Markets"], accent: "#d97706" },
  { id: 7, category: "DeFi", level: "Advanced", readTime: "8 min", emoji: "🏦", title: "What is DeFi?", desc: "Decentralized Finance is rebuilding banking on the blockchain. Discover lending, borrowing, and earning without traditional banks.", tags: ["DeFi", "Advanced"], accent: "#0052FF" },
  { id: 8, category: "Investing", level: "Intermediate", readTime: "5 min", emoji: "📈", title: "Tips & tutorials", desc: "Practical strategies, common mistakes to avoid, and pro tips from experienced crypto investors to help you navigate the market.", tags: ["Tips", "Strategy"], accent: "#f97316" },
  { id: 9, category: "Blockchain", level: "Advanced", readTime: "9 min", emoji: "🔮", title: "Crypto glossary", desc: "HODL, gas fees, staking, yield farming — learn every term you'll encounter in the crypto ecosystem.", tags: ["Reference", "All levels"], accent: "#9333ea" },
];

const levelConfig = {
  Beginner:     { color: "#059669", bg: "#d1fae5" },
  Intermediate: { color: "#d97706", bg: "#fef3c7" },
  Advanced:     { color: "#dc2626", bg: "#fee2e2" },
};

/* ── Featured card ── */
function FeaturedCard({ article }) {
  const lvl = levelConfig[article.level];
  return (
    <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[300px] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white"
      style={{ border: "1px solid #e5e7eb" }}>
      {/* top color bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ backgroundColor: article.accent }} />
      {/* big bg emoji */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[130px] opacity-[0.06] select-none pointer-events-none leading-none">
        {article.emoji}
      </div>
      {/* subtle tinted bg */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${article.accent}08 0%, transparent 60%)` }} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: article.accent + "15", color: article.accent }}>⭐ Featured</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5"
            style={{ backgroundColor: lvl.bg, color: lvl.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lvl.color }} />{article.level}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3">{article.title}</h2>
        <p className="text-sm leading-relaxed text-gray-500 max-w-lg">{article.desc}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-8">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400"><Clock />{article.readTime} read</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400"><BookOpen />{article.category}</span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white hover:scale-105 active:scale-95 transition-all"
          style={{ backgroundColor: article.accent }}>
          Read now <ArrowRight />
        </button>
      </div>
    </div>
  );
}

/* ── Article card ── */
function ArticleCard({ article, index }) {
  const lvl = levelConfig[article.level];
  return (
    <div className="group relative rounded-2xl overflow-hidden flex flex-col justify-between p-6 min-h-[220px] bg-white hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{ border: "1px solid #e5e7eb", animationDelay: `${index * 60}ms` }}>
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: article.accent }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl leading-none">{article.emoji}</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{ backgroundColor: lvl.bg, color: lvl.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lvl.color }} />{article.level}
          </span>
        </div>
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-3"
          style={{ backgroundColor: article.accent + "12", color: article.accent }}>
          {article.category}
        </span>
        <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-2">{article.title}</h3>
        <p className="text-xs leading-relaxed line-clamp-2 text-gray-500">{article.desc}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400"><Clock />{article.readTime} read</span>
        <span className="flex items-center gap-1 text-[11px] font-bold group-hover:gap-2 transition-all"
          style={{ color: article.accent }}>Read <ArrowRight /></span>
      </div>
    </div>
  );
}

const facts = [
  { icon: "🌍", stat: "420M+", label: "Crypto users worldwide" },
  { icon: "⚡", stat: "10 min", label: "Avg Bitcoin block time" },
  { icon: "🏦", stat: "$3T+", label: "Total crypto market cap" },
  { icon: "🔗", stat: "21K+", label: "Cryptocurrencies in existence" },
];

const paths = [
  { title: "Crypto 101", steps: ["What is crypto?", "What is Bitcoin?", "How to buy"], accent: "#F7931A", icon: "🚀", duration: "15 min", level: "Beginner" },
  { title: "Blockchain Deep Dive", steps: ["What is a blockchain?", "What is DeFi?", "Crypto glossary"], accent: "#7c3aed", icon: "⛓️", duration: "23 min", level: "Advanced" },
  { title: "Investor Starter Pack", steps: ["Crypto basics", "Tips & tutorials", "How to send crypto"], accent: "#059669", icon: "📈", duration: "16 min", level: "Intermediate" },
];

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory);
  const featured = articles[0];
  const rest = filtered.filter(a => a.id !== featured.id);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>

      {/* ── HERO ── */}
      <div className="border-b border-gray-100" style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold text-gray-600"
                style={{ backgroundColor: "rgba(0,82,255,0.08)", border: "1px solid rgba(0,82,255,0.15)" }}>
                <BookOpen />
                <span className="uppercase tracking-widest">Learn Center</span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-4">
                Learn crypto.<br />
                <span style={{ color: "#0052FF" }}>Earn rewards.</span>
              </h1>
              <p className="text-lg leading-relaxed text-gray-500">
                From zero to crypto-fluent. Free guides, tutorials, and deep dives written for real people — not just developers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-72">
              {[
                { v: `${articles.length}`, l: "Free articles" },
                { v: "3", l: "Learning paths" },
                { v: "5 min", l: "Avg read time" },
                { v: "100%", l: "Free forever" },
              ].map(s => (
                <div key={s.l} className="rounded-2xl px-4 py-4 text-center bg-white" style={{ border: "1px solid #e5e7eb" }}>
                  <p className="text-xl font-black text-gray-900">{s.v}</p>
                  <p className="text-xs mt-0.5 font-medium text-gray-400">{s.l}</p>
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
            <div key={f.label} className="rounded-2xl px-5 py-5 text-center bg-white" style={{ border: "1px solid #e5e7eb" }}>
              <span className="text-2xl block mb-2">{f.icon}</span>
              <p className="text-xl font-black text-gray-900">{f.stat}</p>
              <p className="text-xs mt-0.5 font-medium text-gray-400 leading-snug">{f.label}</p>
            </div>
          ))}
        </div>

        {/* ── FEATURED ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-amber-400 text-xl">★</span>
            <h2 className="text-2xl font-extrabold text-gray-900">Start here</h2>
          </div>
          <FeaturedCard article={featured} />
        </div>

        {/* ── LEARNING PATHS ── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "#d97706" }}>Curated</p>
              <h2 className="text-2xl font-extrabold text-gray-900">Learning paths</h2>
            </div>
            <span className="text-xs font-medium text-gray-400">Follow a guided track</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paths.map(p => (
              <div key={p.title}
                className="rounded-2xl p-6 flex flex-col gap-4 bg-white hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group"
                style={{ border: "1px solid #e5e7eb" }}>
                {/* top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: p.accent }} />

                <div className="flex items-start gap-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: p.accent + "15", border: `1px solid ${p.accent}25` }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-extrabold text-base text-gray-900 leading-tight">{p.title}</p>
                    <p className="text-xs mt-0.5 font-medium text-gray-400">{p.duration} · {p.level}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="space-y-2.5">
                  {p.steps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 text-white"
                        style={{ backgroundColor: p.accent }}>{i + 1}</div>
                      <span className="text-xs font-semibold text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: p.accent + "12", color: p.accent, border: `1px solid ${p.accent}25` }}>
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
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "#0052FF" }}>Library</p>
              <h2 className="text-2xl font-extrabold text-gray-900">All articles</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                  style={activeCategory === c
                    ? { backgroundColor: "#0052FF", color: "white" }
                    : { border: "1.5px solid #e5e7eb", color: "#6b7280", backgroundColor: "white" }}>
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
                <p className="font-medium text-gray-400">No articles in this category yet</p>
              </div>
            )}
          </div>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)", border: "1px solid #e0e7ff" }}>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,82,255,0.08) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <span className="text-4xl block mb-4">📬</span>
            <h3 className="text-3xl font-black text-gray-900 mb-3">Stay in the know</h3>
            <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
              Get the latest crypto news, tutorials, and market updates delivered to your inbox — no spam, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none"
                style={{ border: "1.5px solid #d1d5db" }} />
              <button className="px-6 py-3 font-bold text-sm rounded-full text-white whitespace-nowrap hover:opacity-90 active:scale-95 transition-all"
                style={{ backgroundColor: "#0052FF" }}>
                Subscribe free
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">Join 2M+ subscribers · Unsubscribe any time</p>
          </div>
        </div>

        {/* ── READY CTA ── */}
        <div className="text-center pb-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: "#0052FF" }}>Ready to apply what you know?</p>
          <h3 className="text-3xl font-black text-gray-900 mb-6">Put your knowledge to work</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/explore"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#0052FF", boxShadow: "0 8px 24px rgba(0,82,255,0.25)" }}>
              Browse markets <ArrowRight />
            </Link>
            <Link to="/signup"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-gray-700 transition-all bg-white"
              style={{ border: "1.5px solid #d1d5db" }}>
              Create free account
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        input:focus { box-shadow: 0 0 0 2px rgba(0,82,255,0.2); outline: none; }
      `}</style>
    </div>
  );
}
