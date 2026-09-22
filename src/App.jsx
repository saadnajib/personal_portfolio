import { useEffect, useState } from 'react';
import { initPortfolio } from './lib/effects.js';
import { LangContext, translations, readStored, store } from './i18n.jsx';
import Boot from './components/Boot.jsx';
import Ambient from './components/Ambient.jsx';
import Rail from './components/Rail.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ResumeViewer from './components/ResumeViewer.jsx';
import CommandPalette from './components/CommandPalette.jsx';

const THEME_COLORS = { dark: '#05070b', light: '#f2f5f9' };

function Content({ t }) {
  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <Boot />
      <Ambient />
      <Rail />
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <About />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ResumeViewer />
      <CommandPalette />
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => (readStored('lang', 'en') === 'de' ? 'de' : 'en'));
  const [theme, setTheme] = useState(() => (readStored('theme', 'dark') === 'light' ? 'light' : 'dark'));
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
    store('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
    store('lang', lang);
  }, [lang, t]);

  // The whole page remounts when the language changes (key below), so the
  // effects engine is torn down and re-initialised against the fresh DOM
  // with the right strings.
  useEffect(() => initPortfolio(t.effects), [lang, t]);

  return (
    <LangContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      <Content key={lang} t={t} />
    </LangContext.Provider>
  );
}
