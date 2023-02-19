import { useMemo } from "react";
import "./style.scss";

export default function AppHeader() {
  const links = useMemo(
    () => [
      { href: "/", text: "Home" },
      { href: "/contact", text: "Contact" },
      { href: "/about", text: "About" },
    ],
    []
  );

  return (
    <header className="header">
      <div className="logo-el">
        <span className="logo">DISROBE</span>
      </div>
      <nav className="header-nav">
        <ul className="nav-items">
          {links.map(({ text, href }) => (
            <li key={href}>
              <a href={href} className="nav-link">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
