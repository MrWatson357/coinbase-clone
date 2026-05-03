// Central API service — all backend calls go through here
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include", // sends HTTP-only cookie automatically
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// ── Auth ──
export const registerUser = (body) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(body) });

export const loginUser = (body) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(body) });

export const logoutUser = () =>
  request("/auth/logout", { method: "POST" });

// ── User ──
export const getProfile = () => request("/user/profile");

// ── Crypto ──
export const getAllCryptos = () => request("/crypto");
export const getGainers    = () => request("/crypto/gainers");
export const getNewListings = () => request("/crypto/new");
export const addCrypto = (body) =>
  request("/crypto", { method: "POST", body: JSON.stringify(body) });
