export default function Experience() {
  return (
    <section id="experience" className="section-wrap section-space" aria-labelledby="experience-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">LAYER 03 · TRAINING LOG</p>
          <h2 id="experience-title" className="split-heading">Ten epochs of <span className="accent">learning</span></h2>
        </div>
        <p className="section-note">Every role is an epoch. The curve is my learning rate.<br />Hover or tap a point to read the log entry.</p>
      </div>

      <div className="train reveal">
        <div className="train-chart" id="train-chart">
          <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="g-area" x2="0" y2="1"><stop stopColor="#5ef2e0" stopOpacity=".28" /><stop offset="1" stopColor="#5ef2e0" stopOpacity="0" /></linearGradient>
            </defs>
            <g className="grid" stroke="rgba(255,255,255,.06)"><path d="M0 60h1000M0 130h1000M0 200h1000M0 270h1000M0 340h1000" /></g>
            <path id="train-area" fill="url(#g-area)" d="" />
            <path id="train-line" fill="none" stroke="#5ef2e0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="" />
            <path id="train-val" fill="none" stroke="#ff5c7a" strokeWidth="1.5" strokeDasharray="6 6" d="" />
          </svg>
          <div className="train-points" id="train-points"></div>
          <div className="train-legend"><span><i style={{ background: '#5ef2e0' }}></i>loss (skills)</span><span><i style={{ background: '#ff5c7a' }}></i>val_loss (impact)</span></div>
          <div className="train-axis"><span>2016</span><span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span></div>
        </div>
        <div className="train-log" id="train-log" aria-live="polite">
          <div className="log-header"><span id="log-epoch">epoch 10/10</span><span id="log-date">Oct 2022 — Sep 2023</span></div>
          <h3 id="log-title">Research Assistant — DFKI</h3>
          <p id="log-body">Deutsches Forschungszentrum für Künstliche Intelligenz. Machine-learning pipelines, semantic datatype checking and dataset generation; built predictive models on large datasets to improve decision-making.</p>
          <div className="tags" id="log-tags"><span>ML pipelines</span><span>Large datasets</span><span>Research</span></div>
        </div>
      </div>

      <div className="journey">
        <ol className="timeline" id="timeline">
          <li className="tl-item reveal" data-epoch="9">
            <span className="tl-date">OCT 2022 — SEP 2023</span>
            <div><p className="company">DFKI <span>· German Research Center for Artificial Intelligence</span></p><h3>Research Assistant</h3><p>Machine-learning pipelines, semantic datatype checking and dataset generation. Worked with large datasets to build predictive models that enhanced decision-making processes.</p></div>
          </li>
          <li className="tl-item reveal" data-epoch="5">
            <span className="tl-date">NOV 2020 — MAR 2022</span>
            <div><p className="company">Aletheia AI</p><h3>Machine Learning Engineer</h3><p>Joined as a system-deployment intern; promoted within months to a full-time role in product development. Core contributor to the facial-recognition pipeline.</p></div>
          </li>
          <li className="tl-item reveal" data-epoch="6">
            <span className="tl-date">DEC 2020 — FEB 2021</span>
            <div><p className="company">Amal Academy <span>· Stanford-funded fellowship</span></p><h3>Career Prep Fellow</h3><p>Selected from 4,500+ applicants for a 150-hour programme in leadership, communication and problem-solving.</p></div>
          </li>
          <li className="tl-item reveal" data-epoch="3">
            <span className="tl-date">2016 — 2020</span>
            <div><p className="company">Early internships</p><h3>AI · Web · IT</h3><p>Digital Landscape (AI intern — built a face-recognition system), Interns Pakistan (front-end), Pakistan Civil Aviation Authority (ASP.NET) and Pakistan Television (IT).</p></div>
          </li>
        </ol>

        <aside className="edu-card reveal">
          <p className="eyebrow">ACADEMIC WEIGHTS</p>
          <div className="edu">
            <h3>M.Sc. Computer Science</h3>
            <p>RPTU Rheinland-Pfälzische Technische Universität Kaiserslautern-Landau</p>
            <span className="edu-date">2022 — 2026 · thesis in progress</span>
          </div>
          <hr />
          <div className="edu">
            <h3>B.Sc. Computer Science</h3>
            <p>Usman Institute of Technology · affiliated with NED University of Engineering &amp; Technology</p>
            <span className="edu-date">2016 — 2020 · <b>4th in department</b></span>
          </div>
          <hr />
          <ul className="honors">
            <li><b>2021</b> Paper published — <a className="inline-link" href="https://kjcis.kiet.edu.pk/index.php/kjcis" target="_blank" rel="noopener noreferrer" data-label="journal">KIET Journal of Computing &amp; Information Sciences</a> (HEC 'Y') · <a className="inline-link" href="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" target="_blank" rel="noopener noreferrer" data-label="read paper">Read the article ↗</a></li>
            <li><b>2020</b> GitHub Arctic Code Vault contributor</li>
            <li><b>2020</b> Amal Career Prep Fellowship (Stanford-funded)</li>
          </ul>
          <details className="certs">
            <summary>Certifications <span>7</span></summary>
            <ul>
              <li>Neural Networks &amp; Deep Learning — Coursera</li>
              <li>Improving Deep Neural Networks — Coursera</li>
              <li>Intro to Front-end Development with ReactJS — Coursera</li>
              <li>Machine Learning Crash Course — Google</li>
              <li>Deep Learning with PyTorch: 60-Minute Blitz — PyTorch</li>
              <li>AI Foundations: Machine Learning — LinkedIn</li>
              <li>Introduction to Data Science — Cognitive Class</li>
            </ul>
          </details>
        </aside>
      </div>
    </section>
  );
}
