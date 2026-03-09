import { useState } from "react";
import { Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";
import CryptoRow from "../components/crypto/CryptoRow";

const FILTERS = ["All assets", "Gainers", "Losers", "Top volume"];

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

const cryptoAccent = {
  BTC: "#F7931A", ETH: "#627EEA", SOL: "#9945FF",
  XRP: "#00AAE4", BNB: "#F3BA2F", ADA: "#627EEA",
  DOGE: "#C2A633", USDT: "#26A17B", DOT: "#E6007A",
  AVAX: "#E84142", MATIC: "#8247E5", LINK: "#2A5ADA",
};
const getColor = (sym) => cryptoAccent[sym] || "#0052FF";

/* ── Vertical card ── */
function CryptoCardVertical({ crypto, index = 0 }) {
  const up = crypto.change >= 0;
  const color = getColor(crypto.symbol);
  const spark = up ? "M0 20 C8 16,20 12,30 8 S48 2,60 0" : "M0 0 C8 4,20 8,30 12 S48 18,60 20";
  const sc = up ? "#059669" : "#dc2626";

  return (
    <Link to={`/asset/${crypto.id}`}
      className="group flex flex-col gap-3 p-5 rounded-2xl bg-white hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
      style={{ border: "1px solid #e5e7eb", animationDelay: `${index * 50}ms` }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}0d 0%, transparent 65%)` }} />
      <div className="flex items-center justify-between relative z-10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black"
          style={{ backgroundColor: color + "15", border: `1px solid ${color}25`, color }}>
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
          <linearGradient id={`vg-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sc} stopOpacity="0.18" />
            <stop offset="100%" stopColor={sc} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${spark} L60,22 L0,22 Z`} fill={`url(#vg-${crypto.id})`} />
        <path d={spark} stroke={sc} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-xl font-extrabold text-gray-900 tracking-tight relative z-10">
        ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
      <p className="text-xs font-medium text-gray-400 relative z-10">MCap {crypto.marketCap}</p>
    </Link>
  );
}

/* ── Trending pill ── */
function TrendingPill({ crypto, rank }) {
  const up = crypto.change >= 0;
  const color = getColor(crypto.symbol);
  return (
    <Link to={`/asset/${crypto.id}`}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
      style={{ border: "1px solid #e5e7eb" }}>
      <span className="text-xs font-black text-gray-300 w-4">{rank}</span>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
        style={{ backgroundColor: color + "15", color }}>
        {crypto.symbol.slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-900 truncate">{crypto.name}</p>
        <p className="text-[10px] text-gray-400">{crypto.symbol}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-gray-900">${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p className={`text-[10px] font-bold ${up ? "text-emerald-600" : "text-red-500"}`}>
          {up ? "+" : ""}{crypto.change}%
        </p>
      </div>
    </Link>
  );
}

/* ── Stat card ── */
function MiniStatCard({ icon, label, value, sub, accent }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-4 bg-white" style={{ border: "1px solid #e5e7eb" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ backgroundColor: accent + "15" }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400">{label}</p>
        <p className="text-base font-extrabold text-gray-900">{value}</p>
        {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All assets");
  const [sortBy, setSortBy] = useState("rank");
  const [sortDir, setSortDir] = useState("asc");

  const filtered = cryptos
    .filter((c) => {
      const q = search.toLowerCase();
      const match = c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
      if (!match) return false;
      if (activeFilter === "Gainers") return c.change > 0;
      if (activeFilter === "Losers") return c.change < 0;
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
    <span className={`ml-1 text-xs ${sortBy === col ? "text-blue-600" : "text-gray-300"}`}>
      {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  const gainers = cryptos.filter(c => c.change > 0);
  const losers = cryptos.filter(c => c.change < 0);
  const topGainer = [...cryptos].sort((a, b) => b.change - a.change)[0];
  const topLosers = [...cryptos].sort((a, b) => a.change - b.change).slice(0, 3);
  const trending = cryptos.slice(0, 6);
  const topGainers = [...cryptos].sort((a, b) => b.change - a.change).slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: "#ffffff" }}>

      {/* ── PAGE HEADER ── */}
      <div className="border-b border-gray-100" style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: "#0052FF" }}>Markets</p>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Explore crypto</h1>
              <p className="text-sm mt-2 text-gray-400">{cryptos.length} assets · Live prices updated</p>
            </div>
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
              <input type="text" placeholder="Search assets..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-white focus:outline-none transition-all placeholder-gray-400 text-gray-900"
                style={{ border: "1.5px solid #d1d5db" }} />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <MiniStatCard icon="📈" label="Gainers today" value={`${gainers.length} coins`} sub="Up 24h" accent="#059669" />
            <MiniStatCard icon="📉" label="Losers today" value={`${losers.length} coins`} sub="Down 24h" accent="#dc2626" />
            <MiniStatCard icon="🏆" label="Top gainer" value={topGainer?.symbol || "-"} sub={`+${topGainer?.change}%`} accent="#d97706" />
            <MiniStatCard icon="💰" label="Assets tracked" value={`${cryptos.length}+`} sub="Updated live" accent="#0052FF" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* ── TRENDING + TOP GAINERS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg">🔥</span>
                <h2 className="text-lg font-extrabold text-gray-900">Trending</h2>
              </div>
              <span className="text-xs font-medium text-gray-400">By volume</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trending.map((c, i) => <CryptoCardVertical key={c.id} crypto={c} index={i} />)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <h2 className="text-lg font-extrabold text-gray-900">Top Gainers</h2>
              </div>
              <span className="text-xs font-medium text-gray-400">24h change</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {topGainers.slice(0, 2).map((c, i) => <CryptoCardVertical key={c.id} crypto={c} index={i} />)}
            </div>
            <div className="space-y-2">
              {topGainers.slice(2, 4).map((c, i) => <TrendingPill key={c.id} crypto={c} rank={i + 3} />)}
            </div>
          </div>
        </div>

        {/* ── TOP LOSERS ── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg">📉</span>
            <h2 className="text-lg font-extrabold text-gray-900">Watch out</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-red-600 bg-red-50">Biggest drops</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topLosers.map((c, i) => (
              <Link key={c.id} to={`/asset/${c.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
                style={{ border: "1px solid #fecaca", backgroundColor: "#fff5f5" }}>
                <span className="text-xs font-black text-gray-300 w-4">{i + 1}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0"
                  style={{ backgroundColor: getColor(c.symbol) + "15", color: getColor(c.symbol) }}>
                  {c.symbol.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900">${c.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                  <p className="text-[10px] font-bold text-red-500">{c.change}%</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FULL TABLE ── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "#0052FF" }}>Full list</p>
              <h2 className="text-2xl font-extrabold text-gray-900">All assets</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150"
                  style={activeFilter === f
                    ? { backgroundColor: "#0052FF", color: "white" }
                    : { border: "1.5px solid #e5e7eb", color: "#6b7280", backgroundColor: "white" }}>
                  {f}
                </button>
              ))}
              <span className="text-xs font-medium text-gray-400">{filtered.length} results</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
            <div className="grid grid-cols-[40px_1fr_110px_90px_80px_140px] px-6 py-3.5 bg-gray-50 border-b border-gray-100">
              <button onClick={() => handleSort("rank")} className="text-xs font-bold text-gray-400 text-left flex items-center hover:text-gray-700"># <Arrow col="rank" /></button>
              <div className="text-xs font-bold text-gray-400">Name</div>
              <button onClick={() => handleSort("price")} className="text-xs font-bold text-gray-400 text-right flex items-center justify-end hover:text-gray-700">Price <Arrow col="price" /></button>
              <div className="text-xs font-bold text-gray-400 text-center">7 Days</div>
              <button onClick={() => handleSort("change")} className="text-xs font-bold text-gray-400 text-right flex items-center justify-end hover:text-gray-700">24h <Arrow col="change" /></button>
              <div className="text-xs font-bold text-gray-400 text-right">Market Cap</div>
            </div>
            {filtered.length > 0 ? (
              filtered.map((crypto, i) => <CryptoRow key={crypto.id} crypto={crypto} index={i} />)
            ) : (
              <div className="py-20 text-center bg-white">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-gray-500 font-medium">No assets found for "<span className="text-gray-900">{search}</span>"</p>
                <button onClick={() => setSearch("")} className="mt-3 text-sm text-blue-600 hover:underline">Clear search</button>
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)", border: "1px solid #c7d7fe" }}>
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,82,255,0.1) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <span className="text-4xl block mb-4">💼</span>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Ready to invest?</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Create a free account and start buying crypto in under 2 minutes. No experience required.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link to="/signup"
                className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full text-white transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#0052FF", boxShadow: "0 8px 24px rgba(0,82,255,0.25)" }}>
                Get started free <ArrowRight />
              </Link>
              <Link to="/learn"
                className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full text-gray-700 transition-all bg-white"
                style={{ border: "1.5px solid #d1d5db" }}>
                Learn first
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 pb-4">
          Prices are for informational purposes only · Not financial advice
        </p>
      </div>

      <style>{`
        input:focus { box-shadow: 0 0 0 2px rgba(0,82,255,0.2); outline: none; }
      `}</style>
    </div>
  );
}
