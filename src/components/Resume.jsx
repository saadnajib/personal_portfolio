import { useLang } from '../i18n.jsx';

export default function Resume() {
  const { t } = useLang();
  return (
    <section id="resume" className="section-wrap section-space resume-section" aria-labelledby="resume-title">
      <div className="resume-card reveal">
        <div className="resume-copy">
          <p className="eyebrow">LAYER 04 · CHECKPOINT</p>
          <h2 id="resume-title" className="split-heading">{t.resume.heading0}<span className="accent">{t.resume.headingAccent}</span>{t.resume.heading1}</h2>
          <p>{t.resume.body}</p>
          <div className="hero-actions">
            <button className="button primary magnetic" type="button" id="resume-view" data-label="view cv"><span>{t.resume.view}</span><i aria-hidden="true">▢</i></button>
            <a className="button ghost magnetic" href="./Muhammad_Saad_Najib_CV.pdf" download="Muhammad_Saad_Najib_CV.pdf" data-label="download cv"><span>{t.resume.download}</span><i aria-hidden="true">↓</i></a>
          </div>
          <code className="file-meta">Muhammad_Saad_Najib_CV.pdf · 194 KB · 2026</code>
        </div>
        <a className="resume-preview" href="./Muhammad_Saad_Najib_CV.pdf" target="_blank" rel="noopener" aria-label={t.resume.previewAria}>
          <div className="paper"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div className="paper p2"></div>
          <div className="paper p3"></div>
          <span className="paper-tag">{t.resume.pages}</span>
        </a>
      </div>
    </section>
  );
}
