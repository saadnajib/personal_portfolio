import { useEffect } from 'react';
import { initPortfolio } from './lib/effects.js';
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

export default function App() {
  useEffect(() => {
    initPortfolio();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
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
