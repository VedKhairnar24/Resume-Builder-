import React, { useState } from 'react';
import ResumeSampleCard from './ResumeSampleCard';
import '../styles/Home.css';

const templates = [
  { id: 1, name: 'Modern', accent: '#0b74ff' },
  { id: 2, name: 'Minimal', accent: '#ff7a59' },
  { id: 3, name: 'Professional', accent: '#00b894' }
];

const TemplatePreview = ({ tpl, onClick }) => (
  <button className="tpl-thumb" onClick={() => onClick(tpl)}>
    <div className="tpl-header" style={{ background: tpl.accent }} />
    <div className="tpl-body">
      <h4>{tpl.name}</h4>
      <p className="muted">One-column, ATS friendly</p>
    </div>
  </button>
);

const TemplateCarousel = () => {
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(null);

  const next = () => setIndex((i) => (i + 1) % templates.length);
  const prev = () => setIndex((i) => (i - 1 + templates.length) % templates.length);

  return (
    <div className="carousel">
      <div className="carousel-controls">
        <button onClick={prev} aria-label="previous">‹</button>
        <div className="carousel-track">
          {templates.map((tpl, i) => (
            <div key={tpl.id} className={`carousel-item ${i === index ? 'active' : ''}`}>
              <TemplatePreview tpl={tpl} onClick={setModal} />
            </div>
          ))}
        </div>
        <button onClick={next} aria-label="next">›</button>
      </div>

      <div className="tpl-thumbs">
        {templates.map((t) => (
          <TemplatePreview key={t.id} tpl={t} onClick={setModal} />
        ))}
      </div>

      {modal && (
        <div className="modal" role="dialog" onClick={() => setModal(null)}>
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{modal.name} Template Preview</h3>
              <button onClick={() => setModal(null)}>Close</button>
            </div>
            <div className="modal-preview">
              {/* Simple live rendering of same sample but could be replaced with template-specific layout */}
              <div style={{ borderLeft: `6px solid ${modal.accent}` }}>
                <ResumeSampleCard />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCarousel;