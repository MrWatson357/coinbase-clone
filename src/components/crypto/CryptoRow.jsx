import { Link } from "react-router-dom";

// Sparkline-style mini chart (purely decorative, based on change direction)
const MiniChart = ({ change }) => {
  const isPositive = change >= 0;
  const color = isPositive ? "#16a34a" : "#dc2626";
  const points = isPositive
    ? "0,18 8,14 16,16 24,10 32,12 40,6 48,8 56,4 64,2"
    : "0,2 8,6 16,4 24,10 32,8 40,14 48,12 56,16 64,18";

  return (
    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" className="opacity-80">
      <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Crypto icon with colored background derived from symbol
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

export default function CryptoRow({ crypto, index }) {
  const colors = cryptoColors[crypto.symbol] || { bg: "bg-gray-100", text: "text-gray-600" };
  const isPositive = crypto.change >= 0;

  return (
    <Link
      to={`/asset/${crypto.id}`}
      style={{ animationDelay: `${index * 40}ms` }}
      className="grid grid-cols-[40px_1fr_110px_90px_80px_140px] items-center px-6 py-4
                 border-t border-gray-100 hover:bg-blue-50/40 hover:shadow-sm transition-all duration-200
                 group cursor-pointer animate-fadeIn"
    >
      {/* Rank */}
      <div className="text-sm text-gray-400 font-medium">{crypto.rank}</div>

      {/* Name + Logo */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center text-sm font-bold ${colors.text} flex-shrink-0`}>
          {crypto.symbol.slice(0, 2)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors leading-tight">
            {crypto.name}
          </p>
          <p className="text-xs text-gray-400 font-medium tracking-wide">{crypto.symbol}</p>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <span className="font-semibold text-gray-900 text-sm">
          ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Mini chart */}
      <div className="flex justify-center">
        <MiniChart change={crypto.change} />
      </div>

      {/* 24h Change */}
      <div className={`text-right text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-500"}`}>
        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold
          ${isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {isPositive ? "▲" : "▼"} {Math.abs(crypto.change)}%
        </span>
      </div>

      {/* Market Cap */}
      <div className="text-right text-sm text-gray-500 font-medium">
        ${crypto.marketCap}
      </div>
    </Link>
  );
}