import { CircleDollarSign } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "https://hubcity.net" },
  { label: "Other Tools", href: "https://hubcity.net/businesstools.html" },
  { label: "Crypto Tools", href: "https://hubcity.net/cryptotools.html" },
  { label: "Contact Us", href: "https://hubcity.net/contacthubcity.html" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1 rounded-lg">
            <CircleDollarSign className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-slate-800">
            TIGOY.com | FeeEstimate
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
