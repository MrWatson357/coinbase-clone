import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const CoinbaseLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-[380px] h-[380px] opacity-[0.03]">
    <circle cx="16" cy="16" r="16" fill="#0052FF"/>
    <path d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 21.5C12.96 21.5 10.5 19.04 10.5 16C10.5 12.96 12.96 10.5 16 10.5C19.04 10.5 21.5 12.96 21.5 16C21.5 19.04 19.04 21.5 16 21.5Z" fill="white"/>
  </svg>
);

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerUser(formData);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-sm p-8 overflow-hidden">

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <CoinbaseLogo/>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Start your crypto journey today.
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Full name</label>
              <input type="text" name="name" required onChange={handleChange} value={formData.name}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"/>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Email address</label>
              <input type="email" name="email" required onChange={handleChange} value={formData.email}
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"/>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative mt-1">
                <input type={showPassword ? "text" : "password"} name="password" required
                  onChange={handleChange} value={formData.password}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="At least 6 characters"/>
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-blue-600 font-semibold">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?
            <Link to="/signin" className="ml-1 text-blue-600 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
