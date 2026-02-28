import { useParams, Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";

// Back arrow
const BackArrow = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

// Trend icon
const TrendUp = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const TrendDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
  </svg>
);

// Stat card
const StatCard = ({ label, value }) => (
  <div className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100">
    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1.5">{label}</p>
    <p className="text-base font-bold text-gray-900">{value}</p>
  </div>
);

// Big sparkline
const SparkLine = ({ change }) => {
  const isPositive = change >= 0;
  const color = isPositive ? "#16a34a" : "#dc2626";
  const fillColor = isPositive ? "#dcfce7" : "#fee2e2";
  const points = isPositive
    ? "0,80 50,70 100,65 150,45 200,50 250,30 300,35 350,15 400,10"
    : "0,10 50,30 100,25 150,45 200,40 250,60 300,55 350,70 400,80";

  return (
    <svg width="100%" height="100" viewBox="0 0 400 90" preserveAspectRatio="none" className="rounded-xl">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,90 ${points} 400,90`}
        fill="url(#chartGrad)"
      />
      <polyline
        points={points}
        stroke={color}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Crypto colors
const cryptoColors = {
  BTC: { bg: "bg-orange-100", text: "text-orange-600" },
  ETH: { bg: "bg-indigo-100", text: "text-indigo-600" },
  USDT: { bg: "bg-green-100", text: "text-green-600" },
  BNB: { bg: "bg-yellow-100", text: "text-yellow-600" },
  SOL: { bg: "bg-purple-100", text: "text-purple-600" },
  XRP: { bg: "bg-blue-100", text: "text-blue-600" },
  USDC: { bg: "bg-sky-100", text: "text-sky-600" },
  ADA: { bg: "bg-teal-100", text: "text-teal-600" },
  DOGE: { bg: "bg-amber-100", text: "text-amber-600" },
  DOT: { bg: "bg-pink-100", text: "text-pink-600" },
};

export default function AssetDetail() {
  const { id } = useParams();
  const crypto = cryptos.find((c) => c.id === id);
  const isPositive = crypto?.change >= 0;
  const colors = cryptoColors[crypto?.symbol] || { bg: "bg-gray-100", text: "text-gray-600" };

  if (!crypto) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">🤷</p>
        <h2 className="text-2xl font-bold text-gray-900">Asset not found</h2>
        <Link
          to="/explore"
          className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
        >
          <BackArrow /> Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Back link */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            <BackArrow />
          </span>
          Back to Explore
        </Link>

        {/* ── Top section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: price panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

            {/* Identity */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center text-lg font-bold ${colors.text}`}>
                {crypto.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{crypto.name}</h1>
                <span className="text-sm font-bold text-gray-400 tracking-widest">{crypto.symbol}</span>
              </div>
              <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                Rank #{crypto.rank}
              </span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Change badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold mb-6
              ${isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              {isPositive ? <TrendUp /> : <TrendDown />}
              {isPositive ? "+" : ""}{crypto.change}% today
            </div>

            {/* Chart */}
            <div className="mt-2">
              <SparkLine change={crypto.change} />
              <div className="flex justify-between text-xs text-gray-400 mt-1.5 px-1">
                <span>7 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Right: buy panel */}
          <div className="flex flex-col gap-4">

            {/* Buy box */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gray-900">Buy {crypto.symbol}</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 active:scale-95 transition-all">
                Buy {crypto.name}
              </button>
              <button className="w-full py-3 bg-gray-100 text-gray-700 text-sm font-bold rounded-full hover:bg-gray-200 transition-all">
                Sell {crypto.name}
              </button>
              <p className="text-xs text-gray-400 text-center">Demo only · Not financial advice</p>
            </div>

            {/* Watchlist */}
            <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all bg-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Add to Watchlist
            </button>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard label="Market Cap" value={`$${crypto.marketCap}`} />
          <StatCard label="24h Volume" value={crypto.volume ? `$${crypto.volume}` : "—"} />
          <StatCard label="Circulating Supply" value={crypto.circulatingSupply || "—"} />
          <StatCard label="All-time high" value={crypto.ath ? `$${crypto.ath}` : "—"} />
          <StatCard label="All-time low" value={crypto.atl ? `$${crypto.atl}` : "—"} />
          <StatCard label="24h Change" value={`${isPositive ? "+" : ""}${crypto.change}%`} />
        </div>

        {/* ── About section ── */}
        {crypto.description && (
          <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-lg font-extrabold text-gray-900 mb-3">About {crypto.name}</h2>
            <p className="text-gray-500 leading-relaxed text-sm">{crypto.description}</p>
          </div>
        )}

      </div>
    </div>
  );
}