import { useEffect, useState } from "react";

const username = "manu446"; // your GitHub username
const projectTags = {
  "project-alpha": ["JavaScript", "Realtime"],
  "design-system": ["CSS", "Accessibility"],
  "e-commerce": ["Performance", "SEO"]
};

export default function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`)
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects" className="reveal">
      <div className="section-title">
        <h3>Projects</h3>
        <div className="muted">— Selected work from GitHub</div>
      </div>
      <div className="grid projects-grid">
        {repos.map(repo => {
          const tags = projectTags[repo.name.toLowerCase().replace(/\s+/g,"-")] || ["Code"];
          return (
            <article key={repo.id} className="project">
              <div className="meta">
                <strong>{repo.name}</strong>
                <div className="muted">{new Date(repo.updated_at).getFullYear()}</div>
              </div>
              <div className="preview">{repo.description || "No description provided."}</div>
              <div style={{marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div className="tags">{tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div>
                <a className="ghost" href={repo.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
