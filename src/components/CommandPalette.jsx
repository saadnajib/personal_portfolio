import { useLang } from '../i18n.jsx';

export default function CommandPalette() {
  const { t } = useLang();
  const p = t.palette;
  return (
    <dialog className="palette" id="palette" aria-label={p.aria}>
      <div className="palette-input"><span aria-hidden="true">›</span><input id="palette-search" type="text" placeholder={p.placeholder} autoComplete="off" spellCheck="false" /><kbd>esc</kbd></div>
      <ul className="palette-list" id="palette-list" role="listbox">
        <li role="option" data-action="#home"><span>00</span>{p.items.home}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="#work" data-keywords="projects portfolio projekte arbeit"><span>01</span>{p.items.work}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="#about" data-keywords="about über"><span>02</span>{p.items.about}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="#experience" data-keywords="jobs career timeline education erfahrung karriere"><span>03</span>{p.items.experience}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="#resume" data-keywords="resume cv curriculum lebenslauf"><span>04</span>{p.items.resume}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="#contact" data-keywords="contact kontakt"><span>05</span>{p.items.contact}<kbd>{p.kbd.section}</kbd></li>
        <li role="option" data-action="./Muhammad_Saad_Najib_CV.pdf" data-new="true" data-keywords="resume cv pdf download lebenslauf"><span>↓</span>{p.items.cv}<kbd>{p.kbd.file}</kbd></li>
        <li role="option" data-action="https://github.com/saadnajib" data-new="true"><span>↗</span>{p.items.github}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="https://de.linkedin.com/in/muhammad-saad-najib" data-new="true"><span>↗</span>{p.items.linkedin}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="https://www.instagram.com/saad__najib?stkn=aHJ1bnh1a2tlYzd6&amp;utm_source=qr" data-new="true"><span>↗</span>{p.items.instagram}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="https://www.facebook.com/share/1HinXNmikk/?mibextid=wwXIfr" data-new="true"><span>↗</span>{p.items.facebook}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" data-new="true" data-keywords="paper publication article colorization research publikation"><span>↗</span>{p.items.paper}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="https://kjcis.kiet.edu.pk/index.php/kjcis" data-new="true" data-keywords="paper journal kjcis kiet"><span>↗</span>{p.items.journal}<kbd>{p.kbd.link}</kbd></li>
        <li role="option" data-action="mailto:saadnajib97@hotmail.com"><span>@</span>{p.items.email}<kbd>{p.kbd.mail}</kbd></li>
        <li role="option" data-action="tel:+4915237641530"><span>☏</span>{p.items.tel}<kbd>{p.kbd.tel}</kbd></li>
        <li role="option" data-action="toggle-motion"><span>⏯</span>{p.items.motion}<kbd>{p.kbd.setting}</kbd></li>
        <li role="option" data-action="toggle-theme" data-keywords="theme light dark design hell dunkel"><span>◐</span>{p.items.theme}<kbd>{p.kbd.setting}</kbd></li>
        <li role="option" data-action="toggle-lang" data-keywords="language sprache english deutsch german"><span>Ａ</span>{p.items.lang}<kbd>{p.kbd.setting}</kbd></li>
      </ul>
    </dialog>
  );
}
