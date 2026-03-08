import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const CoinbaseLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path
      d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 21.5C12.96 21.5 10.5 19.04 10.5 16C10.5 12.96 12.96 10.5 16 10.5C19.04 10.5 21.5 12.96 21.5 16C21.5 19.04 19.04 21.5 16 21.5Z"
      fill="white"
    />
  </svg>
);

const navLinks = [
  { label: "Home",    to: "/"        },
  { label: "Explore", to: "/explore" },
  { label: "Learn", to: "/learn" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition ${
      isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50 hover:text-black"
    }`;

 return (
  <header className="sticky top-6 z-50">
    <div className="mx-auto max-w-6xl px-4">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200">

        {/* Top Row */}
        <div className="flex h-16 items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <CoinbaseLogo />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              coinbase
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="flex items-center gap-4">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
<div className="flex items-center gap-3">            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `text-sm font-semibold transition ${
                  isActive ? "text-black" : "text-gray-700 hover:text-black"
                }`
              }
            >
              Sign in
            </NavLink>

            <Link
              to="/signup"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Get started
            </Link>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden rounded-lg border px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t py-3 px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}

              <div className="mt-3 flex gap-3">
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-900 hover:bg-gray-200 transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  </header>
);
}