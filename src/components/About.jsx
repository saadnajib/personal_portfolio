const skills = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'NumPy', 'Pandas', 'scikit-learn',
  'OpenVINO', 'C / C++ / C#', 'JavaScript', 'React', 'Git', 'Linux', 'SQL', 'Android',
];

export default function About() {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="section-wrap about-grid">
        <div className="about-copy">
          <p className="eyebrow reveal">LAYER 02 · EMBEDDING</p>
          <h2 id="about-title" className="split-heading reveal">Curious by default.<br /><span className="accent">Rigorous</span> by training.</h2>
          <p className="large-copy reveal">I'm Saad — a computer-science M.Sc. student at RPTU Kaiserslautern and former research assistant at DFKI, Germany's national AI research centre.</p>
          <p className="reveal">My path runs from a bachelor's final-year project that became a published paper, through production face-recognition systems at Aletheia AI, to research on 3D human understanding today. What connects it all is a fascination with how machines <em>perceive</em> — and the discipline to make it work outside a notebook.</p>
          <p className="reveal">Off the keyboard I've captained a departmental football team, organised university events, and raised funds for children's education. Good work, I've learned, is rarely a solo effort.</p>
          <dl className="facts reveal">
            <div><dt>Based in</dt><dd>Kaiserslautern, Germany</dd></div>
            <div><dt>Focus</dt><dd>Computer vision · 3D humans · ML systems</dd></div>
            <div><dt>Languages</dt><dd>English · Urdu · German (learning)</dd></div>
            <div><dt>Open to</dt><dd>ML / CV engineering &amp; research roles</dd></div>
          </dl>
        </div>
        <div className="about-visual reveal">
          <div className="sphere-wrap" id="sphere-wrap" role="img" aria-label="Interactive 3D sphere of skills: Python, PyTorch, OpenCV, deep learning and more">
            <div className="sphere" id="sphere"></div>
            <div className="sphere-core" aria-hidden="true"></div>
          </div>
          <p className="sphere-hint">drag to rotate · skills embedded in ℝ³</p>
          <div className="toolbox">
            <h3>Toolkit</h3>
            <div className="skill-tags">
              {skills.map(skill => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
