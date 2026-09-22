export default function Header() {
  return (
    <header className="site-header" id="top">
      <a href="#home" className="wordmark" data-label="home">
        <span className="wordmark-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span className="wordmark-text">Muhammad Saad Najib</span>
      </a>
      <nav className="main-nav" id="navigation" aria-label="Main navigation">
        <a href="#work" data-label="projects"><em>01</em>Work</a>
        <a href="#about" data-label="about"><em>02</em>About</a>
        <a href="#experience" data-label="experience"><em>03</em>Experience</a>
        <a href="#resume" data-label="résumé"><em>04</em>Résumé</a>
        <a href="#contact" data-label="contact"><em>05</em>Contact</a>
      </nav>
      <div className="header-tools">
        <span className="clock" id="clock" title="Local time · Kaiserslautern, Germany"><i className="status-dot"></i><span id="clock-time">--:--</span> DE</span>
        <button className="cmd-button" id="cmd-open" type="button" aria-label="Open command palette" data-label="command palette"><span>⌘</span>K</button>
        <button className="motion-toggle" id="motion-toggle" type="button" aria-pressed="false" aria-label="Pause visual effects" data-label="motion">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path className="ico-pause" d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" /><path className="ico-play" d="M7 4l12 8-12 8z" fill="currentColor" /></svg>
        </button>
        <button className="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" aria-label="Open navigation"><span></span><span></span><span></span></button>
      </div>
    </header>
  );
}
