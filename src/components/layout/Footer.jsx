import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Company",
    links: ["About", "Careers", "Affiliates", "Blog", "Press", "Security"],
  },
  {
    title: "Learn",
    links: [
      "Explore",
      "Market statistics",
      "Crypto basics",
      "Tips & tutorials",
      "What is Bitcoin?",
    ],
  },
  {
    title: "Developers",
    links: [
      "Developer platform",
      "API docs",
      "Wallets",
      "Exchange API",
    ],
  },
  {
    title: "Support",
    links: [
      "Help center",
      "Contact us",
      "Account access",
      "Supported crypto",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Coinbase Clone. Not affiliated with Coinbase.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-gray-500">

            {/* X (Twitter) */}
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2H21.5l-7.59 8.67L23 22h-7.06l-5.52-7.24L3.8 22H.5l8.13-9.29L0 2h7.18l5.02 6.61L18.244 2z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm5 5.5A4.5 4.5 0 1112 17a4.5 4.5 0 010-9.5zm6.5-.75a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 3a2 2 0 100 4 2 2 0 000-4zm1 6H3v12h2V9zm4 0h-2v12h2v-6c0-2 3-2.2 3 0v6h2v-7c0-4-4-3.8-5-1.9V9z" />
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8s-.2-1.4-.8-2a2.9 2.9 0 00-2-1C16.8 4.5 12 4.5 12 4.5h0s-4.8 0-7 .5a2.9 2.9 0 00-2 1C2.4 6.6 2.2 8 2.2 8S2 9.6 2 11.3v1.4C2 14.4 2.2 16 2.2 16s.2 1.4.8 2a2.9 2.9 0 002 1c2.2.5 7 .5 7 .5s4.8 0 7-.5a2.9 2.9 0 002-1c.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.4C22 9.6 21.8 8 21.8 8zM10 14.5v-5l5 2.5-5 2.5z" />
              </svg>
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
}