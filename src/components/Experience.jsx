import { useLang } from '../i18n.jsx';

const EPOCH_INDEX = [9, 5, 6, 3]; // which chart epoch each timeline item highlights

export default function Experience() {
  const { t } = useLang();
  const x = t.experience;
  return (
    <section id="experience" className="section-wrap section-space" aria-labelledby="experience-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">LAYER 03 · TRAINING LOG</p>
          <h2 id="experience-title" className="split-heading">{x.heading0}<span className="accent">{x.headingAccent}</span></h2>
        </div>
        <p className="section-note">{x.note0}<br />{x.note1}</p>
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
          <div className="train-legend"><span><i style={{ background: '#5ef2e0' }}></i>{x.legendLoss}</span><span><i style={{ background: '#ff5c7a' }}></i>{x.legendVal}</span></div>
          <div className="train-axis"><span>2016</span><span>2018</span><span>2020</span><span>2022</span><span>2024</span><span>2026</span></div>
        </div>
        <div className="train-log" id="train-log" aria-live="polite">
          <div className="log-header"><span id="log-epoch">epoch 10/10</span><span id="log-date">{t.effects.epochs[9].date}</span></div>
          <h3 id="log-title">{t.effects.epochs[9].title}</h3>
          <p id="log-body">{t.effects.epochs[9].body}</p>
          <div className="tags" id="log-tags">{t.effects.epochs[9].tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>

      <div className="journey">
        <ol className="timeline" id="timeline">
          {x.timeline.map((item, i) => (
            <li className="tl-item reveal" data-epoch={EPOCH_INDEX[i]} key={item.date}>
              <span className="tl-date">{item.date}</span>
              <div>
                <p className="company">{item.company}{item.companyNote && <span>{item.companyNote}</span>}</p>
                <h3>{item.role}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <aside className="edu-card reveal">
          <p className="eyebrow">ACADEMIC WEIGHTS</p>
          <div className="edu">
            <h3>{x.mscTitle}</h3>
            <p>{x.mscSchool}</p>
            <span className="edu-date">{x.mscDate}</span>
          </div>
          <hr />
          <div className="edu">
            <h3>{x.bscTitle}</h3>
            <p>{x.bscSchool}</p>
            <span className="edu-date">{x.bscDate0}<b>{x.bscDateB}</b></span>
          </div>
          <hr />
          <ul className="honors">
            <li><b>2021</b>{x.honor1a}<a className="inline-link" href="https://kjcis.kiet.edu.pk/index.php/kjcis" target="_blank" rel="noopener noreferrer" data-label="journal">{x.honor1journal}</a>{x.honor1b}<a className="inline-link" href="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" target="_blank" rel="noopener noreferrer" data-label="read paper">{x.honor1read}</a></li>
            <li><b>2020</b>{x.honor2}</li>
            <li><b>2020</b>{x.honor3}</li>
          </ul>
          <details className="certs">
            <summary>{x.certs} <span>7</span></summary>
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
