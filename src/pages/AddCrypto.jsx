import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCrypto } from "../services/api";

export default function AddCrypto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", symbol: "", price: "", change: "", image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await addCrypto({
        ...formData,
        price:  parseFloat(formData.price),
        change: parseFloat(formData.change),
      });
      setSuccess(`${formData.name} (${formData.symbol.toUpperCase()}) added successfully!`);
      setTimeout(() => navigate("/explore"), 1500);
      setFormData({ name: "", symbol: "", price: "", change: "", image: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"white" }}>

      {/* Header */}
      <div style={{ borderBottom:"1px solid #e5e7eb", padding:"32px 24px", background:"linear-gradient(180deg,#f0f4ff 0%,#ffffff 100%)" }}>
        <div style={{ maxWidth:"600px", margin:"0 auto" }}>
          <Link to="/explore" style={{ fontSize:"13px", color:"#6b7280", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"6px", marginBottom:"16px" }}
            onMouseEnter={e => e.currentTarget.style.color="#0052FF"}
            onMouseLeave={e => e.currentTarget.style.color="#6b7280"}>
            ← Back to Explore
          </Link>
          <h1 style={{ fontSize:"28px", fontWeight:900, color:"#111827", margin:"0 0 6px", letterSpacing:"-0.02em" }}>
            Add a cryptocurrency
          </h1>
          <p style={{ fontSize:"14px", color:"#6b7280", margin:0 }}>
            New listing will be saved to the database and appear on the explore page.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth:"600px", margin:"0 auto", padding:"40px 24px" }}>

        {/* Success */}
        {success && (
          <div style={{ marginBottom:"24px", padding:"16px 20px", borderRadius:"14px", background:"#f0fdf4", border:"1px solid #bbf7d0", display:"flex", alignItems:"center", gap:"12px" }}>
            <span style={{ fontSize:"20px" }}>✅</span>
            <p style={{ fontSize:"14px", fontWeight:600, color:"#15803d", margin:0 }}>{success}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginBottom:"24px", padding:"16px 20px", borderRadius:"14px", background:"#fef2f2", border:"1px solid #fecaca", display:"flex", alignItems:"center", gap:"12px" }}>
            <span style={{ fontSize:"20px" }}>❌</span>
            <p style={{ fontSize:"14px", fontWeight:600, color:"#dc2626", margin:0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

            {/* Name */}
            <div>
              <label style={{ display:"block", fontSize:"13px", fontWeight:700, color:"#374151", marginBottom:"8px" }}>
                Coin name <span style={{ color:"#dc2626" }}>*</span>
              </label>
              <input name="name" required value={formData.name} onChange={handleChange}
                placeholder="e.g. Bitcoin"
                style={{ width:"100%", padding:"12px 16px", borderRadius:"12px", border:"1.5px solid #e5e7eb", fontSize:"14px", color:"#111827", background:"#f9fafb", outline:"none", boxSizing:"border-box" }}
                onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
              />
            </div>

            {/* Symbol */}
            <div>
              <label style={{ display:"block", fontSize:"13px", fontWeight:700, color:"#374151", marginBottom:"8px" }}>
                Ticker symbol <span style={{ color:"#dc2626" }}>*</span>
              </label>
              <input name="symbol" required value={formData.symbol} onChange={handleChange}
                placeholder="e.g. BTC"
                style={{ width:"100%", padding:"12px 16px", borderRadius:"12px", border:"1.5px solid #e5e7eb", fontSize:"14px", color:"#111827", background:"#f9fafb", outline:"none", boxSizing:"border-box", textTransform:"uppercase" }}
                onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
              />
            </div>

            {/* Price + Change side by side */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              <div>
                <label style={{ display:"block", fontSize:"13px", fontWeight:700, color:"#374151", marginBottom:"8px" }}>
                  Price (USD) <span style={{ color:"#dc2626" }}>*</span>
                </label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"14px", color:"#9ca3af", fontWeight:600 }}>$</span>
                  <input name="price" type="number" step="any" required value={formData.price} onChange={handleChange}
                    placeholder="0.00"
                    style={{ width:"100%", padding:"12px 16px 12px 28px", borderRadius:"12px", border:"1.5px solid #e5e7eb", fontSize:"14px", color:"#111827", background:"#f9fafb", outline:"none", boxSizing:"border-box" }}
                    onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                    onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display:"block", fontSize:"13px", fontWeight:700, color:"#374151", marginBottom:"8px" }}>
                  24h Change (%) <span style={{ color:"#dc2626" }}>*</span>
                </label>
                <div style={{ position:"relative" }}>
                  <input name="change" type="number" step="any" required value={formData.change} onChange={handleChange}
                    placeholder="e.g. +2.5 or -1.3"
                    style={{ width:"100%", padding:"12px 16px 12px 16px", borderRadius:"12px", border:"1.5px solid #e5e7eb", fontSize:"14px", color:"#111827", background:"#f9fafb", outline:"none", boxSizing:"border-box" }}
                    onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                    onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
                  />
                  <span style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", color:"#9ca3af" }}>%</span>
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label style={{ display:"block", fontSize:"13px", fontWeight:700, color:"#374151", marginBottom:"8px" }}>
                Image URL <span style={{ fontSize:"11px", fontWeight:500, color:"#9ca3af" }}>(optional)</span>
              </label>
              <input name="image" type="url" value={formData.image} onChange={handleChange}
                placeholder="https://example.com/coin-logo.png"
                style={{ width:"100%", padding:"12px 16px", borderRadius:"12px", border:"1.5px solid #e5e7eb", fontSize:"14px", color:"#111827", background:"#f9fafb", outline:"none", boxSizing:"border-box" }}
                onFocus={e => { e.target.style.borderColor="#0052FF"; e.target.style.background="white"; }}
                onBlur={e => { e.target.style.borderColor="#e5e7eb"; e.target.style.background="#f9fafb"; }}
              />
              {/* Image preview */}
              {formData.image && (
                <div style={{ marginTop:"10px", display:"flex", alignItems:"center", gap:"10px" }}>
                  <img src={formData.image} alt="preview"
                    style={{ width:"36px", height:"36px", borderRadius:"50%", border:"1px solid #e5e7eb", objectFit:"cover" }}
                    onError={e => e.target.style.display="none"}
                  />
                  <span style={{ fontSize:"12px", color:"#6b7280" }}>Image preview</span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ height:"1px", background:"#f3f4f6" }}/>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{ width:"100%", padding:"14px", borderRadius:"999px", background: loading?"#93c5fd":"#0052FF", color:"white", fontSize:"15px", fontWeight:700, border:"none", cursor: loading?"not-allowed":"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background="#003ed4"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background="#0052FF"; }}>
              {loading ? "Adding to database..." : "Add cryptocurrency"}
            </button>

            <p style={{ textAlign:"center", fontSize:"12px", color:"#9ca3af", margin:0 }}>
              Data will be stored in MongoDB and available via the API
            </p>

          </div>
        </form>
      </div>
    </div>
  );
}