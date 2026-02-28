import { useState } from "react";
import { cryptos } from "../data/cryptos";
import CryptoRow from "../components/crypto/CryptoRow";

const FILTERS = ["All assets", "Gainers", "Losers", "Top volume"];

// Search icon
const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
);

// Stats card
const StatCard = ({ label, value, sub, color }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm 
                  px-6 py-5 hover:shadow-md transition-all duration-200">
    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color || "text-gray-900"}`}>{value}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

export default function Explore() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All assets");
  const [sortBy, setSortBy] = useState("rank");
  const [sortDir, setSortDir] = useState("asc");

  // Filter logic
  const filtered = cryptos
    .filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch = c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (activeFilter === "Gainers") return c.change > 0;
      if (activeFilter === "Losers") return c.change < 0;
      return true;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === "string") valA = valA.replace(/[$,B]/g, "") * 1;
      if (typeof valB === "string") valB = valB.replace(/[$,B]/g, "") * 1;
      return sortDir === "asc" ? valA - valB : valB - valA;
    });

  const handleSort = (col) => {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortArrow = ({ col }) => (
    <span className={`ml-1 text-xs ${sortBy === col ? "text-blue-500" : "text-gray-300"}`}>
      {sortBy === col ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  // Quick stats
  const gainers = cryptos.filter((c) => c.change > 0).length;
  const losers = cryptos.filter((c) => c.change < 0).length;
  const topGainer = [...cryptos].sort((a, b) => b.change - a.change)[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Markets</p>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Explore crypto
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                {cryptos.length} assets · Live prices updated
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200
                           bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <StatCard label="Gainers" value={`${gainers} assets`} sub="Up 24h" color="text-green-600" />
            <StatCard label="Losers" value={`${losers} assets`} sub="Down 24h" color="text-red-500" />
            <StatCard
              label="Top Gainer"
              value={`${topGainer?.name || "-"}`}
              sub={topGainer ? `+${topGainer.change}% today` : ""}
              color="text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* ── Table area ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Filter chips */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150
                ${activeFilter === f
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-medium">{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_110px_90px_80px_140px] px-6 py-3.5 bg-gray-50/80 border-b border-gray-100">
            <button onClick={() => handleSort("rank")} className="text-xs font-bold text-gray-400 text-left hover:text-gray-700 flex items-center">
              # <SortArrow col="rank" />
            </button>
            <div className="text-xs font-bold text-gray-400">Name</div>
            <button onClick={() => handleSort("price")} className="text-xs font-bold text-gray-400 text-right hover:text-gray-700 flex items-center justify-end">
              Price <SortArrow col="price" />
            </button>
            <div className="text-xs font-bold text-gray-400 text-center">7 Days</div>
            <button onClick={() => handleSort("change")} className="text-xs font-bold text-gray-400 text-right hover:text-gray-700 flex items-center justify-end">
              24h <SortArrow col="change" />
            </button>
            <div className="text-xs font-bold text-gray-400 text-right">Market Cap</div>
          </div>

          {/* Rows */}
          {filtered.length > 0 ? (
            filtered.map((crypto, i) => (
              <CryptoRow key={crypto.id} crypto={crypto} index={i} />
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-500 font-medium">No assets found for "<span className="text-gray-900">{search}</span>"</p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Prices are for informational purposes only · Not financial advice
        </p>
      </div>

      {/* Fade-in keyframe via style tag */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease both;
        }
      `}</style>
    </div>
  );
}