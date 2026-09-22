import { useLang } from '../i18n.jsx';

const Tags = ({ tags }) => tags ? (
  <div className="tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
) : null;

export default function Work() {
  const { t } = useLang();
  const c = t.work.cards;
  return (
    <section id="work" className="section-wrap section-space" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">LAYER 01 · FEATURE EXTRACTION</p>
          <h2 id="work-title" className="split-heading">{t.work.heading0}<span className="accent">{t.work.headingAccent}</span></h2>
        </div>
        <p className="section-note">{t.work.note0}<br />{t.work.note1}</p>
      </div>

      <div className="bento">
        <article className="card card-lg tilt reveal" data-label="colorization">
          <div className="card-art art-colorize" aria-hidden="true">
            <svg viewBox="0 0 600 340" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g-sky" x2="0" y2="1"><stop stopColor="#5ef2e0" /><stop offset="1" stopColor="#ffb454" /></linearGradient>
                <linearGradient id="g-mnt" x2=".8" y2="1"><stop stopColor="#7c5cff" /><stop offset="1" stopColor="#1a1440" /></linearGradient>
                <filter id="f-gray"><feColorMatrix type="saturate" values="0" /></filter>
                <clipPath id="clip-gray"><rect id="gray-rect" width="300" height="340" /></clipPath>
                <g id="scene">
                  <rect width="600" height="340" fill="url(#g-sky)" />
                  <circle cx="440" cy="90" r="40" fill="#fff4d6" />
                  <path d="M0 250 130 95 240 210 340 110 600 270v70H0z" fill="#3f2e9c" opacity=".7" />
                  <path d="M60 230 210 70l150 180 120-85 60 60v115H0z" fill="url(#g-mnt)" />
                  <path d="M0 300q150-90 300-15t300-30v85H0z" fill="#10233a" />
                </g>
              </defs>
              <use href="#scene" />
              <g clipPath="url(#clip-gray)" filter="url(#f-gray)"><use href="#scene" /></g>
            </svg>
            <div className="compare-line" id="compare-line"><span>⇆</span></div>
            <label className="sr-only" htmlFor="color-slider">{t.work.sliderLabel}</label>
            <input type="range" id="color-slider" min="0" max="100" defaultValue="50" aria-valuetext="50%" />
            <span className="chip l">L · grayscale</span><span className="chip r">ab · predicted</span>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[0].meta}</span><span>CNN · GAN · PyTorch</span></div>
            <a className="card-title" href="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" target="_blank" rel="noopener noreferrer"><h3>{c[0].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[0].desc}</p>
            <Tags tags={c[0].tags} />
          </div>
        </article>

        <article className="card card-md tilt reveal" data-label="face recognition">
          <div className="card-art art-face" aria-hidden="true">
            <svg viewBox="0 0 400 300">
              <g fill="none" stroke="rgba(94,242,224,.75)" strokeWidth="1.1">
                <path d="M200 40 150 55 120 100 116 165 136 225 170 262 200 274 230 262 264 225 284 165 280 100 250 55Z" />
                <path d="M150 55l50 44 50-44M120 100l80-2 80 2M116 165l46-36 38-30 38 30 46 36M136 225l28-52 36-72 36 72 28 52M170 262l30-48 30 48M136 225l64-12 64 12M116 165l50 9 34 40 34-40 50-9" />
              </g>
              <g fill="#5ef2e0" className="lm"><circle cx="150" cy="55" r="3" /><circle cx="250" cy="55" r="3" /><circle cx="162" cy="129" r="3.5" /><circle cx="238" cy="129" r="3.5" /><circle cx="200" cy="99" r="3" /><circle cx="200" cy="213" r="3.5" /><circle cx="170" cy="262" r="3" /><circle cx="230" cy="262" r="3" /></g>
              <path d="M90 70V40h30M280 40h30v30M90 230v30h30M310 230v30h-30" fill="none" stroke="#ff5c7a" strokeWidth="2" />
            </svg>
            <div className="scanline"></div>
            <code className="art-code">face → 512-d embedding<br />cos(θ) = 0.91 ✓ match</code>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[1].meta}</span><span>FaceNet · ArcFace · OpenVINO</span></div>
            <a className="card-title" href="https://github.com/saadnajib/facenet-implementation-2" target="_blank" rel="noopener noreferrer"><h3>{c[1].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[1].desc}</p>
            <Tags tags={c[1].tags} />
          </div>
        </article>

        <article className="card card-md tilt reveal" data-label="3d humans">
          <div className="card-art art-mesh" aria-hidden="true">
            <svg viewBox="0 0 400 300" className="mesh-svg">
              <g stroke="rgba(124,92,255,.8)" strokeWidth="1.4" fill="none" strokeLinecap="round">
                <path d="M200 60v60M200 120l-45 30M200 120l45 30M155 150l-15 70M245 150l15 70M200 120l-30 90M200 120l30 90M170 210l-10 60M230 210l10 60" />
              </g>
              <g fill="#7c5cff"><circle cx="200" cy="60" r="10" /><circle cx="200" cy="120" r="4" /><circle cx="155" cy="150" r="4" /><circle cx="245" cy="150" r="4" /><circle cx="140" cy="220" r="4" /><circle cx="260" cy="220" r="4" /><circle cx="170" cy="210" r="4" /><circle cx="230" cy="210" r="4" /><circle cx="160" cy="270" r="4" /><circle cx="240" cy="270" r="4" /></g>
              <g className="mesh-grid" stroke="rgba(94,242,224,.18)"><path d="M40 280h320M60 240h280M80 200h240M100 160h200" /></g>
            </svg>
            <code className="art-code">θ ∈ ℝ^(J×3) · β ∈ ℝ^11</code>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[2].meta}</span><span>RPTU · PyTorch</span></div>
            <a className="card-title" href="https://github.com/saadnajib/Master_Thesis" target="_blank" rel="noopener noreferrer"><h3>{c[2].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[2].desc}</p>
            <Tags tags={c[2].tags} />
          </div>
        </article>

        <article className="card card-lg tilt reveal" data-label="gan api">
          <div className="card-art art-gan" aria-hidden="true">
            <div className="gan-row"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="gan-row r2"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <code className="art-code">POST /colorize · 200 OK · G(z | L) → ab</code>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[3].meta}</span><span>GAN · TensorFlow · Keras</span></div>
            <a className="card-title" href="https://github.com/saadnajib/GAN-Image-colorization-API-master" target="_blank" rel="noopener noreferrer"><h3>{c[3].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[3].desc}</p>
            <Tags tags={c[3].tags} />
          </div>
        </article>

        <article className="card card-sm tilt reveal" data-label="grasp synthesis">
          <div className="card-art art-grasp" aria-hidden="true"><div className="hand"><i></i><i></i><i></i><i></i><i></i></div><code className="art-code">strain-aware ✓</code></div>
          <div className="card-body">
            <div className="card-meta"><span>{c[4].meta}</span></div>
            <a className="card-title" href="https://github.com/saadnajib/Egocentric-Grasp-Synthesis-using-Contextual-Reasoning-for-Strain-Aware" target="_blank" rel="noopener noreferrer"><h3>{c[4].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[4].desc}</p>
          </div>
        </article>

        <article className="card card-sm tilt reveal" data-label="head pose">
          <div className="card-art art-pose" aria-hidden="true"><div className="gyro"><i></i><i></i><i></i></div><code className="art-code">yaw · pitch · roll</code></div>
          <div className="card-body">
            <div className="card-meta"><span>{c[5].meta}</span></div>
            <a className="card-title" href="https://github.com/saadnajib/Head-Pose-Android-App" target="_blank" rel="noopener noreferrer"><h3>{c[5].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[5].desc}</p>
          </div>
        </article>

        <article className="card card-sm tilt reveal" data-label="opencv">
          <div className="card-art art-pixels" aria-hidden="true"><div className="pixels" id="pixels"></div><code className="art-code">see · detect · understand</code></div>
          <div className="card-body">
            <div className="card-meta"><span>{c[6].meta}</span></div>
            <a className="card-title" href="https://github.com/saadnajib/OpenCv" target="_blank" rel="noopener noreferrer"><h3>{c[6].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[6].desc}</p>
          </div>
        </article>

        <article className="card card-sm tilt reveal" data-label="cifar-10">
          <div className="card-art art-classes" aria-hidden="true"><div className="bars"><i style={{ '--h': '.92' }}></i><i style={{ '--h': '.31' }}></i><i style={{ '--h': '.58' }}></i><i style={{ '--h': '.2' }}></i><i style={{ '--h': '.75' }}></i><i style={{ '--h': '.44' }}></i><i style={{ '--h': '.12' }}></i><i style={{ '--h': '.66' }}></i><i style={{ '--h': '.38' }}></i><i style={{ '--h': '.5' }}></i></div><code className="art-code">softmax · 10 classes</code></div>
          <div className="card-body">
            <div className="card-meta"><span>{c[7].meta}</span></div>
            <a className="card-title" href="https://github.com/saadnajib/Artificial-intelligence" target="_blank" rel="noopener noreferrer"><h3>{c[7].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[7].desc}</p>
          </div>
        </article>

        <article className="card card-half tilt reveal" data-label="trading bot">
          <div className="card-art art-trade" aria-hidden="true">
            <svg viewBox="0 0 400 200" preserveAspectRatio="none">
              <g className="grid" stroke="rgba(255,255,255,.06)"><path d="M0 50h400M0 100h400M0 150h400" /></g>
              <g className="candles" strokeWidth="1.2">
                <g stroke="#5ef2e0" fill="#5ef2e0"><path d="M30 140v-40M60 120v-38M110 130v-46M170 110v-40M230 95v-42M260 84v-36M330 70v-44M360 62v-40" /><rect x="24" y="118" width="12" height="16" /><rect x="54" y="96" width="12" height="18" /><rect x="104" y="100" width="12" height="20" /><rect x="164" y="86" width="12" height="16" /><rect x="224" y="68" width="12" height="20" /><rect x="254" y="60" width="12" height="16" /><rect x="324" y="40" width="12" height="20" /><rect x="354" y="34" width="12" height="18" /></g>
                <g stroke="#ff5c7a" fill="#ff5c7a"><path d="M85 100v46M140 100v44M200 86v40M290 70v40M300 72v36" /><rect x="79" y="112" width="12" height="18" /><rect x="134" y="110" width="12" height="16" /><rect x="194" y="96" width="12" height="16" /><rect x="284" y="80" width="12" height="16" /></g>
              </g>
              <path className="ema" d="M0 150C60 145 90 130 130 120S200 100 240 88 320 60 400 44" fill="none" stroke="#ffb454" strokeWidth="1.6" />
              <path className="tp" d="M0 34h400" stroke="rgba(94,242,224,.5)" strokeDasharray="4 6" /><path className="sl" d="M0 166h400" stroke="rgba(255,92,122,.5)" strokeDasharray="4 6" />
            </svg>
            <code className="art-code">EMA20 · RSI14 · vol ×1.5 → TP +4% / SL −2%</code>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[8].meta}</span><span>Python · ccxt · pandas</span></div>
            <a className="card-title" href="https://github.com/saadnajib/trading_bot_v2" target="_blank" rel="noopener noreferrer"><h3>{c[8].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[8].desc}</p>
            <Tags tags={c[8].tags} />
          </div>
        </article>

        <article className="card card-half tilt reveal" data-label="annotation tool">
          <div className="card-art art-annot" aria-hidden="true">
            <div className="annot-frame">
              <i className="bbox b1"><span>person 0.94</span></i>
              <i className="bbox b2"><span>cup 0.88</span></i>
              <i className="bbox b3"><span>laptop 0.91</span></i>
            </div>
            <code className="art-code">upload → frames → annotate → split → train</code>
          </div>
          <div className="card-body">
            <div className="card-meta"><span>{c[9].meta}</span><span>Flask · OpenCV · MMDetection</span></div>
            <a className="card-title" href="https://github.com/saadnajib/Mindgarage_Roboflow_app" target="_blank" rel="noopener noreferrer"><h3>{c[9].title}</h3><i aria-hidden="true">↗</i></a>
            <p>{c[9].desc}</p>
            <Tags tags={c[9].tags} />
          </div>
        </article>
      </div>

      <a className="all-projects reveal magnetic" href="https://github.com/saadnajib" target="_blank" rel="noopener noreferrer" data-label="github"><span>{t.work.allProjects}</span><strong>{t.work.openGithub} <i aria-hidden="true">↗</i></strong></a>
    </section>
  );
}
