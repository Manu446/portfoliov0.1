export default function Contact() {

  const copyEmail = () => {
    navigator.clipboard.writeText("immanuelobure446@gmail.com");
    alert("Email copied to clipboard!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted (demo)!");
  };

  return (
    <section id="contact" className="reveal">
      <div className="section-title">
        <h3>Contact</h3>
        <div className="muted">— Let's build something</div>
      </div>
      <div className="grid contact-grid">
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message" required></textarea>
            <div style={{ display:"flex", gap:"8px" }}>
              <button type="submit" className="btn">Send</button>
              <button type="button" className="ghost" onClick={copyEmail}>Copy email</button>
            </div>
          </form>
        </div>
        <aside className="card">
          <h4>Get in touch</h4>
          <p className="muted">Email: <a href="mailto:immanuelobure446@gmail.com">immanuelobure446@gmail.com</a></p>
          <p className="muted">Follow me on social media for updates and demos.</p>
          <div style={{display:"flex", gap:"12px", marginTop:"12px", alignItems:"center"}}>
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" title="GitHub">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.334-5.467-5.933 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404 11.49 11.49 0 013.003.404c2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.242 2.873.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.63-5.48 5.922.43.37.823 1.096.823 2.21 0 1.596-.015 2.885-.015 3.276 0 .322.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noreferrer" title="Twitter">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .39.044.765.127 1.124C7.728 8.087 4.1 6.13 1.671 3.149c-.427.733-.666 1.584-.666 2.49 0 1.72.875 3.236 2.202 4.127-.812-.026-1.574-.249-2.24-.616v.062c0 2.404 1.71 4.404 3.977 4.854-.417.113-.855.173-1.307.173-.32 0-.632-.03-.935-.086.633 1.977 2.466 3.415 4.637 3.454-1.697 1.33-3.832 2.123-6.155 2.123-.4 0-.793-.023-1.182-.07 2.191 1.404 4.797 2.224 7.604 2.224 9.124 0 14.11-7.552 14.11-14.11 0-.215-.005-.428-.014-.64.968-.699 1.807-1.57 2.466-2.565z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" title="LinkedIn">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.728v20.544C0 23.226.792 24 1.77 24h20.46C23.208 24 24 23.226 24 22.272V1.728C24 .774 23.208 0 22.23 0zM7.12 20.452H3.556V9h3.564v11.452zM5.34 7.578c-1.144 0-2.07-.927-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.144 0 2.07.927 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zm15.112 12.874h-3.562v-5.804c0-1.384-.027-3.164-1.928-3.164-1.928 0-2.222 1.504-2.222 3.06v5.908H9.312V9h3.422v1.561h.048c.476-.9 1.637-1.846 3.37-1.846 3.6 0 4.267 2.37 4.267 5.455v6.282z"/>
              </svg>
            </a>
            <a href="https://wa.me/254712345678" target="_blank" rel="noreferrer" title="WhatsApp">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 0 5.37 0 12a11.94 11.94 0 001.69 6.03L0 24l6.13-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.26-6.21-3.48-8.52zM12 21c-1.73 0-3.44-.45-4.94-1.3l-.35-.21-3.64.96.97-3.55-.22-.36A9.967 9.967 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.06-7.56c-.25-.12-1.48-.73-1.71-.82-.23-.09-.4-.12-.57.12-.17.25-.67.82-.82.99-.15.17-.31.19-.57.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.42.09-.17.05-.31-.02-.43-.07-.12-.57-1.38-.78-1.88-.2-.49-.41-.42-.57-.43-.15-.01-.32-.01-.5-.01-.17 0-.44.06-.67.31s-.88.86-.88 2.1c0 1.23.9 2.42 1.02 2.58.12.17 1.77 2.7 4.29 3.78.6.26 1.07.42 1.44.54.6.19 1.14.16 1.57.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.17-.48-.29z"/>
              </svg>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
