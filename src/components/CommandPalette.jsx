export default function CommandPalette() {
  return (
    <dialog className="palette" id="palette" aria-label="Command palette">
      <div className="palette-input"><span aria-hidden="true">›</span><input id="palette-search" type="text" placeholder="Jump to… (try “resume”, “github”, “email”)" autoComplete="off" spellCheck="false" /><kbd>esc</kbd></div>
      <ul className="palette-list" id="palette-list" role="listbox">
        <li role="option" data-action="#home"><span>00</span>Input · Home<kbd>section</kbd></li>
        <li role="option" data-action="#work" data-keywords="projects portfolio"><span>01</span>Features · Work<kbd>section</kbd></li>
        <li role="option" data-action="#about"><span>02</span>Embedding · About<kbd>section</kbd></li>
        <li role="option" data-action="#experience" data-keywords="jobs career timeline education"><span>03</span>Training log · Experience<kbd>section</kbd></li>
        <li role="option" data-action="#resume" data-keywords="resume cv curriculum"><span>04</span>Checkpoint · Résumé<kbd>section</kbd></li>
        <li role="option" data-action="#contact"><span>05</span>Output · Contact<kbd>section</kbd></li>
        <li role="option" data-action="./Muhammad_Saad_Najib_CV.pdf" data-new="true" data-keywords="resume cv pdf download"><span>↓</span>Download résumé PDF<kbd>file</kbd></li>
        <li role="option" data-action="https://github.com/saadnajib" data-new="true"><span>↗</span>Open GitHub<kbd>link</kbd></li>
        <li role="option" data-action="https://de.linkedin.com/in/muhammad-saad-najib" data-new="true"><span>↗</span>Open LinkedIn<kbd>link</kbd></li>
        <li role="option" data-action="https://www.instagram.com/saad__najib?stkn=aHJ1bnh1a2tlYzd6&amp;utm_source=qr" data-new="true"><span>↗</span>Open Instagram<kbd>link</kbd></li>
        <li role="option" data-action="https://www.facebook.com/share/1HinXNmikk/?mibextid=wwXIfr" data-new="true"><span>↗</span>Open Facebook<kbd>link</kbd></li>
        <li role="option" data-action="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" data-new="true" data-keywords="paper publication article colorization research"><span>↗</span>Read published paper<kbd>link</kbd></li>
        <li role="option" data-action="https://kjcis.kiet.edu.pk/index.php/kjcis" data-new="true" data-keywords="paper journal kjcis kiet"><span>↗</span>Open KJCIS journal<kbd>link</kbd></li>
        <li role="option" data-action="mailto:saadnajib97@hotmail.com"><span>@</span>Email saadnajib97@hotmail.com<kbd>mail</kbd></li>
        <li role="option" data-action="tel:+4915237641530"><span>☏</span>Call +49 152 3764 1530<kbd>tel</kbd></li>
        <li role="option" data-action="toggle-motion"><span>⏯</span>Toggle motion<kbd>setting</kbd></li>
      </ul>
    </dialog>
  );
}
