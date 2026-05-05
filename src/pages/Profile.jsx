import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        // Not authenticated — redirect to sign in
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
  try { await logoutUser(); } catch {}
  window.location.href = "/";
};
  const getInitials = (name) =>
    name ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?";

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" });

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"white" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:"48px", height:"48px", borderRadius:"50%", border:"3px solid #e5e7eb", borderTopColor:"#0052FF", margin:"0 auto 16px", animation:"spin 0.8s linear infinite" }}/>
          <p style={{ color:"#9ca3af", fontSize:"14px" }}>Loading your profile...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ minHeight:"100vh", background:"white" }}>

      {/* ── Header ── */}
      <div style={{ borderBottom:"1px solid #e5e7eb", background:"linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)", padding:"48px 24px 40px" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
            {/* Avatar */}
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:"linear-gradient(135deg,#0052FF,#1a3fa8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", fontWeight:900, color:"white", flexShrink:0 }}>
              {getInitials(user.name)}
            </div>
            <div>
              <h1 style={{ fontSize:"24px", fontWeight:900, color:"#111827", margin:"0 0 4px", letterSpacing:"-0.01em" }}>
                {user.name}
              </h1>
              <p style={{ fontSize:"14px", color:"#6b7280", margin:0 }}>{user.email}</p>
            </div>
          </div>

          <button onClick={handleLogout}
            style={{ padding:"10px 24px", borderRadius:"999px", border:"1.5px solid #e5e7eb", background:"white", fontSize:"13px", fontWeight:700, color:"#374151", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#f9fafb"; e.currentTarget.style.borderColor="#dc2626"; e.currentTarget.style.color="#dc2626"; }}
            onMouseLeave={e => { e.currentTarget.style.background="white"; e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.color="#374151"; }}>
            Sign out
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth:"800px", margin:"0 auto", padding:"40px 24px" }}>

        {/* Account info card */}
        <div style={{ border:"1px solid #e5e7eb", borderRadius:"20px", overflow:"hidden", marginBottom:"24px" }}>
          <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6", background:"#fafafa" }}>
            <h2 style={{ fontSize:"16px", fontWeight:800, color:"#111827", margin:0 }}>Account information</h2>
          </div>

          {[
            { label:"Full name",     value: user.name },
            { label:"Email address", value: user.email },
            { label:"Member since",  value: formatDate(user.createdAt) },
            { label:"Account ID",    value: user._id },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom: i < arr.length-1 ? "1px solid #f3f4f6" : "none", background:"white" }}>
              <p style={{ fontSize:"13px", fontWeight:600, color:"#6b7280", margin:0 }}>{row.label}</p>
              <p style={{ fontSize:"13px", fontWeight:600, color:"#111827", margin:0, maxWidth:"60%", textAlign:"right", wordBreak:"break-all" }}>{row.value}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ border:"1px solid #e5e7eb", borderRadius:"20px", overflow:"hidden", marginBottom:"24px" }}>
          <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6", background:"#fafafa" }}>
            <h2 style={{ fontSize:"16px", fontWeight:800, color:"#111827", margin:0 }}>Quick links</h2>
          </div>

          {[
            { label:"Explore markets", desc:"Browse all cryptocurrencies", to:"/explore", emoji:"📊" },
            { label:"Learn crypto",    desc:"Guides and tutorials",        to:"/learn",   emoji:"📚" },
          ].map((item, i, arr) => (
            <Link key={item.to} to={item.to}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom: i < arr.length-1 ? "1px solid #f3f4f6" : "none", background:"white", textDecoration:"none", transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background="white"}>
              <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                <span style={{ fontSize:"22px" }}>{item.emoji}</span>
                <div>
                  <p style={{ fontSize:"14px", fontWeight:700, color:"#111827", margin:0 }}>{item.label}</p>
                  <p style={{ fontSize:"12px", color:"#9ca3af", margin:0 }}>{item.desc}</p>
                </div>
              </div>
              <span style={{ color:"#9ca3af", fontSize:"18px" }}>›</span>
            </Link>
          ))}
        </div>

        {/* Security note */}
        <div style={{ background:"#f0f4ff", border:"1px solid #c7d7fe", borderRadius:"16px", padding:"20px 24px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
          <span style={{ fontSize:"20px", flexShrink:0 }}>🔒</span>
          <div>
            <p style={{ fontSize:"13px", fontWeight:700, color:"#1e40af", margin:"0 0 4px" }}>Your account is secure</p>
            <p style={{ fontSize:"12px", color:"#3b82f6", margin:0 }}>
              Your session is protected with JWT authentication and HTTP-only cookies.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
