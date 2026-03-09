import { useState } from "react";
import { Link } from "react-router-dom";

const ArrowRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
  </svg>
);
const Clock = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/>
  </svg>
);

const CATEGORIES = ["All", "Basics", "Blockchain", "Investing", "Security", "DeFi"];

const articles = [
  { id:1, category:"Basics",     level:"Beginner",     readTime:"3 min", emoji:"₿",  title:"What is Bitcoin?",              desc:"The original cryptocurrency that started it all. Understand how Bitcoin works, why it was created, and why it matters.",                         tags:["BTC","Basics"],      accent:"#F7931A" },
  { id:2, category:"Basics",     level:"Beginner",     readTime:"4 min", emoji:"🌐", title:"What is crypto?",               desc:"Digital money, decentralized networks, and a new financial system. Learn what makes cryptocurrency fundamentally different.",                  tags:["Crypto","Money"],    accent:"#0052FF" },
  { id:3, category:"Blockchain", level:"Intermediate", readTime:"6 min", emoji:"⛓️", title:"What is a blockchain?",         desc:"The revolutionary technology behind every cryptocurrency. Explore how distributed ledgers create trust without a central authority.",            tags:["Blockchain","Tech"], accent:"#818cf8" },
  { id:4, category:"Security",   level:"Beginner",     readTime:"5 min", emoji:"🔐", title:"How to set up a crypto wallet", desc:"Your crypto wallet is your bank account, vault, and identity all in one. Learn how to set one up safely.",                                    tags:["Wallet","Security"], accent:"#059669" },
  { id:5, category:"Basics",     level:"Beginner",     readTime:"4 min", emoji:"📤", title:"How to send crypto",            desc:"Sending crypto is simpler than a bank wire and faster than a check. Learn the step-by-step process and key safety tips.",                    tags:["Transfers","Basics"],accent:"#7c3aed" },
  { id:6, category:"Investing",  level:"Intermediate", readTime:"7 min", emoji:"📊", title:"Crypto basics for investors",   desc:"Market caps, volatility, portfolios — what every investor needs to understand before putting money into digital assets.",                     tags:["Investing","Markets"],accent:"#d97706" },
  { id:7, category:"DeFi",       level:"Advanced",     readTime:"8 min", emoji:"🏦", title:"What is DeFi?",                 desc:"Decentralized Finance is rebuilding banking on the blockchain. Discover lending, borrowing, and earning without traditional banks.",            tags:["DeFi","Advanced"],   accent:"#0052FF" },
  { id:8, category:"Investing",  level:"Intermediate", readTime:"5 min", emoji:"📈", title:"Tips & tutorials",              desc:"Practical strategies, common mistakes to avoid, and pro tips from experienced crypto investors to help you navigate the market.",             tags:["Tips","Strategy"],   accent:"#f97316" },
  { id:9, category:"Blockchain", level:"Advanced",     readTime:"9 min", emoji:"🔮", title:"Crypto glossary",               desc:"HODL, gas fees, staking, yield farming — learn every term you'll encounter in the crypto ecosystem.",                                        tags:["Reference","All levels"],accent:"#9333ea" },
];

const popularArticles = [
  { tag:"BEGINNER'S GUIDE",  title:"What is cryptocurrency?",                            accent:"#0052FF" },
  { tag:"GETTING STARTED",   title:"How to earn crypto rewards",                         accent:"#059669" },
  { tag:"GETTING STARTED",   title:"How to add crypto to your Coinbase Wallet",          accent:"#059669" },
  { tag:"YOUR CRYPTO",       title:"Tax forms, explained: A guide to U.S. tax forms",    accent:"#d97706" },
  { tag:"GETTING STARTED",   title:"Beginner's guide to dapps",                          accent:"#7c3aed" },
  { tag:"MARKET UPDATE",     title:"Everything you need to know about the first-ever U.S. Bitcoin ETF", accent:"#F7931A" },
];

const levelConfig = {
  Beginner:     { color:"#059669", bg:"#d1fae5" },
  Intermediate: { color:"#d97706", bg:"#fef3c7" },
  Advanced:     { color:"#dc2626", bg:"#fee2e2" },
};

/* ── Featured thumbnail ── */
function FeaturedThumbnail({ article }) {
  return (
    <div style={{ width:"100%", aspectRatio:"16/9", borderRadius:"16px", overflow:"hidden", background:"#e8edf5", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px" }}>
      {/* Abstract art background */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg, #c8d6e8 0%, #dde8f0 100%)" }}/>
      {/* Decorative shapes */}
      <div style={{ position:"absolute", top:"20%", left:"25%", width:"180px", height:"100px", background:"#1a1a2e", borderRadius:"8px", transform:"perspective(400px) rotateY(-8deg)" }}>
        <div style={{ position:"absolute", top:"8px", left:"8px", right:"8px", height:"6px", background:"#ff6b35", borderRadius:"3px" }}/>
        <div style={{ position:"absolute", top:"20px", left:"8px", right:"8px", height:"6px", background:"#4a9eff", borderRadius:"3px" }}/>
      </div>
      <div style={{ position:"absolute", top:"15%", right:"20%", width:"120px", height:"80px", background:"#1a1a2e", borderRadius:"8px", transform:"perspective(400px) rotateY(8deg)" }}/>
      <div style={{ position:"absolute", bottom:"25%", left:"18%", width:"40px", height:"40px", borderRadius:"50%", background:"#ffd700", border:"4px solid white", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
      </div>
      {/* Play button */}
      <div style={{ position:"relative", zIndex:10, width:"72px", height:"72px", borderRadius:"50%", background:"rgba(30,30,50,0.75)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", backdropFilter:"blur(4px)", border:"2px solid rgba(255,255,255,0.2)" }}>
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
  );
}

/* ── Article card ── */
function ArticleCard({ article }) {
  const lvl = levelConfig[article.level];
  return (
    <Link to="#" style={{ textDecoration:"none", display:"block", padding:"20px", borderRadius:"16px", border:"1px solid #e5e7eb", background:"white", transition:"all 0.2s", cursor:"pointer" }}
      onMouseEnter={e => { e.currentTarget.style.background="#f9fafb"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
      {/* Category tag */}
      <p style={{ fontSize:"10px", fontWeight:800, color:article.accent, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 8px" }}>{article.category}</p>
      {/* Title */}
      <h3 style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 6px", lineHeight:1.3 }}>{article.title}</h3>
      {/* Desc */}
      <p style={{ fontSize:"12px", color:"#6b7280", margin:"0 0 14px", lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{article.desc}</p>
      {/* Meta */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"4px", color:"#9ca3af", fontSize:"11px", fontWeight:500 }}>
          <Clock/>{article.readTime} read
        </div>
        <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background:lvl.bg, color:lvl.color }}>{article.level}</span>
      </div>
    </Link>
  );
}

export default function Learn() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = articles[0];
  const filtered = (activeCategory === "All" ? articles : articles.filter(a => a.category === activeCategory))
    .filter(a => a.id !== featured.id);

  return (
    <div style={{ background:"white", minHeight:"100vh" }}>

      {/* ── HERO ── */}
      <div style={{ borderBottom:"1px solid #e5e7eb", padding:"60px 24px 48px", textAlign:"center" }}>
        <h1 style={{ fontSize:"clamp(2rem,5vw,3rem)", fontWeight:900, color:"#111827", margin:"0 0 12px", letterSpacing:"-0.02em", lineHeight:1.1 }}>
          Crypto questions, answered
        </h1>
        <p style={{ fontSize:"15px", color:"#6b7280", margin:0, maxWidth:"560px", marginLeft:"auto", marginRight:"auto", lineHeight:1.6 }}>
          Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
        </p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"48px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:"56px", alignItems:"flex-start" }}>

          {/* LEFT — Featured */}
          <div>
            <p style={{ fontSize:"13px", fontWeight:700, color:"#111827", margin:"0 0 16px" }}>Featured</p>

            <FeaturedThumbnail article={featured}/>

            {/* Label */}
            <p style={{ fontSize:"11px", fontWeight:800, color:"#6b7280", textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 8px" }}>
              VIDEO TUTORIAL
            </p>

            {/* Title */}
            <h2 style={{ fontSize:"clamp(1.3rem,2.5vw,1.8rem)", fontWeight:900, color:"#111827", margin:"0 0 12px", lineHeight:1.2, letterSpacing:"-0.01em" }}>
              When is the best time to invest in crypto?
            </h2>

            {/* Desc */}
            <p style={{ fontSize:"14px", color:"#6b7280", margin:"0 0 20px", lineHeight:1.6 }}>
              When prices are fluctuating, how do you know when to buy? Learn more about using dollar-cost averaging to weather price volatility.
            </p>

            <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
              <Link to="#"
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"10px 24px", borderRadius:"999px", background:"#0052FF", color:"white", fontSize:"13px", fontWeight:700, textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.background="#003ed4"}
                onMouseLeave={e => e.currentTarget.style.background="#0052FF"}>
                Watch now <ArrowRight/>
              </Link>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"12px", color:"#9ca3af", fontWeight:500 }}>
                <Clock/> {featured.readTime} read
              </span>
            </div>

            {/* ── ALL ARTICLES ── */}
            <div style={{ marginTop:"56px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
                <h2 style={{ fontSize:"20px", fontWeight:800, color:"#111827", margin:0 }}>All articles</h2>
                {/* Category filters */}
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)}
                      style={{ padding:"5px 14px", borderRadius:"999px", fontSize:"12px", fontWeight:600, border:"none", cursor:"pointer", background: activeCategory===c?"#0052FF":"#f3f4f6", color: activeCategory===c?"white":"#6b7280", transition:"all 0.15s" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"16px" }}>
                {filtered.map(a => <ArticleCard key={a.id} article={a}/>)}
                {filtered.length === 0 && (
                  <div style={{ gridColumn:"1/-1", padding:"48px", textAlign:"center" }}>
                    <p style={{ fontSize:"32px", margin:"0 0 12px" }}>📭</p>
                    <p style={{ fontSize:"14px", color:"#9ca3af" }}>No articles in this category</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Popular sidebar */}
          <div style={{ position:"sticky", top:"80px" }}>
            <p style={{ fontSize:"18px", fontWeight:800, color:"#111827", margin:"0 0 20px" }}>Popular</p>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {popularArticles.map((p, i) => (
                <Link key={i} to="#"
                  style={{ display:"block", padding:"16px 0", borderBottom: i < popularArticles.length-1 ? "1px solid #f3f4f6" : "none", textDecoration:"none", transition:"opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.7"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                  <p style={{ fontSize:"10px", fontWeight:800, color:p.accent, textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 5px" }}>
                    {p.tag}
                  </p>
                  <p style={{ fontSize:"14px", fontWeight:600, color:"#111827", margin:0, lineHeight:1.4 }}>
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>

            {/* CTA card */}
            <div style={{ marginTop:"32px", background:"linear-gradient(135deg,#0052FF 0%,#1a3fa8 100%)", borderRadius:"20px", padding:"24px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"80px", height:"80px", borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
              <p style={{ fontSize:"16px", fontWeight:800, color:"white", margin:"0 0 6px" }}>Ready to start?</p>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.7)", margin:"0 0 16px" }}>Create a free account and start your crypto journey today.</p>
              <Link to="/signup"
                style={{ display:"inline-block", padding:"9px 20px", borderRadius:"999px", background:"white", color:"#0052FF", fontSize:"13px", fontWeight:700, textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.background="#f0f4ff"}
                onMouseLeave={e => e.currentTarget.style.background="white"}>
                Sign up free
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}