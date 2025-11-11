export default function About() {
  return (
    <section id="about" className="reveal">
      <div className="section-title"><h3>About</h3><div className="muted">— Who I am</div></div>
      <div className="grid about">
        <div className="card">
          <h4 style={{marginTop:0}}>Quick Bio</h4>
          <p className="bio">
            I'm a web developer passionate about building performant, accessible, and delightfully-animated interfaces. I specialise in front-end development and love bringing ideas from concept to production.
          </p>
          <div style={{marginTop:"12px"}}>
            <a className="btn" href="#contact">Let's talk</a>
            <a className="ghost" href="#projects">See work</a>
          </div>
        </div>

        <div>
          <h4>Experience & Education</h4>
          <ul className="muted">
            <li>Front-end Developer @Company (2022 — Present)</li>
            <li>UX Intern @Startup (2021 — 2022)</li>
            <li>BSc Computer Science — University</li>
          </ul>

          <div style={{marginTop:"18px"}}>
            <h4>Tooling & Workflow</h4>
            <p className="muted">HTML, CSS, JavaScript, Git, Webpack, Vite, Node, Accessibility, Testing</p>
          </div>
        </div>
      </div>
    </section>
  );
}
