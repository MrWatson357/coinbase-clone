import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../../services/api";

const CoinbaseLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 21.5C12.96 21.5 10.5 19.04 10.5 16C10.5 12.96 12.96 10.5 16 10.5C19.04 10.5 21.5 12.96 21.5 16C21.5 19.04 19.04 21.5 16 21.5Z" fill="white" />
  </svg>
);
const SearchIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
  </svg>
);

const NavIcon = ({ children }) => (
  <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#374151" }}>
    {children}
  </div>
);

const MenuItem = ({ icon, title, desc, to="#" }) => (
  <Link to={to} style={{ display:"flex", gap:"12px", alignItems:"flex-start", padding:"10px 12px", borderRadius:"10px", textDecoration:"none", transition:"background 0.15s" }}
    onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
    <NavIcon>{icon}</NavIcon>
    <div>
      <p style={{ fontSize:"14px", fontWeight:600, color:"#111827", margin:0 }}>{title}</p>
      <p style={{ fontSize:"12px", color:"#6b7280", margin:"2px 0 0", lineHeight:1.4 }}>{desc}</p>
    </div>
  </Link>
);

const FeaturedCard = ({ img, title, subtitle, cta, ctaTo="#" }) => (
  <div style={{ display:"flex", gap:"16px", alignItems:"flex-start" }}>
    <div style={{ width:"96px", height:"96px", borderRadius:"16px", background:"linear-gradient(135deg,#0052FF,#003BB3)", flexShrink:0, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {img}
    </div>
    <div>
      <p style={{ fontSize:"16px", fontWeight:700, color:"#111827", margin:"0 0 6px", lineHeight:1.3 }}>{title}</p>
      <p style={{ fontSize:"13px", color:"#6b7280", margin:"0 0 12px", lineHeight:1.5 }}>{subtitle}</p>
      <Link to={ctaTo} style={{ fontSize:"13px", fontWeight:600, color:"#111827", textDecoration:"underline" }}>{cta}</Link>
    </div>
  </div>
);

const I = {
  buy: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  base: <svg width="16" height="16" viewBox="0 0 24 24" fill="#0052FF"><circle cx="12" cy="12" r="10"/><path d="M12 6C8.686 6 6 8.686 6 12s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 9a3 3 0 110-6 3 3 0 010 6z" fill="white"/></svg>,
  one: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4l3 3"/></svg>,
  private: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm8 0c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zm-8 6c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z"/></svg>,
  onchain: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
  learn: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
  advanced: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  earn: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1"/></svg>,
  wealth: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>,
  cc: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  debit: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  biz: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  list: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  pay: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  token: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l4 2"/></svg>,
  prime: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  custody: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  stake: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"/></svg>,
  wallet: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
  exchange: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>,
  intl: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>,
  deriv: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  pools: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path strokeLinecap="round" d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
  devpay: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  trade: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>,
  stablecoin: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v8m-4-4h8"/></svg>,
  bank: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"/></svg>,
  startup: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  about: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8h.01M11 12h1v4h1"/></svg>,
  aff: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>,
  blog: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>,
  careers: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  support: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>,
  security: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
};

const DROPDOWNS = {
  Individuals: {
    cols: [
      [
        { icon: I.buy,     title:"Buy and sell",   desc:"Buy, sell, and use crypto",              to:"/signup"  },
        { icon: I.base,    title:"Base App",        desc:"Post, earn, trade, and chat, all in one place", to:"/" },
        { icon: I.one,     title:"Coinbase One",    desc:"Get zero trading fees and more",         to:"/"        },
        { icon: I.private, title:"Private Client",  desc:"For trusts, family offices, UHNWIs",    to:"/"        },
        { icon: I.onchain, title:"Onchain",         desc:"Dive into the world of onchain apps",   to:"/"        },
        { icon: I.learn,   title:"Learn",           desc:"Crypto tips and guides",                to:"/learn"   },
      ],
      [
        { icon: I.advanced, title:"Advanced",      desc:"Professional-grade trading tools",       to:"/explore" },
        { icon: I.earn,     title:"Earn",           desc:"Stake your crypto and earn rewards",    to:"/"        },
        { icon: I.wealth,   title:"Coinbase Wealth",desc:"Institutional-grade services for UHNW", to:"/"       },
        { icon: I.cc,       title:"Credit Card",    desc:"Earn up to 4% bitcoin back",            to:"/"        },
        { icon: I.debit,    title:"Debit Card",     desc:"Spend crypto, get crypto back",         to:"/"        },
      ],
    ],
    featured: {
      img: <div style={{ width:"60px", height:"60px", borderRadius:"14px", background:"linear-gradient(135deg,#0052FF,#60a5fa)", display:"flex", alignItems:"center", justifyContent:"center" }}><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.2"/><path d="M16 8C11.582 8 8 11.582 8 16C8 20.418 11.582 24 16 24C20.418 24 24 20.418 24 16C24 11.582 20.418 8 16 8ZM16 20.5C13.518 20.5 11.5 18.482 11.5 16C11.5 13.518 13.518 11.5 16 11.5C18.482 11.5 20.5 13.518 20.5 16C20.5 18.482 18.482 20.5 16 20.5Z" fill="white"/></svg></div>,
      title: "System Update 2025",
      subtitle: "The next chapter of Coinbase. Live on X 12/17.",
      cta: "Learn more",
    },
  },
  Businesses: {
    cols: [
      [
        { icon: I.biz,  title:"Business",       desc:"Crypto trading and payments for startups and SMBs", to:"/" },
        { icon: I.list, title:"Asset Listings",  desc:"List your asset on Coinbase",                      to:"/" },
      ],
      [
        { icon: I.pay,   title:"Payments",      desc:"The stablecoin payments stack for commerce platforms", to:"/" },
        { icon: I.token, title:"Token Manager", desc:"The platform for token distributions, vesting, and lockups", to:"/" },
      ],
    ],
    featured: {
      img: <div style={{ fontSize:"28px", display:"flex", alignItems:"center", justifyContent:"center" }}>🛒</div>,
      title: "Commerce Payments Protocol",
      subtitle: "A new standard for onchain payments.",
      cta: "Go to Payments",
    },
  },
  Institutions: {
    sectionTitle1: "Prime",
    sectionTitle2: "Markets",
    cols: [
      [
        { icon: I.prime,   title:"Trading and Financing", desc:"Professional prime brokerage services", to:"/" },
        { icon: I.custody, title:"Custody",               desc:"Securely store all your digital assets", to:"/" },
        { icon: I.stake,   title:"Staking",               desc:"Explore staking across our products",   to:"/" },
        { icon: I.wallet,  title:"Onchain Wallet",        desc:"Institutional-grade wallet to get onchain", to:"/" },
      ],
      [
        { icon: I.exchange, title:"Exchange",             desc:"Spot markets for high-frequency trading", to:"/" },
        { icon: I.intl,     title:"International Exchange",desc:"Access perpetual futures markets",      to:"/" },
        { icon: I.deriv,    title:"Derivatives Exchange", desc:"Trade an accessible futures market",     to:"/" },
        { icon: I.pools,    title:"Verified Pools",       desc:"Transparent, verified liquidity pools",  to:"/" },
      ],
    ],
    featured: {
      img: <div style={{ fontSize:"40px", display:"flex", alignItems:"center", justifyContent:"center" }}>🌐</div>,
      title: "Our clients",
      subtitle: "Trusted by institutions and government.",
      cta: "Learn more",
    },
  },
  Developers: {
    sectionTitle1: "Coinbase Developer Platform",
    sectionTitle2: "Solutions for any company",
    cols: [
      [
        { icon: I.devpay,     title:"Payments",    desc:"Fast and global stablecoin payments with a single integration", to:"/" },
        { icon: I.trade,      title:"Trading",     desc:"Launch crypto trading and custody for your users",              to:"/" },
        { icon: I.wallet,     title:"Wallets",     desc:"Deploy customizable and scalable wallets for your business",    to:"/" },
        { icon: I.stablecoin, title:"Stablecoins", desc:"Access USDC and Coinbase Custom Stablecoins",                  to:"/" },
      ],
      [
        { icon: I.bank,    title:"Banks & Brokerages", desc:"Secure, regulated offerings for retail, private banking, & institutional clients", to:"/" },
        { icon: I.pay,     title:"Payment Firms",      desc:"Near-instant, low-cost, global payment rails for modern providers",                to:"/" },
        { icon: I.startup, title:"Startups",           desc:"Launch your business with the world's leader in crypto",                          to:"/" },
      ],
    ],
    featured: {
      img: <div style={{ fontSize:"28px", display:"flex", alignItems:"center", justifyContent:"center" }}>📊</div>,
      title: "World class crypto infrastructure.",
      subtitle: "Discover Coinbase's complete crypto-as-a-service platform.",
      cta: "Learn more",
    },
  },
  Company: {
    cols: [
      [
        { icon: I.about,    title:"About",      desc:"Powering the crypto economy", to:"/"      },
        { icon: I.aff,      title:"Affiliates", desc:"Help introduce the world to crypto", to:"/" },
        { icon: I.blog,     title:"Blog",       desc:"Read the latest from Coinbase", to:"/"    },
      ],
      [
        { icon: I.careers,  title:"Careers",   desc:"Work with us",                   to:"/"    },
        { icon: I.support,  title:"Support",   desc:"Find answers to your questions", to:"/"    },
        { icon: I.security, title:"Security",  desc:"The most trusted & secure",      to:"/"    },
      ],
    ],
    featured: {
      img: <div style={{ background:"#0052FF", width:"60px", height:"60px", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:"10px", fontWeight:900, color:"white", textAlign:"center", lineHeight:1.2 }}>CRYPTO MOVES MONEY FORWARD</span></div>,
      title: "Learn all about Coinbase:",
      subtitle: "We're building the open financial system.",
      cta: "Create your account",
      ctaTo: "/signup",
    },
  },
};

const NAV_ITEMS = ["Individuals","Businesses","Institutions","Developers","Company"];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnter = (item) => {
    clearTimeout(timerRef.current);
    setOpen(item);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(null), 120);
  };

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    setUser(null);
    navigate("/");
  };

  const getInitials = (name) =>
    name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  const renderDropdown = (key) => {
    const d = DROPDOWNS[key];
    if (!d) return null;
    return (
      <div
        style={{ position:"absolute", top:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", background:"white", borderRadius:"16px", boxShadow:"0 8px 40px rgba(0,0,0,0.14)", border:"1px solid #e5e7eb", padding:"24px", minWidth:"680px", zIndex:100, display:"flex", gap:"32px" }}
        onMouseEnter={() => handleMouseEnter(key)}
        onMouseLeave={handleMouseLeave}>
        <div style={{ display:"flex", gap:"8px", flex:1 }}>
          <div style={{ flex:1 }}>
            {d.sectionTitle1 && (
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"8px", paddingLeft:"12px" }}>
                <span style={{ fontSize:"13px", fontWeight:700, color:"#111827" }}>{d.sectionTitle1}</span>
                {d.sectionTitle1 === "Coinbase Developer Platform" && <ArrowIcon/>}
              </div>
            )}
            {d.cols[0].map(item => <MenuItem key={item.title} {...item}/>)}
          </div>
          <div style={{ flex:1 }}>
            {d.sectionTitle2 && (
              <div style={{ paddingLeft:"12px", marginBottom:"8px" }}>
                <span style={{ fontSize:"13px", fontWeight:700, color:"#111827" }}>{d.sectionTitle2}</span>
              </div>
            )}
            {d.cols[1].map(item => <MenuItem key={item.title} {...item}/>)}
          </div>
        </div>
        {d.featured && (
          <div style={{ width:"240px", flexShrink:0, borderLeft:"1px solid #f3f4f6", paddingLeft:"24px" }}>
            <FeaturedCard {...d.featured}/>
          </div>
        )}
      </div>
    );
  };

  return (
    <header ref={ref} style={{ position:"sticky", top:0, zIndex:50, background:"white", borderBottom:"1px solid #e5e7eb" }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none", flexShrink:0 }}>
          <CoinbaseLogo/>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:"flex", alignItems:"center", gap:"0", position:"relative" }} className="hidden md:flex">
          <Link to="/explore"
            style={{ padding:"8px 14px", fontSize:"14px", fontWeight:500, color:"#111827", textDecoration:"none", borderRadius:"8px", whiteSpace:"nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
            Cryptocurrencies
          </Link>
          <Link to="/learn"
            style={{ padding:"8px 14px", fontSize:"14px", fontWeight:500, color:"#111827", textDecoration:"none", borderRadius:"8px", whiteSpace:"nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
            Learn
          </Link>
          {NAV_ITEMS.map(item => (
            <div key={item} style={{ position:"relative" }}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}>
              <button
                style={{ padding:"8px 14px", fontSize:"14px", fontWeight:500, color: open===item?"#0052FF":"#111827", background:"transparent", border:"none", cursor:"pointer", borderRadius:"8px", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"4px", whiteSpace:"nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
                onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                {item}
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ transition:"transform 0.2s", transform: open===item?"rotate(180deg)":"rotate(0deg)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {open === item && renderDropdown(item)}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }} className="hidden md:flex">
          <button style={{ width:"36px", height:"36px", borderRadius:"50%", border:"1px solid #e5e7eb", background:"white", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#374151" }}
            onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
            onMouseLeave={e => e.currentTarget.style.background="white"}>
            <SearchIcon/>
          </button>
          <button style={{ width:"36px", height:"36px", borderRadius:"50%", border:"1px solid #e5e7eb", background:"white", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#374151" }}
            onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
            onMouseLeave={e => e.currentTarget.style.background="white"}>
            <GlobeIcon/>
          </button>

          {/* ── AUTH BUTTONS — smart show/hide ── */}
          {authChecked && (
            user ? (
              // Logged in — show avatar + Profile link + Sign out
              <>
                <Link to="/profile"
                  style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 14px", borderRadius:"999px", border:"1px solid #e5e7eb", textDecoration:"none", background:"white", transition:"background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.background="white"}>
                  <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:"#0052FF", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:900, color:"white", flexShrink:0 }}>
                    {getInitials(user.name)}
                  </div>
                  <span style={{ fontSize:"13px", fontWeight:600, color:"#111827" }}>{user.name.split(" ")[0]}</span>
                </Link>
                <button onClick={handleLogout}
                  style={{ padding:"8px 20px", borderRadius:"999px", border:"1px solid #e5e7eb", background:"white", fontSize:"14px", fontWeight:600, color:"#374151", cursor:"pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#fef2f2"; e.currentTarget.style.color="#dc2626"; e.currentTarget.style.borderColor="#fecaca"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.color="#374151"; e.currentTarget.style.borderColor="#e5e7eb"; }}>
                  Sign out
                </button>
              </>
            ) : (
              // Logged out — show Sign in + Sign up
              <>
                <Link to="/signin"
                  style={{ padding:"8px 20px", borderRadius:"999px", border:"1px solid #e5e7eb", background:"white", fontSize:"14px", fontWeight:600, color:"#111827", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
                  onMouseLeave={e => e.currentTarget.style.background="white"}>
                  Sign in
                </Link>
                <Link to="/signup"
                  style={{ padding:"8px 20px", borderRadius:"999px", background:"#0052FF", fontSize:"14px", fontWeight:700, color:"white", textDecoration:"none" }}
                  onMouseEnter={e => e.currentTarget.style.background="#003ed4"}
                  onMouseLeave={e => e.currentTarget.style.background="#0052FF"}>
                  Sign up
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" style={{ padding:"8px", border:"none", background:"transparent", cursor:"pointer" }}
          onClick={() => setMobileOpen(v => !v)}>
          {mobileOpen
            ? <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background:"white", borderTop:"1px solid #e5e7eb", padding:"16px 24px 24px", display:"flex", flexDirection:"column", gap:"4px", maxHeight:"80vh", overflowY:"auto" }} className="md:hidden">
          {NAV_ITEMS.map(item => (
            <div key={item}>
              <button
                style={{ width:"100%", textAlign:"left", padding:"12px", fontSize:"15px", fontWeight:600, color:"#111827", background:"transparent", border:"none", cursor:"pointer", borderRadius:"8px" }}
                onClick={() => setOpen(open===item?null:item)}>
                {item}
              </button>
              {open===item && DROPDOWNS[item] && (
                <div style={{ paddingLeft:"12px", display:"flex", flexDirection:"column", gap:"2px" }}>
                  {[...DROPDOWNS[item].cols[0], ...DROPDOWNS[item].cols[1]].map(mi => (
                    <Link key={mi.title} to={mi.to} onClick={() => setMobileOpen(false)}
                      style={{ display:"flex", gap:"10px", alignItems:"center", padding:"8px 10px", borderRadius:"8px", textDecoration:"none" }}
                      onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                      <NavIcon>{mi.icon}</NavIcon>
                      <span style={{ fontSize:"13px", fontWeight:600, color:"#111827" }}>{mi.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ display:"flex", gap:"8px", marginTop:"16px", paddingTop:"16px", borderTop:"1px solid #e5e7eb" }}>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)}
                  style={{ flex:1, textAlign:"center", padding:"10px", borderRadius:"8px", border:"1px solid #e5e7eb", fontSize:"14px", fontWeight:600, color:"#111827", textDecoration:"none" }}>
                  Profile
                </Link>
                <button onClick={handleLogout}
                  style={{ flex:1, textAlign:"center", padding:"10px", borderRadius:"8px", background:"#fef2f2", border:"1px solid #fecaca", fontSize:"14px", fontWeight:600, color:"#dc2626", cursor:"pointer" }}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setMobileOpen(false)}
                  style={{ flex:1, textAlign:"center", padding:"10px", borderRadius:"8px", border:"1px solid #e5e7eb", fontSize:"14px", fontWeight:600, color:"#111827", textDecoration:"none" }}>
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}
                  style={{ flex:1, textAlign:"center", padding:"10px", borderRadius:"8px", background:"#0052FF", fontSize:"14px", fontWeight:700, color:"white", textDecoration:"none" }}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
