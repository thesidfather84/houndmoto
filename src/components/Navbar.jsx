import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Search" },
    { to: "/dtc", label: "DTC Lookup" },
    { to: "/diagnostic-assistant", label: "Diagnostic Assistant" },
    { to: "/parts/search", label: "Parts Hunter" },
    { to: "/right-to-repair", label: "Right to Repair" },
  ];

  return (
    <header className="navbar">
      <div className="navInner">
        <Link to="/" className="navBrand" onClick={() => setOpen(false)}>HoundMoto</Link>

        {/* Desktop nav */}
        <nav className="navDesktop">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`navLink${pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to.split("/")[1] ? `/${l.to.split("/")[1]}` : l.to)) ? " navLinkActive" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="navHamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`navHamLine${open ? " navHamLineOpen" : ""}`} />
          <span className={`navHamLine${open ? " navHamLineOpen" : ""}`} />
          <span className={`navHamLine${open ? " navHamLineOpen" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="navMobileMenu">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="navMobileLink"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
