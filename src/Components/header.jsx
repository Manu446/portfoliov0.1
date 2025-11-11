import { useState } from "react";

export default function Header() {
  const [isLight, setIsLight] = useState(false);

  const toggleTheme = () => {
    setIsLight(!isLight);
    document.body.classList.toggle("light");
  };

  return (
    <header>
      <div className="nav">
        <div className="brand">
          <img src="/assets/me.jpg" alt="Immanuel Obure" className="logo-img" />
          <div>
            <h1>Immanuel Obure</h1>
            <div className="muted" style={{ fontSize: "12px" }}>Web Developer</div>
          </div>
        </div>
        <nav aria-label="Primary">
          <ul>
            {["home","about","skills","projects","blog","contact"].map(section => (
              <li key={section}>
                <a href={`#${section}`} className="navlink">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="actions">
          <button onClick={toggleTheme} className="toggle">
            {isLight ? "🌞" : "🌙"}
          </button>
          <a className="btn" href="#projects">View Work</a>
        </div>
      </div>
    </header>
  );
}
