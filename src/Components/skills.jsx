import { useEffect } from "react";

export default function Skills() {
  useEffect(() => {
    document.querySelectorAll('.bar').forEach((bar, i) => {
      const val = bar.dataset.value || 60;
      const inner = bar.querySelector('i');
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setTimeout(() => inner.style.width = val+'%', i*200);
      }, {threshold:0.3});
      obs.observe(bar);
    });
  }, []);

  const skills = [
    { name: "JavaScript", value: 90, desc: "ES6+, DOM, Patterns" },
    { name: "HTML & CSS", value: 95, desc: "Responsive, Semantics, Animations" },
    { name: "React", value: 80, desc: "Hooks, State Management" },
    { name: "Node & Tooling", value: 75, desc: "Build tools, APIs" }
  ];

  return (
    <section id="skills" className="reveal">
      <div className="section-title"><h3>Skills</h3><div className="muted">— What I use</div></div>
      <div className="grid skills-grid">
        {skills.map(skill => (
          <div key={skill.name} className="skill card">
            <h4>{skill.name}</h4>
            <div className="bar" data-value={skill.value}><i></i></div>
            <div className="muted" style={{marginTop:"8px"}}>{skill.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
