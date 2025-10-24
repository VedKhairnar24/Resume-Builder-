import React from 'react';
import ResumeSampleCard from '../components/ResumeSampleCard';
import TemplateCarousel from '../components/TemplateCarousel';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Build Your Winning Resume in Minutes</h1>
            <p className="sub">
              Professional templates, instant editing, and one-click PDF export — get noticed by top employers.
            </p>
            <a className="cta-btn" href="/create-resume">Create Resume Now</a>
            <div className="trust">
              <span>Free • Privacy-first • No watermark</span>
            </div>
          </div>
          <div className="hero-preview">
            <ResumeSampleCard highlight />
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container-grid">
          <div className="feature">
            <svg className="icon" viewBox="0 0 24 24"><path d="M12 2L15 8l6 .5-4.5 3.5L18 20l-6-3.5L6 20l1.5-8L3 8.5 9 8z" /></svg>
            <h3>Modern Templates</h3>
            <p>Stunning, recruiter-friendly designs optimized for ATS.</p>
          </div>
          <div className="feature">
            <svg className="icon" viewBox="0 0 24 24"><path d="M3 3h18v4H3zM3 9h12v12H3z" /></svg>
            <h3>Easy Editor</h3>
            <p>Edit sections inline — everything autosaves as you type.</p>
          </div>
          <div className="feature">
            <svg className="icon" viewBox="0 0 24 24"><path d="M12 2v10l3-3 5 7H4l5-7 3 3V2z" /></svg>
            <h3>Export to PDF</h3>
            <p>High-quality PDF exports without watermarks.</p>
          </div>
        </div>
      </section>

      <section className="templates">
        <div className="section-head">
          <h2>Popular Resume Templates</h2>
          <p>Browse templates and open a larger preview.</p>
        </div>
        <TemplateCarousel />
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Fill the form:</strong> Add your info in guided sections.</li>
          <li><strong>Choose a template:</strong> Preview and pick the best design.</li>
          <li><strong>Download PDF:</strong> Export and apply to jobs instantly.</li>
        </ol>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="test-grid">
          <div className="test-card">
            <img alt="avatar" src="/assets/avatar1.jpg" />
            <blockquote>
              "I landed my dream role in 3 weeks. Clean, fast, and effective." — Priya S.
            </blockquote>
          </div>
          <div className="test-card">
            <img alt="avatar" src="/assets/avatar2.jpg" />
            <blockquote>
              "The templates are recruiter-ready — huge confidence boost." — Daniel R.
            </blockquote>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>© 2025 Resume Builder</div>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;