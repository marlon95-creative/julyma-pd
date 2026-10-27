import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { company, telHref } from "../config.js";
import { useTheme } from "../theme.jsx";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ["/products", "Products"],
  ["/request-quote", "Request Quote"],
  ["/contact", "Contact"],
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {dark ? (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
        ) : (
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        )}
      </svg>
      <span className="toggle-label">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* <div className="topbar">
        <div className="container topbar-in">
          <a href={telHref(company.phones[0])}>{company.phones[0]}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <span className="topbar-tag">{company.tagline}</span>
        </div>
      </div> */}
      <header className="site-header">
        <div className="container bar">
          <Link to="/" className="brand" aria-label={`${company.name} home`}>
            <img src="/images/logo.png" alt={company.name} width="171" height="44" />
          </Link>

          <nav id="primary-nav" className={`nav ${open ? "open" : ""}`} aria-label="Main">
            <ul>
              {links.map(([to, label]) => (
                <li key={to}>
                  <NavLink to={to} end={to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="tools">
            <ThemeToggle />
            <button type="button" className="icon-btn menu-btn" aria-expanded={open} aria-controls="primary-nav"
              onClick={() => setOpen((o) => !o)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
