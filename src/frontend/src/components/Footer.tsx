const NAV_LINKS = [
  { label: "Home", href: "https://hubcity.net" },
  { label: "Other Tools", href: "https://hubcity.net/businesstools.html" },
  { label: "Crypto Tools", href: "https://hubcity.net/cryptotools.html" },
  { label: "Contact Us", href: "https://hubcity.net/contacthubcity.html" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-indigo-600 transition-colors duration-200"
                data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-400 text-center">
            © 2025 TIGOY.com | Huncity.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
