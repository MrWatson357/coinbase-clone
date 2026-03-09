import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cryptos } from "../data/cryptos";

const cryptoAccent = {
  BTC:"#F7931A", ETH:"#627EEA", SOL:"#9945FF", XRP:"#00AAE4",
  BNB:"#F3BA2F", ADA:"#627EEA", DOGE:"#C2A633", USDT:"#26A17B",
  DOT:"#E6007A", AVAX:"#E84142", MATIC:"#8247E5", LINK:"#2A5ADA",
};
const getAccent = (sym) => cryptoAccent[sym] || "#0052FF";

/* ── Ticker ── */
function Ticker() {
  const items = [...cryptos.slice(0, 8), ...cryptos.slice(0, 8)];
  return (
    <div style={{ overflow:"hidden", background:"white", borderBottom:"1px solid #e5e7eb", padding:"10px 0" }}>
      <div style={{ display:"flex", gap:"32px", whiteSpace:"nowrap", width:"max-content", animation:"ticker 28s linear infinite" }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState="paused"}
        onMouseLeave={e => e.currentTarget.style.animationPlayState="running"}>
        {items.map((c, i) => {
          const up = c.change >= 0;
          return (
            <Link key={`${c.id}-${i}`} to={`/asset/${c.id}`}
              style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"0 8px", textDecoration:"none" }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:getAccent(c.symbol), flexShrink:0 }}/>
              <span style={{ fontSize:"13px", fontWeight:700, color:"#111827" }}>{c.symbol}</span>
              <span style={{ fontSize:"13px", color:"#6b7280" }}>${c.price.toLocaleString()}</span>
              <span style={{ fontSize:"12px", fontWeight:700, color: up?"#059669":"#dc2626" }}>
                {up?"▲":"▼"}{Math.abs(c.change)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Typewriter ── */
const WORDS = ["investment hub", "financial future", "digital wallet", "crypto journey"];
function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) { const t = setTimeout(() => { setPause(false); setDel(true); }, 1600); return () => clearTimeout(t); }
    const w = WORDS[idx];
    if (!del && txt.length < w.length) { const t = setTimeout(() => setTxt(w.slice(0,txt.length+1)), 65); return () => clearTimeout(t); }
    if (!del && txt.length === w.length) { setPause(true); return; }
    if (del && txt.length > 0) { const t = setTimeout(() => setTxt(txt.slice(0,-1)), 35); return () => clearTimeout(t); }
    if (del && txt.length === 0) { setDel(false); setIdx(i => (i+1) % WORDS.length); }
  }, [txt, del, idx, pause]);
  return <span style={{ color:"#0052FF" }}>{txt}<span className="blink">|</span></span>;
}

/* ── Crypto list card (image 4 style) ── */
const ASSET_TABS = ["Tradable", "Top gainers", "New on Coinbase"];
function CryptoListCard() {
  const [activeTab, setActiveTab] = useState("Tradable");
  const gainers = [...cryptos].sort((a,b) => b.change - a.change);
  const list = activeTab === "Top gainers" ? gainers : cryptos;

  return (
    <div style={{ background:"#1a1a1a", borderRadius:"20px", padding:"0", overflow:"hidden", width:"100%", maxWidth:"520px", boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
      {/* Tabs */}
      <div style={{ display:"flex", gap:"0", padding:"16px 20px 0", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
        {ASSET_TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ padding:"10px 16px", fontSize:"14px", fontWeight:600, background:"none", border:"none", cursor:"pointer", borderRadius:"8px 8px 0 0",
              color: activeTab===t ? "white" : "rgba(255,255,255,0.45)",
              borderBottom: activeTab===t ? "2px solid white" : "2px solid transparent",
              marginBottom:"-1px", transition:"all 0.15s"
            }}>
            {t}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div>
        {list.slice(0, 6).map((c, i) => {
          const up = c.change >= 0;
          const accent = getAccent(c.symbol);
          return (
            <Link key={c.id} to={`/asset/${c.id}`}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", textDecoration:"none", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.06)" : "none", transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                {/* Coin icon */}
                <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:900, color:"white", flexShrink:0 }}>
                  {c.symbol.slice(0,2)}
                </div>
                <span style={{ fontSize:"16px", fontWeight:600, color:"white" }}>{c.name}</span>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontSize:"15px", fontWeight:700, color:"white", margin:0 }}>
                  ${c.price.toLocaleString(undefined,{maximumFractionDigits:2})}
                </p>
                <p style={{ fontSize:"12px", fontWeight:700, color: up?"#4ade80":"#f87171", margin:0 }}>
                  {up?"↗":"↙"} {up?"+":""}{c.change}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Trading tools mockup (image 2/3 style) ── */
function TradingMockup() {
  return (
    <div style={{ background:"#0d0d0d", borderRadius:"20px", padding:"20px", width:"100%", maxWidth:"560px", boxShadow:"0 24px 60px rgba(0,0,0,0.4)", position:"relative", overflow:"hidden" }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#ef4444" }}/>
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#f59e0b" }}/>
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#10b981" }}/>
          <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginLeft:"8px" }}>BTC-USD · Advanced</span>
        </div>
        <div style={{ display:"flex", gap:"6px" }}>
          {["1m","5m","1h","1D"].map((t,i) => (
            <span key={t} style={{ fontSize:"11px", padding:"2px 7px", borderRadius:"4px", background: i===3?"rgba(0,82,255,0.3)":"transparent", color: i===3?"#60a5fa":"rgba(255,255,255,0.35)", fontWeight:600 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Candlestick chart */}
      <svg viewBox="0 0 520 160" style={{ width:"100%", height:"120px" }} fill="none">
        {/* Grid lines */}
        {[0,40,80,120].map(y => <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>)}

        {/* Candles */}
        {[
          [30,90,70,110,50], [60,70,50,85,45], [90,85,60,95,55], [120,60,40,75,35],
          [150,75,55,88,50], [180,55,35,65,30], [210,65,45,80,40], [240,45,25,58,20],
          [270,58,38,70,32], [300,40,20,52,15], [330,52,32,65,28], [360,35,15,48,10],
          [390,48,28,60,22], [420,32,12,45,8],  [450,60,35,72,30], [480,45,20,58,15],
        ].map(([x,high,low,open,close], i) => {
          const isUp = open > close;
          const color = isUp ? "#4ade80" : "#f87171";
          const bodyTop = Math.min(open, close);
          const bodyH = Math.max(Math.abs(open-close), 3);
          return (
            <g key={i}>
              <line x1={x+5} y1={high} x2={x+5} y2={low} stroke={color} strokeWidth="1.5"/>
              <rect x={x} y={bodyTop} width="10" height={bodyH} fill={color} rx="1"/>
            </g>
          );
        })}

        {/* Buy/sell overlay */}
        <rect x="340" y="45" width="60" height="22" rx="4" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.4)" strokeWidth="1"/>
        <text x="370" y="60" textAnchor="middle" fontSize="10" fill="#4ade80" fontWeight="700">BUY</text>
      </svg>

      {/* Order book strip */}
      <div style={{ display:"flex", gap:"8px", marginTop:"12px" }}>
        <div style={{ flex:1, background:"rgba(74,222,128,0.08)", borderRadius:"8px", padding:"8px 12px" }}>
          <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Bids</p>
          {[["67,234","1.24"],["67,210","0.87"],["67,190","2.10"]].map(([p,v],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:"#4ade80", fontWeight:600, lineHeight:"1.6" }}>
              <span>{p}</span><span style={{ color:"rgba(255,255,255,0.4)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ flex:1, background:"rgba(248,113,113,0.08)", borderRadius:"8px", padding:"8px 12px" }}>
          <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Asks</p>
          {[["67,280","0.93"],["67,300","1.45"],["67,320","0.62"]].map(([p,v],i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:"11px", color:"#f87171", fontWeight:600, lineHeight:"1.6" }}>
              <span>{p}</span><span style={{ color:"rgba(255,255,255,0.4)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const stats = [
  { value:"$330B+", label:"Quarterly volume"  },
  { value:"100M+",  label:"Verified users"    },
  { value:"200+",   label:"Countries"         },
  { value:"$0",     label:"Trading fees"      },
];

const trustedBy = ["Forbes","Bloomberg","Wall Street Journal","TechCrunch","Financial Times"];

export default function Home() {
  return (
    <div style={{ background:"white", minHeight:"100vh" }}>

      <Ticker />

      {/* ── HERO — white bg, mockup right ── */}
      <section style={{ background:"white", padding:"80px 24px 72px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", gap:"64px", flexWrap:"wrap" }}>

          {/* Left text */}
          <div style={{ flex:"1", minWidth:"280px" }}>
            <h1 style={{ fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:900, color:"#111827", lineHeight:1.05, letterSpacing:"-0.03em", margin:"0 0 20px" }}>
              The future of<br/>finance is here.
            </h1>
            <p style={{ fontSize:"18px", color:"#6b7280", marginBottom:"36px", lineHeight:1.6, maxWidth:"420px" }}>
              Trade crypto and more on a platform you can trust.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <input type="email" placeholder="satoshi@nakamoto.com"
                style={{ flex:1, minWidth:"220px", padding:"14px 20px", borderRadius:"12px", border:"1.5px solid #d1d5db", background:"white", color:"#111827", fontSize:"14px", outline:"none" }}
                onFocus={e => e.target.style.borderColor="#0052FF"}
                onBlur={e => e.target.style.borderColor="#d1d5db"}
              />
              <Link to="/signup"
                style={{ padding:"14px 28px", borderRadius:"12px", background:"#0052FF", color:"white", fontWeight:700, fontSize:"14px", textDecoration:"none", display:"flex", alignItems:"center", whiteSpace:"nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background="#003ed4"}
                onMouseLeave={e => e.currentTarget.style.background="#0052FF"}>
                Sign up
              </Link>
            </div>
          </div>

          {/* Right — dark app mockup with portfolio */}
          <div style={{ flex:"1", minWidth:"300px", display:"flex", justifyContent:"center" }}>
            <div style={{ background:"linear-gradient(145deg,#0a1628,#0052FF 60%,#1a3fa8)", borderRadius:"24px", padding:"28px", width:"100%", maxWidth:"460px", boxShadow:"0 32px 80px rgba(0,82,255,0.25)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
              <div style={{ background:"white", borderRadius:"16px", padding:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
                  <p style={{ fontSize:"13px", color:"#6b7280", margin:0 }}>Portfolio value</p>
                  <span style={{ fontSize:"11px", fontWeight:700, color:"#059669", background:"#d1fae5", padding:"3px 8px", borderRadius:"999px" }}>+4.21%</span>
                </div>
                <p style={{ fontSize:"32px", fontWeight:900, color:"#111827", margin:"0 0 4px" }}>$33,683.80</p>
                <p style={{ fontSize:"13px", color:"#059669", fontWeight:600, margin:"0 0 16px" }}>▲ $131.36 (1.38%) today</p>
                {/* mini chart */}
                <svg viewBox="0 0 300 60" style={{ width:"100%", height:"48px", marginBottom:"16px" }} fill="none">
                  <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0052FF" stopOpacity="0.15"/><stop offset="100%" stopColor="#0052FF" stopOpacity="0"/></linearGradient></defs>
                  <path d="M0 55 C30 50,60 42,90 35 S140 20,170 15 S220 8,250 5 L300 2 L300 60 L0 60Z" fill="url(#hg)"/>
                  <path d="M0 55 C30 50,60 42,90 35 S140 20,170 15 S220 8,250 5 L300 2" stroke="#0052FF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                {/* time filters */}
                <div style={{ display:"flex", gap:"4px", marginBottom:"16px" }}>
                  {["1H","1D","1W","1M","1Y","All"].map((t,i) => (
                    <span key={t} style={{ padding:"3px 9px", borderRadius:"6px", fontSize:"11px", fontWeight:600, background:i===1?"#0052FF":"transparent", color:i===1?"white":"#9ca3af", cursor:"pointer" }}>{t}</span>
                  ))}
                </div>
                {/* asset rows */}
                {[
                  { name:"Crypto",  val:"$14,186.12", up:true,  color:"#0052FF" },
                  { name:"Stocks",  val:"$8,133.98",  up:true,  color:"#6b7280" },
                  { name:"Cash",    val:"$10,124.22", up:false, color:"#6b7280" },
                ].map(r => (
                  <div key={r.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderTop:"1px solid #f3f4f6" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:r.color+"18", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:r.color }}/>
                      </div>
                      <span style={{ fontSize:"13px", fontWeight:600, color:"#111827" }}>{r.name}</span>
                    </div>
                    <span style={{ fontSize:"13px", fontWeight:700, color: r.up?"#059669":"#111827" }}>{r.up?"↗ ":""}{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:"#f9fafb", borderTop:"1px solid #e5e7eb", borderBottom:"1px solid #e5e7eb", padding:"48px 24px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"32px" }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <p style={{ fontSize:"clamp(1.8rem,3vw,2.4rem)", fontWeight:900, color:"#111827", margin:0 }}>{s.value}</p>
              <p style={{ fontSize:"14px", color:"#6b7280", margin:"4px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPLORE CRYPTO — image 4 style: text left, dark card right ── */}
      <section style={{ background:"#f3f4f6", padding:"96px 24px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", gap:"80px", flexWrap:"wrap" }}>
          <div style={{ flex:"1", minWidth:"260px" }}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, color:"#111827", lineHeight:1.08, margin:"0 0 20px", letterSpacing:"-0.02em" }}>
              Explore crypto like Bitcoin,<br/>Ethereum, and Dogecoin.
            </h2>
            <p style={{ fontSize:"16px", color:"#6b7280", marginBottom:"32px", lineHeight:1.6 }}>
              Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
            </p>
            <Link to="/explore"
              style={{ display:"inline-flex", alignItems:"center", padding:"14px 28px", borderRadius:"999px", background:"#111827", color:"white", fontWeight:700, fontSize:"14px", textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.style.background="#374151"}
              onMouseLeave={e => e.currentTarget.style.background="#111827"}>
              See more assets
            </Link>
          </div>
          <div style={{ flex:"1", minWidth:"300px", display:"flex", justifyContent:"center" }}>
            <CryptoListCard />
          </div>
        </div>
      </section>

      {/* ── TRADING TOOLS — image 2/3: dark mockup left, text right ── */}
      <section style={{ background:"white", padding:"96px 24px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", gap:"80px", flexWrap:"wrap" }}>
          <div style={{ flex:"1", minWidth:"300px", display:"flex", justifyContent:"center" }}>
            <TradingMockup />
          </div>
          <div style={{ flex:"1", minWidth:"260px" }}>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, color:"#111827", lineHeight:1.08, margin:"0 0 20px", letterSpacing:"-0.02em" }}>
              Powerful tools, designed<br/>for the advanced trader.
            </h2>
            <p style={{ fontSize:"16px", color:"#6b7280", marginBottom:"32px", lineHeight:1.6 }}>
              Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
            </p>
            <Link to="/explore"
              style={{ display:"inline-flex", alignItems:"center", padding:"14px 28px", borderRadius:"999px", background:"#111827", color:"white", fontWeight:700, fontSize:"14px", textDecoration:"none" }}
              onMouseEnter={e => e.currentTarget.style.background="#374151"}
              onMouseLeave={e => e.currentTarget.style.background="#111827"}>
              Start trading
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRESS ── */}
      <div style={{ borderTop:"1px solid #e5e7eb", padding:"40px 24px", background:"white" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", textAlign:"center" }}>
          <p style={{ fontSize:"11px", fontWeight:700, color:"#d1d5db", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"24px" }}>As seen in</p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"40px" }}>
            {trustedBy.map(n => (
              <span key={n} style={{ fontSize:"16px", fontWeight:800, color:"#d1d5db", letterSpacing:"-0.02em", cursor:"default", transition:"color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#6b7280"}
                onMouseLeave={e => e.currentTarget.style.color="#d1d5db"}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding:"96px 24px", background:"linear-gradient(180deg,#fff 0%,#f0f4ff 100%)" }}>
        <div style={{ maxWidth:"600px", margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:900, color:"#111827", margin:"0 0 16px", lineHeight:1.1 }}>
            Your crypto journey starts with one step.
          </h2>
          <p style={{ fontSize:"16px", color:"#6b7280", marginBottom:"40px" }}>Create your free account in minutes.</p>
          <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <Link to="/signup"
              style={{ padding:"16px 36px", borderRadius:"999px", background:"#0052FF", color:"white", fontWeight:700, fontSize:"15px", textDecoration:"none", boxShadow:"0 8px 30px rgba(0,82,255,0.25)" }}
              onMouseEnter={e => e.currentTarget.style.background="#003ed4"}
              onMouseLeave={e => e.currentTarget.style.background="#0052FF"}>
              Create free account
            </Link>
            <Link to="/explore"
              style={{ padding:"16px 36px", borderRadius:"999px", border:"1.5px solid #d1d5db", color:"#374151", fontWeight:700, fontSize:"15px", textDecoration:"none", background:"white" }}
              onMouseEnter={e => e.currentTarget.style.background="#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background="white"}>
              Browse markets
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        input::placeholder { color: #9ca3af; }
      `}</style>
    </div>
  );
}