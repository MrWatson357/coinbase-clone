import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";

const SearchIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
);

const cryptoAccent = {
  BTC:"#F7931A", ETH:"#627EEA", SOL:"#9945FF", XRP:"#00AAE4",
  BNB:"#F3BA2F", ADA:"#627EEA", DOGE:"#C2A633", USDT:"#26A17B",
  DOT:"#E6007A", AVAX:"#E84142", MATIC:"#8247E5", LINK:"#2A5ADA",
};
const getAccent = (sym) => cryptoAccent[sym] || "#0052FF";

/* ── Mini sparkline ── */
function Spark({ up, id }) {
  const sc = up ? "#059669" : "#dc2626";
  const path = up
    ? "M0 18 C8 15,16 12,24 9 S40 4,50 2 S58 0,64 0"
    : "M0 0 C8 3,16 6,24 9 S40 14,50 16 S58 18,64 18";
  return (
    <svg viewBox="0 0 64 20" width="80" height="32" fill="none" style={{ display:"block" }}>
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sc} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={sc} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${path} L64,20 L0,20 Z`} fill={`url(#sg-${id})`}/>
      <path d={path} stroke={sc} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Market stat card ── */
function StatCard({ label, value, change, up, id }) {
  const color = up ? "#059669" : "#dc2626";
  return (
    <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:"16px", padding:"20px", flex:1, minWidth:"180px" }}>
      <p style={{ fontSize:"12px", color:"#9ca3af", margin:"0 0 8px", fontWeight:500 }}>{label}</p>
      <p style={{ fontSize:"18px", fontWeight:800, color:"#111827", margin:"0 0 2px" }}>{value}</p>
      <p style={{ fontSize:"12px", fontWeight:700, color, margin:"0 0 12px" }}>↗ {change}</p>
      <Spark up={up} id={id}/>
    </div>
  );
}

/* ── Coin row ── */
function CoinRow({ coin, index }) {
  const up = coin.change >= 0;
  const accent = getAccent(coin.symbol);
  const spark = up ? "M0 16 C10 12,22 8,32 5 S50 1,64 0" : "M0 0 C10 4,22 8,32 11 S50 15,64 16";
  const sc = up ? "#059669" : "#dc2626";

  return (
    <div style={{ display:"grid", gridTemplateColumns:"32px 2fr 1.2fr 100px 90px 1fr 1fr 100px", alignItems:"center", padding:"14px 20px", borderBottom:"1px solid #f3f4f6", transition:"background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background="#fafafa"}
      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
      {/* Rank */}
      <span style={{ fontSize:"13px", color:"#9ca3af", fontWeight:500 }}>{index + 1}</span>
      {/* Asset */}
      <Link to={`/asset/${coin.id}`} style={{ display:"flex", alignItems:"center", gap:"12px", textDecoration:"none" }}>
        <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:900, color:"white", flexShrink:0 }}>
          {coin.symbol.slice(0,2)}
        </div>
        <div>
          <p style={{ fontSize:"14px", fontWeight:700, color:"#111827", margin:0 }}>{coin.name}</p>
          <p style={{ fontSize:"12px", color:"#9ca3af", margin:0 }}>{coin.symbol}</p>
        </div>
      </Link>
      {/* Price */}
      <p style={{ fontSize:"14px", fontWeight:600, color:"#111827", margin:0, textAlign:"right" }}>
        ${coin.price.toLocaleString(undefined,{maximumFractionDigits:2})}
      </p>
      {/* Chart */}
      <div style={{ display:"flex", justifyContent:"center" }}>
        <svg viewBox="0 0 64 18" width="72" height="28" fill="none">
          <path d={spark} stroke={sc} strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      {/* Change */}
      <p style={{ fontSize:"13px", fontWeight:700, color: up?"#059669":"#dc2626", margin:0, textAlign:"right" }}>
        {up?"+":""}{coin.change}%
      </p>
      {/* Mkt cap */}
      <p style={{ fontSize:"13px", color:"#6b7280", margin:0, textAlign:"right" }}>{coin.marketCap}</p>
      {/* Volume */}
      <p style={{ fontSize:"13px", color:"#6b7280", margin:0, textAlign:"right" }}>{coin.volume || "—"}</p>
      {/* Action */}
      <div style={{ display:"flex", justifyContent:"flex-end" }}>
        <Link to={`/asset/${coin.id}`}
          style={{ padding:"7px 20px", borderRadius:"999px", background:"#0052FF", color:"white", fontSize:"13px", fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background="#003ed4"}
          onMouseLeave={e => e.currentTarget.style.background="#0052FF"}>
          Trade
        </Link>
      </div>
    </div>
  );
}

/* ── Top mover card ── */
function MoverCard({ coin }) {
  const up = coin.change >= 0;
  const accent = getAccent(coin.symbol);
  return (
    <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:"16px", padding:"16px", flex:"0 0 140px" }}>
      <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:900, color:"white", marginBottom:"10px" }}>
        {coin.symbol.slice(0,2)}
      </div>
      <p style={{ fontSize:"11px", color:"#9ca3af", margin:"0 0 2px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>{coin.symbol}</p>
      <p style={{ fontSize:"13px", fontWeight:700, color:"#111827", margin:"0 0 4px" }}>{coin.name}</p>
      <p style={{ fontSize:"13px", fontWeight:700, color: up?"#059669":"#dc2626", margin:0 }}>{up?"↗":"↙"} {up?"+":""}{coin.change}%</p>
      <p style={{ fontSize:"12px", color:"#6b7280", margin:"4px 0 0" }}>${coin.price.toLocaleString(undefined,{maximumFractionDigits:2})}</p>
    </div>
  );
}

const TABS = ["All assets","Gainers","Losers","Trending"];

export default function Explore() {
  const [search,  setSearch]  = useState("");
  const [tab,     setTab]     = useState("All assets");
  const [sortBy,  setSortBy]  = useState("rank");
  const [sortDir, setSortDir] = useState("asc");

  const filtered = useMemo(() => {
    let data = [...cryptos];
    if (tab === "Gainers")  data = data.filter(c => c.change > 0).sort((a,b) => b.change - a.change);
    if (tab === "Losers")   data = data.filter(c => c.change < 0).sort((a,b) => a.change - b.change);
    if (tab === "Trending") data = [...data].sort((a,b) => b.volume - a.volume);
    if (search) data = data.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
    );
    if (tab === "All assets") {
      data.sort((a,b) => {
        let vA = a[sortBy], vB = b[sortBy];
        if (typeof vA === "string") vA = parseFloat(vA.replace(/[$,B]/g,"")) || 0;
        if (typeof vB === "string") vB = parseFloat(vB.replace(/[$,B]/g,"")) || 0;
        return sortDir === "asc" ? vA - vB : vB - vA;
      });
    }
    return data;
  }, [tab, search, sortBy, sortDir]);

  const handleSort = (col) => {
    if (sortBy === col) setSortDir(d => d==="asc"?"desc":"asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft:"4px", fontSize:"11px", color: sortBy===col?"#0052FF":"#d1d5db" }}>
      {sortBy===col ? (sortDir==="asc"?"↑":"↓") : "↕"}
    </span>
  );

  const topMovers = [...cryptos].sort((a,b) => Math.abs(b.change) - Math.abs(a.change)).slice(0,4);
  const newCoins  = cryptos.slice(-4);
  const totalMktCap = "$24.41T";

  return (
    <div style={{ background:"white", minHeight:"100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ borderBottom:"1px solid #e5e7eb", padding:"32px 24px 0" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"24px", flexWrap:"wrap", marginBottom:"24px" }}>
            <div>
              <h1 style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:900, color:"#111827", margin:"0 0 6px", letterSpacing:"-0.02em" }}>
                Explore crypto
              </h1>
              <p style={{ fontSize:"13px", color:"#6b7280", margin:0, display:"flex", alignItems:"center", gap:"6px" }}>
                Coinbase 50 Index is up
                <span style={{ color:"#059669", fontWeight:700 }}>↗ 1.71% (24hrs)</span>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#059669", display:"inline-block" }}/>
              </p>
            </div>
            {/* Search */}
            <div style={{ position:"relative", width:"320px" }}>
              <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"#9ca3af" }}><SearchIcon/></span>
              <input type="text" placeholder="Search for an asset" value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width:"100%", padding:"12px 16px 12px 40px", borderRadius:"999px", border:"1.5px solid #e5e7eb", background:"#f9fafb", fontSize:"14px", color:"#111827", outline:"none", boxSizing:"border-box" }}
                onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px", display:"flex", gap:"32px", alignItems:"flex-start" }}>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex:1, minWidth:0 }}>

          {/* Market stats */}
          <div style={{ marginBottom:"40px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
              <h2 style={{ fontSize:"20px", fontWeight:800, color:"#111827", margin:0 }}>Market stats</h2>
            </div>
            <p style={{ fontSize:"13px", color:"#6b7280", marginBottom:"16px" }}>
              The overall crypto market is growing this week. Total market cap: <span style={{ fontWeight:600, color:"#111827" }}>{totalMktCap}</span>, up 2.29% from last week.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <StatCard label="Total market cap"  value="$24.41T"  change="0.83%"  up={true}  id="mc"/>
              <StatCard label="Trade volume"       value="$1.80T"   change="54.88%" up={true}  id="tv"/>
              <StatCard label="Buy-sell ratio"     value="0.76"     change="0.07%"  up={true}  id="bs"/>
              <StatCard label="BTC dominance"      value="60.14%"   change="0.07%"  up={false} id="btc"/>
            </div>
          </div>

          {/* Crypto market prices */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"8px", flexWrap:"wrap" }}>
              <h2 style={{ fontSize:"20px", fontWeight:800, color:"#111827", margin:0 }}>
                Crypto market prices
              </h2>
              <span style={{ fontSize:"13px", color:"#9ca3af", fontWeight:500 }}>{cryptos.length} assets</span>
            </div>
            <p style={{ fontSize:"13px", color:"#6b7280", marginBottom:"20px" }}>
              The overall crypto market is growing this week. Total market cap: {totalMktCap}, up 2.29%.
            </p>

            {/* Tabs + filters */}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
              <div style={{ display:"flex", background:"#f3f4f6", borderRadius:"999px", padding:"4px", gap:"2px" }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding:"6px 16px", borderRadius:"999px", fontSize:"13px", fontWeight:600, border:"none", cursor:"pointer", background: tab===t?"white":"transparent", color: tab===t?"#111827":"#6b7280", boxShadow: tab===t?"0 1px 4px rgba(0,0,0,0.08)":""  }}>
                    {t}
                  </button>
                ))}
              </div>
              <span style={{ fontSize:"12px", color:"#9ca3af", marginLeft:"8px" }}>{filtered.length} results</span>
            </div>

            {/* Table */}
            <div style={{ border:"1px solid #e5e7eb", borderRadius:"16px", overflow:"hidden" }}>
              {/* Header */}
              <div style={{ display:"grid", gridTemplateColumns:"32px 2fr 1.2fr 100px 90px 1fr 1fr 100px", padding:"12px 20px", background:"#f9fafb", borderBottom:"1px solid #e5e7eb" }}>
                {[
                  { label:"",          col:null,        align:"left"  },
                  { label:"Asset",     col:"rank",      align:"left"  },
                  { label:"Price",     col:"price",     align:"right" },
                  { label:"Chart",     col:null,        align:"center"},
                  { label:"Change",    col:"change",    align:"right" },
                  { label:"Mkt cap",   col:"marketCap", align:"right" },
                  { label:"Volume",    col:"volume",    align:"right" },
                  { label:"Actions",   col:null,        align:"right" },
                ].map((h,i) => (
                  <div key={i} style={{ fontSize:"12px", fontWeight:700, color:"#9ca3af", textAlign:h.align, cursor: h.col?"pointer":"default", userSelect:"none", textTransform:"uppercase", letterSpacing:"0.05em" }}
                    onClick={h.col ? () => handleSort(h.col) : undefined}>
                    {h.label}{h.col && <SortIcon col={h.col}/>}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {filtered.length > 0
                ? filtered.map((coin, i) => <CoinRow key={coin.id} coin={coin} index={i}/>)
                : (
                  <div style={{ padding:"60px", textAlign:"center" }}>
                    <p style={{ fontSize:"32px", margin:"0 0 12px" }}>🔍</p>
                    <p style={{ fontSize:"14px", color:"#6b7280" }}>No results for "<strong>{search}</strong>"</p>
                    <button onClick={() => setSearch("")} style={{ marginTop:"8px", fontSize:"13px", color:"#0052FF", background:"none", border:"none", cursor:"pointer" }}>Clear search</button>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{ width:"280px", flexShrink:0, display:"flex", flexDirection:"column", gap:"20px" }}>

          {/* Get started card */}
          <div style={{ background:"linear-gradient(135deg,#0052FF 0%,#1a3fa8 100%)", borderRadius:"20px", padding:"24px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"100px", height:"100px", borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
            <div style={{ position:"absolute", top:"10px", right:"10px", fontSize:"40px" }}>🪙</div>
            <p style={{ fontSize:"12px", fontWeight:700, color:"rgba(255,255,255,0.7)", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 4px" }}>Get started</p>
            <p style={{ fontSize:"16px", fontWeight:800, color:"white", margin:"0 0 16px", lineHeight:1.3 }}>Create your account today</p>
            <Link to="/signup"
              style={{ display:"inline-block", padding:"9px 20px", borderRadius:"999px", background:"white", color:"#0052FF", fontSize:"13px", fontWeight:700, textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.style.background="#f0f4ff"}
              onMouseLeave={e => e.currentTarget.style.background="white"}>
              Sign up
            </Link>
          </div>

          {/* Top movers */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
              <h3 style={{ fontSize:"16px", fontWeight:800, color:"#111827", margin:0 }}>Top movers</h3>
              <span style={{ fontSize:"12px", color:"#9ca3af" }}>24hr change</span>
            </div>
            <div style={{ display:"flex", gap:"10px", overflowX:"auto", paddingBottom:"4px" }}>
              {topMovers.map(c => <MoverCard key={c.id} coin={c}/>)}
            </div>
          </div>

          {/* New on Coinbase */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
              <h3 style={{ fontSize:"16px", fontWeight:800, color:"#111827", margin:0 }}>New on Coinbase</h3>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {newCoins.map((c,i) => {
                const accent = getAccent(c.symbol);
                return (
                  <Link key={c.id} to={`/asset/${c.id}`}
                    style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px", borderRadius:"14px", border:"1px solid #e5e7eb", textDecoration:"none", transition:"background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.background="white"}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:900, color:"white", flexShrink:0 }}>
                      {c.symbol.slice(0,2)}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:"13px", fontWeight:700, color:"#111827", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.name}</p>
                      <p style={{ fontSize:"11px", color:"#9ca3af", margin:0 }}>Added recently</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ background:"#f0f4ff", borderRadius:"16px", padding:"20px", border:"1px solid #c7d7fe", textAlign:"center" }}>
            <p style={{ fontSize:"14px", fontWeight:700, color:"#111827", margin:"0 0 6px" }}>Ready to invest?</p>
            <p style={{ fontSize:"12px", color:"#6b7280", margin:"0 0 14px" }}>Start buying in under 2 minutes.</p>
            <Link to="/signup"
              style={{ display:"block", padding:"10px", borderRadius:"999px", background:"#0052FF", color:"white", fontSize:"13px", fontWeight:700, textDecoration:"none" }}>
              Get started free
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        input::placeholder { color:#9ca3af; }
        ::-webkit-scrollbar { height:4px; }
        ::-webkit-scrollbar-track { background:#f3f4f6; }
        ::-webkit-scrollbar-thumb { background:#d1d5db; border-radius:999px; }
      `}</style>
    </div>
  );
}