import { useLang } from '../i18n.jsx';

const skills = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'scikit-learn',
  'OpenVINO', 'C / C++ / C#', 'JavaScript', 'React', 'Git', 'Linux', 'SQL', 'Android',
];

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="section-wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow reveal">LAYER 02 · EMBEDDING</p>
          <h2 id="about-title" className="split-heading reveal">{t.about.heading0}<br /><span className="accent">{t.about.headingAccent}</span>{t.about.heading1}</h2>
          <p className="large-copy reveal">{t.about.large}</p>
          <p className="reveal">{t.about.p1a}<em>{t.about.perceive}</em>{t.about.p1b}</p>
          <p className="reveal">{t.about.p2}</p>
          <dl className="facts reveal">
            {t.about.facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="about-visual reveal">
          <div className="sphere-wrap" id="sphere-wrap" role="img" aria-label={t.about.sphereAria}>
            <div className="sphere" id="sphere"></div>
            <div className="sphere-core" aria-hidden="true"></div>
          </div>
          <p className="sphere-hint">{t.about.sphereHint}</p>
          <div className="toolbox">
            <h3>{t.about.toolkit}</h3>
            <div className="skill-tags">
              {skills.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
