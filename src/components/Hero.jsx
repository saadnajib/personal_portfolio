import { useLang } from '../i18n.jsx';

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow eyebrow-live"><span className="status-dot"></span>LAYER 00 · INPUT <span className="sep">/</span> <span id="role-type" className="role-type">{t.effects.roles[0]}</span><span className="caret" aria-hidden="true"></span></p>
        <h1 id="hero-title" className="hero-title">
          <span className="line line-first"><span className="word" data-split>Muhammad</span><span className="title-tag">M.Sc. · CS</span></span>
          <span className="line line-name"><span className="word" data-split>Saad</span><span className="word accent" data-split>Najib</span></span>
        </h1>
        <p className="hero-intro">{t.hero.intro0}<em>{t.hero.see}</em>{t.hero.intro1}</p>
        <div className="hero-actions">
          <a className="button primary magnetic" href="#work" data-label="explore"><span>{t.hero.explore}</span><i aria-hidden="true">↘</i></a>
          <a className="button ghost magnetic" href="./Muhammad_Saad_Najib_CV.pdf" download="Muhammad_Saad_Najib_CV.pdf" data-label="download cv"><span>{t.hero.downloadCv}</span><i aria-hidden="true">↓</i></a>
        </div>
        <ul className="hero-stats" aria-label={t.hero.statsAria}>
          <li><b data-count="6">0</b><span>{t.hero.stats[0]}</span></li>
          <li><b data-count="12">0</b><span>{t.hero.stats[1]}</span></li>
          <li><b data-count="1">0</b><span>{t.hero.stats[2]}</span></li>
        </ul>
      </div>

      <div className="hero-visual" id="viewfinder" aria-label={t.hero.visualAria}>
        <div className="vf-frame">
          <canvas id="portrait" className="portrait" aria-hidden="true"></canvas>
          <picture><source srcSet="./saad.webp" type="image/webp" /><img src="./saad.JPG" width="960" height="1280" alt="Muhammad Saad Najib" className="portrait-fallback" id="portrait-src" decoding="async" fetchPriority="high" /></picture>
          <div className="vf-scan" id="vf-scan" aria-hidden="true"></div>
          <div className="vf-box" id="vf-box" aria-hidden="true">
            <span className="vf-tag">subject · M. S. Najib <b>0.998</b></span>
            <i className="c tl"></i><i className="c tr"></i><i className="c bl"></i><i className="c br"></i>
          </div>
          <div className="vf-hud" aria-hidden="true">
            <span className="hud tl">REC <i className="rec"></i> CAM_01</span>
            <span className="hud tr" id="hud-mode">MODE · COLORIZE</span>
            <span className="hud bl" id="hud-readout">σ 0.00 · μ 0.00</span>
            <span className="hud br">960 × 1280 · RGB</span>
          </div>
          <div className="vf-grid" aria-hidden="true"></div>
        </div>
        <div className="vf-caption">
          <span>{t.hero.caption}</span>
          <button type="button" className="vf-mode" id="vf-mode" data-label="toggle lens">lens: <b>edges</b></button>
        </div>
        <div className="orbit orbit-a" aria-hidden="true"></div>
        <div className="orbit orbit-b" aria-hidden="true"></div>
      </div>

      <a className="scroll-cue" href="#work" aria-label={t.hero.scrollAria}><span>{t.hero.scroll}</span><i></i></a>
    </section>
  );
}
