import { useLang } from '../i18n.jsx';

export default function Header() {
  const { lang, setLang, theme, setTheme, t } = useLang();
  return (
    <header className="site-header" id="top">
      <a href="#home" className="wordmark" data-label="home">
        <span className="wordmark-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="wordmark-text">Muhammad Saad Najib</span>
      </a>
      <nav className="main-nav" id="navigation" aria-label="Main navigation">
        <a href="#work" data-label={t.nav.work.toLowerCase()}><em>01</em>{t.nav.work}</a>
        <a href="#about" data-label={t.nav.about.toLowerCase()}><em>02</em>{t.nav.about}</a>
        <a href="#experience" data-label={t.nav.experience.toLowerCase()}><em>03</em>{t.nav.experience}</a>
        <a href="#resume" data-label={t.nav.resume.toLowerCase()}><em>04</em>{t.nav.resume}</a>
        <a href="#contact" data-label={t.nav.contact.toLowerCase()}><em>05</em>{t.nav.contact}</a>
      </nav>
      <div className="header-tools">
        <span className="clock" id="clock" title="Local time · Kaiserslautern, Germany"><i className="status-dot"></i><span id="clock-time">--:--</span> DE</span>
        <button
          className="lang-toggle" id="lang-toggle" type="button"
          aria-label={t.nav.langToggle} data-label={lang === 'en' ? 'deutsch' : 'english'}
          onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
        >
          <b className={lang === 'en' ? 'on' : ''}>EN</b><span>/</span><b className={lang === 'de' ? 'on' : ''}>DE</b>
        </button>
        <button
          className="theme-toggle" id="theme-toggle" type="button"
          aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark} data-label="theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <g className="ico-sun" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
              <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
            </g>
            <path className="ico-moon" d="M20.6 14.4A8.5 8.5 0 0 1 9.6 3.4a8.5 8.5 0 1 0 11 11z" fill="currentColor" />
          </svg>
        </button>
        <button className="cmd-button" id="cmd-open" type="button" aria-label={t.nav.openPalette} data-label="command palette"><span>⌘</span>K</button>
        <button className="motion-toggle" id="motion-toggle" type="button" aria-pressed="false" aria-label="Pause visual effects" data-label="motion">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path className="ico-pause" d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" /><path className="ico-play" d="M7 4l12 8-12 8z" fill="currentColor" /></svg>
        </button>
        <button className="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" aria-label={t.nav.openNav}><span></span><span></span><span></span></button>
      </div>
    </header>
  );
}
