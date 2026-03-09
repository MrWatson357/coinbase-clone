import { Link } from "react-router-dom";

const CoinbaseLogo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 21.5C12.96 21.5 10.5 19.04 10.5 16C10.5 12.96 12.96 10.5 16 10.5C19.04 10.5 21.5 12.96 21.5 16C21.5 19.04 19.04 21.5 16 21.5Z" fill="white" />
  </svg>
);

const footerColumns = [
  {
    title: "Company",
    links: [
      "About", "Careers", "Affiliates", "Blog", "Press",
      "Security", "Investors", "Vendors", "Legal & privacy",
      "Cookie policy", "Cookie preferences", "Digital Asset Disclosures",
    ],
  },
  {
    title: "Learn",
    links: [
      "Explore", "Market statistics", "Coinbase Bytes newsletter",
      "Crypto basics", "Tips & tutorials", "Crypto glossary",
      "Market updates", "What is Bitcoin?", "What is crypto?",
      "What is a blockchain?", "How to set up a crypto wallet?",
      "How to send crypto?", "Taxes",
    ],
  },
  {
    title: "Individuals",
    links: [
      "Buy & sell", "Earn free crypto", "Base App",
      "Coinbase One", "Debit Card",
    ],
  },
  {
    title: "Businesses",
    links: [
      "Asset Listings", "Coinbase Business", "Payments",
      "Commerce", "Token Manager",
    ],
  },
  {
    title: "Institutions",
    links: [
      "Prime", "Staking", "Exchange",
      "International Exchange", "Derivatives Exchange", "Verified Pools",
    ],
  },
  {
    title: "Developers",
    links: [
      "Developer Platform", "Base", "Server Wallets",
      "Embedded Wallets", "Base Accounts (Smart Wallets)",
      "Onramp & Offramp", "Trade API", "Paymaster",
      "OnchainKit", "Data API", "Verifications",
      "Node", "AgentKit", "Staking", "Faucet",
      "Exchange API", "International Exchange API",
      "Prime API", "Derivatives API",
    ],
  },
  {
    title: "Support",
    links: [
      "Help center", "Contact us", "Create account",
      "ID verification", "Account information", "Payment methods",
      "Account access", "Supported crypto", "Status",
    ],
  },
  {
    title: "Asset prices",
    links: [
      "Bitcoin price", "Ethereum price", "Solana price", "XRP price",
    ],
    extraTitle: "Stock prices",
    extraLinks: [
      "NVIDIA price", "Apple price", "Microsoft price", "Amazon price",
    ],
  },
];

const socials = [
  {
    name: "X",
    hover: "#000",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2H21.5l-7.59 8.67L23 22h-7.06l-5.52-7.24L3.8 22H.5l8.13-9.29L0 2h7.18l5.02 6.61L18.244 2z"/></svg>,
  },
  {
    name: "Instagram",
    hover: "#e1306c",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm5 5.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9.5zm6.5-.75a1 1 0 11-2 0 1 1 0 012 0z"/></svg>,
  },
  {
    name: "LinkedIn",
    hover: "#0077B5",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4 3a2 2 0 100 4 2 2 0 000-4zm1 6H3v12h2V9zm4 0h-2v12h2v-6c0-2 3-2.2 3 0v6h2v-7c0-4-4-3.8-5-1.9V9z"/></svg>,
  },
  {
    name: "YouTube",
    hover: "#FF0000",
    icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8s-.2-1.4-.8-2a2.9 2.9 0 00-2-1C16.8 4.5 12 4.5 12 4.5s-4.8 0-7 .5a2.9 2.9 0 00-2 1C2.4 6.6 2.2 8 2.2 8S2 9.6 2 11.3v1.4C2 14.4 2.2 16 2.2 16s.2 1.4.8 2a2.9 2.9 0 002 1c2.2.5 7 .5 7 .5s4.8 0 7-.5a2.9 2.9 0 002-1c.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.4C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5 2.5-5 2.5z"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer style={{ background:"#f9fafb", borderTop:"1px solid #e5e7eb" }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"56px 24px 32px" }}>

        {/* Logo */}
        <div style={{ marginBottom:"40px" }}>
          <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
            <CoinbaseLogo />
          </Link>
        </div>

        {/* Columns grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:"32px 24px", marginBottom:"48px" }}>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 style={{ fontSize:"13px", fontWeight:700, color:"#111827", marginBottom:"16px", marginTop:0 }}>
                {col.title}
              </h3>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to="#"
                      style={{ fontSize:"13px", color:"#6b7280", textDecoration:"none", transition:"color 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.color="#0052FF"}
                      onMouseLeave={e => e.currentTarget.style.color="#6b7280"}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Extra section in same column (Asset prices → Stock prices) */}
              {col.extraTitle && (
                <div style={{ marginTop:"28px" }}>
                  <h3 style={{ fontSize:"13px", fontWeight:700, color:"#111827", marginBottom:"16px", marginTop:0 }}>
                    {col.extraTitle}
                  </h3>
                  <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                    {col.extraLinks.map((link) => (
                      <li key={link}>
                        <Link to="#"
                          style={{ fontSize:"13px", color:"#6b7280", textDecoration:"none" }}
                          onMouseEnter={e => e.currentTarget.style.color="#0052FF"}
                          onMouseLeave={e => e.currentTarget.style.color="#6b7280"}>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid #e5e7eb", paddingTop:"24px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"16px" }}>
          <p style={{ fontSize:"12px", color:"#9ca3af", margin:0 }}>
            © {new Date().getFullYear()} Coinbase Clone. Not affiliated with Coinbase.
          </p>

          {/* Social icons */}
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            {socials.map((s) => (
              <a key={s.name} href="#" aria-label={s.name}
                style={{ width:"34px", height:"34px", borderRadius:"50%", border:"1px solid #e5e7eb", background:"white", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b7280", textDecoration:"none", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background=s.hover; e.currentTarget.style.color="white"; e.currentTarget.style.borderColor=s.hover; }}
                onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.color="#6b7280"; e.currentTarget.style.borderColor="#e5e7eb"; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}