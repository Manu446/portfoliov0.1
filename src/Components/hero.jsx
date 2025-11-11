import { useEffect, useState } from "react";

export default function Hero() {
  const phrases = [
    "I build modern web experiences.",
    "Performance-first interfaces.",
    "Accessible, animated UIs."
  ];
  const [text, setText] = useState(phrases[0]);
  const [pIndex, setPIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = charIndex;
      let p = pIndex;

      if (forward) {
        i++;
        if (i === phrases[p].length) {
          setForward(false);
          setTimeout(() => setCharIndex(i), 1200);
        } else setCharIndex(i);
      } else {
        i--;
        if (i === 0) {
          setForward(true);
          setPIndex((p + 1) % phrases.length);
        }
        setCharIndex(i);
      }
      setText(phrases[p].slice(0, i));
    }, 60 + Math.random() * 30);

    return () => clearTimeout(timeout);
  }, [charIndex, forward, pIndex]);

  return (
    <section className="hero">
      <div className="hero-left">
        <h2 className="reveal">Hi — I'm <span style={{color: "var(--primary)"}}>Immanuel Obure</span></h2>
        <div className="typewriter reveal">{text}</div>
        <p className="lead reveal">
          Front-end web developer focused on performant interfaces, delightful animations, and scalable architecture. I build clean, accessible sites and apps.
        </p>
        <div className="hero-cta reveal">
          <a className="btn" href="#contact">Hire me</a>
          <a className="ghost" href="resume.pdf" download>Download Resume</a>
        </div>
      </div>

      <aside className="hero-right card reveal">
        <div className="profile">
          <img src="/assets/me.jpg" alt="Immanuel Obure" className="logo-img" />
          <div>
            <h3>Immanuel Obure</h3>
            <div className="muted">Full-stack | React & Vanilla JS</div>
            <small className="muted" style={{marginTop:"8px"}}>Based in Nairobi City — Open to remote</small>
          </div>
        </div>
        <div style={{marginTop:"16px", display:"flex", gap:"8px", flexWrap:"wrap"}}>
          <div className="tag">Available</div>
          <div className="tag">Open-source</div>
          <div className="tag">Mentor</div>
        </div>
      </aside>
    </section>
  );
}
