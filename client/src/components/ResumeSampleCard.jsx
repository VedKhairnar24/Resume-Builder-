import React from 'react';
import '../styles/Home.css';

const ResumeSampleCard = ({ highlight = false }) => {
  return (
    <article className={`resume-card ${highlight ? 'highlight' : ''}`}>
      <header className="rc-header">
        <div>
          <h2>Arjun Mehta</h2>
          <p className="muted">Software Engineer</p>
        </div>
        <div className="contact">
          <div>arjun.mehta@email.com</div>
          <div>+91 98765 43210</div>
        </div>
      </header>

      <section>
        <h3>Experience</h3>
        <div className="rc-item">
          <strong>Frontend Developer</strong> — PixelCorp <span className="muted">2023–2025</span>
          <p>Built dynamic dashboards using React, TypeScript and Redux. Improved load time by 30%.</p>
        </div>
      </section>

      <section>
        <h3>Education</h3>
        <div className="rc-item">
          <strong>B.Tech, Computer Science</strong> — IIT Bombay <span className="muted">2019–2023</span>
        </div>
      </section>

      <section>
        <h3>Skills</h3>
        <div className="skills">React · Node.js · TypeScript · MongoDB · Figma</div>
      </section>
    </article>
  );
};

export default ResumeSampleCard;