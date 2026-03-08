import { useState } from "react";
import { Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";
import CryptoRow from "../components/crypto/CryptoRow";

const FILTERS = ["All assets", "Gainers", "Losers", "Top volume"];

/* ── icons ── */
const SearchIcon = () => (
  <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);
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
const FireIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2c0 0-5 4-5 9a5 5 0 0010 0c0-5-5-9-5-9zm0 13a2 2 0 110-4 2 2 0 010 4z"/>
  </svg>
);

/* ── crypto accent colors ── */
const cryptoColors = {
  BTC:  "#f97316", ETH:  "#818cf8", SOL:  "#a855f7",
  XRP:  "#38bdf8", BNB:  "#facc15", ADA:  "#2dd4bf",
  DOGE: "#fbbf24", USDT: "#4ade80", DOT:  "#e879f9",
  AVAX: "#ef4444", MATIC:"#8b5cf6", LINK: "#3b82f6",
};
const getColor = (sym) => cryptoColors[sym] || "#60a5fa";

/* ── Vertical crypto card ── */
function CryptoCardVertical({ crypto, bg = "#0a0a1a", index = 0 }) {
  const up    = crypto.change >= 0;
  const color = getColor(crypto.symbol);
  const spark = up ? "M0 20 C8 16,20 12,30 8 S48 2,60 0" : "M0 0 C8 4,20 8,30 12 S48 18,60 20";
  const sc    = up ? "#4ade80" : "#f87171";

  return (
    <Link
      to={`/asset/${crypto.id}`}
      className="group flex flex-col gap-3 p-5 rounded-2xl hover:-translate-y-1.5 hover:shadow-2xl
                 transition-all duration-300 cursor-pointer"
      style={{ backgroundColor: bg, animationDelay: `${index * 50}ms` }}
    >
      {/* top */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white"
          style={{ backgroundColor: color + "30", color }}>
          {crypto.symbol.slice(0, 2)}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5
          ${up ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}`}>
          {up ? <TrendUp /> : <TrendDown />}{up ? "+" : ""}{crypto.change}%
        </span>
      </div>

      {/* name */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{crypto.symbol}</p>
        <p className="text-sm font-bold text-white mt-0.5">{crypto.name}</p>
      </div>

      {/* sparkline */}
      <svg viewBox="0 0 60 22" className="w-full h-8" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`vg-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sc} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={sc} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={`${spark} L60,22 L0,22 Z`} fill={`url(#vg-${crypto.id})`}/>
        <path d={spark} stroke={sc} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* price */}
      <p className="text-xl font-extrabold text-white tracking-tight">
        ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>

      {/* market cap */}
      <p className="text-xs text-white/35 font-medium">
        MCap {crypto.marketCap}
      </p>
    </Link>
  );
}

/* ── Trending horizontal pill ── */
function TrendingPill({ crypto, rank }) {
  const up    = crypto.change >= 0;
  const color = getColor(crypto.symbol);
  return (
    <Link to={`/asset/${crypto.id}`}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-700 hover:border-gray-500
                 transition-all duration-200 cursor-pointer group hover:-translate-y-0.5 hover:shadow-xl"
      style={{ backgroundColor: "#111827" }}>
      <span className="text-xs font-black text-white/25 w-4">{rank}</span>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
        style={{ backgroundColor: color + "25", color }}>
        {crypto.symbol.slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">{crypto.name}</p>
        <p className="text-[10px] text-white/40">{crypto.symbol}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-white">${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p className={`text-[10px] font-bold ${up ? "text-green-400" : "text-red-400"}`}>
          {up ? "+" : ""}{crypto.change}%
        </p>
      </div>
    </Link>
  );
}

/* ── Market overview mini card ── */
function MiniStatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 p-4 flex items-center gap-4"
      style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: accent + "20" }}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/45 font-medium">{label}</p>
        <p className="text-base font-extrabold text-white">{value}</p>
        {sub && <p className="text-[10px] text-white/35 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Explore() {
  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("All assets");
  const [sortBy,       setSortBy]       = useState("rank");
  const [sortDir,      setSortDir]      = useState("asc");

  /* filter + sort */
  const filtered = cryptos
    .filter((c) => {
      const q = search.toLowerCase();
      const match = c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
      if (!match) return false;
      if (activeFilter === "Gainers") return c.change > 0;
      if (activeFilter === "Losers")  return c.change < 0;
      return true;
    })
    .sort((a, b) => {
      let vA = a[sortBy], vB = b[sortBy];
      if (typeof vA === "string") vA = vA.replace(/[$,B]/g, "") * 1;
      if (typeof vB === "string") vB = vB.replace(/[$,B]/g, "") * 1;
      return sortDir === "asc" ? vA - vB : vB - vA;
    });

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const Arrow = ({ col }) => (
    <span className={`ml-1 text-xs ${sortBy === col ? "text-blue-400" : "text-gray-500"}`}>
      {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  /* derived data */
  const gainers   = cryptos.filter(c => c.change > 0);
  const losers    = cryptos.filter(c => c.change < 0);
  const topGainer = [...cryptos].sort((a, b) => b.change - a.change)[0];
  const topLosers = [...cryptos].sort((a, b) => a.change - b.change).slice(0, 3);
  const trending  = cryptos.slice(0, 6);
  const topGainers= [...cryptos].sort((a, b) => b.change - a.change).slice(0, 4);

  /* card bg themes — solid, contrasting */
  const cardBgs = ["#0a0a1a", "#fff", "#111827", "#1e1b4b", "#fff", "#0a0a1a"];

  return (
    <div className="min-h-screen"
      style={{ background: "linear-gradient(145deg,#060d2e 0%,#0d1b6e 22%,#0052FF 50%,#1a3fa8 72%,#060d2e 100%)" }}>

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">Markets</p>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">Explore crypto</h1>
              <p className="text-white/55 mt-2 text-sm">{cryptos.length} assets · Live prices updated</p>
            </div>
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
              <input type="text" placeholder="Search assets..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-white/15
                           focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all
                           placeholder-white/30 text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>

          {/* 4 stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <MiniStatCard icon="📈" label="Gainers today"   value={`${gainers.length} coins`}  sub="Up 24h"         accent="#4ade80" />
            <MiniStatCard icon="📉" label="Losers today"    value={`${losers.length} coins`}   sub="Down 24h"       accent="#f87171" />
            <MiniStatCard icon="🏆" label="Top gainer"      value={topGainer?.symbol || "-"}   sub={`+${topGainer?.change}%`} accent="#fbbf24" />
            <MiniStatCard icon="💰" label="Assets tracked"  value={`${cryptos.length}+`}       sub="Updated live"   accent="#818cf8" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* ── TRENDING + TOP GAINERS (vertical cards side by side) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Trending — vertical cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-400"><FireIcon /></span>
                <h2 className="text-lg font-extrabold text-white">Trending</h2>
              </div>
              <span className="text-xs text-white/40 font-medium">By volume</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trending.map((c, i) => (
                <CryptoCardVertical key={c.id} crypto={c} bg={i % 2 === 0 ? "#0a0a1a" : "#111827"} index={i} />
              ))}
            </div>
          </div>

          {/* Top Gainers — vertical cards + pill list */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🚀</span>
                <h2 className="text-lg font-extrabold text-white">Top Gainers</h2>
              </div>
              <span className="text-xs text-white/40 font-medium">24h change</span>
            </div>
            {/* top 2 as big vertical cards */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {topGainers.slice(0, 2).map((c, i) => (
                <CryptoCardVertical key={c.id} crypto={c} bg={i === 0 ? "#064e3b" : "#1e1b4b"} index={i} />
              ))}
            </div>
            {/* bottom 2 as pills */}
            <div className="space-y-2">
              {topGainers.slice(2, 4).map((c, i) => (
                <TrendingPill key={c.id} crypto={c} rank={i + 3} />
              ))}
            </div>
          </div>
        </div>

        {/* ── TOP LOSERS STRIP ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span>📉</span>
              <h2 className="text-lg font-extrabold text-white">Watch out</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-400/20 text-red-300">Biggest drops</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topLosers.map((c, i) => (
              <Link key={c.id} to={`/asset/${c.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-gray-700
                           hover:border-red-500/50 hover:-translate-y-0.5 hover:shadow-xl
                           transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: "#1a0a0a" }}>
                <span className="text-xs font-black text-white/25 w-4">{i + 1}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                  style={{ backgroundColor: getColor(c.symbol) + "25", color: getColor(c.symbol) }}>
                  {c.symbol.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{c.name}</p>
                  <p className="text-[10px] text-white/40">{c.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">${c.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  <p className="text-[10px] font-bold text-red-400">{c.change}%</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FULL TABLE ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Full list</p>
              <h2 className="text-2xl font-extrabold text-white">All assets</h2>
            </div>

            {/* filter chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150
                    ${activeFilter === f
                      ? "bg-blue-600 text-white"
                      : "border border-white/20 text-white/60 hover:border-white/50 hover:text-white"}`}>
                  {f}
                </button>
              ))}
              <span className="text-xs text-white/40 font-medium">{filtered.length} results</span>
            </div>
          </div>

          {/* table — white bg for readability */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-[40px_1fr_110px_90px_80px_140px] px-6 py-3.5 bg-gray-50 border-b border-gray-100">
              <button onClick={() => handleSort("rank")} className="text-xs font-bold text-gray-400 text-left hover:text-gray-700 flex items-center"># <Arrow col="rank"/></button>
              <div className="text-xs font-bold text-gray-400">Name</div>
              <button onClick={() => handleSort("price")} className="text-xs font-bold text-gray-400 text-right hover:text-gray-700 flex items-center justify-end">Price <Arrow col="price"/></button>
              <div className="text-xs font-bold text-gray-400 text-center">7 Days</div>
              <button onClick={() => handleSort("change")} className="text-xs font-bold text-gray-400 text-right hover:text-gray-700 flex items-center justify-end">24h <Arrow col="change"/></button>
              <div className="text-xs font-bold text-gray-400 text-right">Market Cap</div>
            </div>

            {filtered.length > 0 ? (
              filtered.map((crypto, i) => <CryptoRow key={crypto.id} crypto={crypto} index={i} />)
            ) : (
              <div className="py-20 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-gray-500 font-medium">No assets found for "<span className="text-gray-900">{search}</span>"</p>
                <button onClick={() => setSearch("")} className="mt-3 text-sm text-blue-600 hover:underline">Clear search</button>
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(0,82,255,0.3) 0%,transparent 70%)" }} />
          <div className="relative z-10">
            <span className="text-4xl block mb-4">💼</span>
            <h3 className="text-2xl font-black text-white mb-2">Ready to invest?</h3>
            <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
              Create a free account and start buying crypto in under 2 minutes. No experience required.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/signup"
                className="flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-6 py-3 rounded-full
                           hover:bg-blue-50 active:scale-95 transition-all shadow-xl shadow-black/30">
                Get started free <ArrowRight />
              </Link>
              <Link to="/learn"
                className="flex items-center gap-2 border border-white/25 text-white font-bold text-sm px-6 py-3
                           rounded-full hover:border-white/50 transition-all">
                Learn first
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/25 pb-4">
          Prices are for informational purposes only · Not financial advice
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .animate-fadeIn { animation: fadeIn 0.35s ease both; }
      `}</style>
    </div>
  );
}