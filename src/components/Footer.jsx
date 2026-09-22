import { useLang } from '../i18n.jsx';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer section-wrap">
      <span className="wordmark-text">Muhammad Saad Najib</span>
      <p>© <span id="year">2026</span>{t.footer.line}</p>
      <a href="#top" data-label="top">{t.footer.top}</a>
    </footer>
  );
}
