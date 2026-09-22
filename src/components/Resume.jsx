export default function Resume() {
  return (
    <section id="resume" className="section-wrap section-space resume-section" aria-labelledby="resume-title">
      <div className="resume-card reveal">
        <div className="resume-copy">
          <p className="eyebrow">LAYER 04 · CHECKPOINT</p>
          <h2 id="resume-title" className="split-heading">The <span className="accent">résumé</span>, exported.</h2>
          <p>Three pages. Education, experience, projects, publications and certifications — the full checkpoint file.</p>
          <div className="hero-actions">
            <button className="button primary magnetic" type="button" id="resume-view" data-label="view cv"><span>View in page</span><i aria-hidden="true">▢</i></button>
            <a className="button ghost magnetic" href="./Muhammad_Saad_Najib_CV.pdf" download="Muhammad_Saad_Najib_CV.pdf" data-label="download cv"><span>Download PDF</span><i aria-hidden="true">↓</i></a>
          </div>
          <code className="file-meta">Muhammad_Saad_Najib_CV.pdf · 194 KB · updated 2026</code>
        </div>
        <a className="resume-preview" href="./Muhammad_Saad_Najib_CV.pdf" target="_blank" rel="noopener" aria-label="Open résumé PDF in a new tab">
          <div className="paper"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div className="paper p2"></div>
          <div className="paper p3"></div>
          <span className="paper-tag">PDF · 3 pages</span>
        </a>
      </div>
    </section>
  );
}
