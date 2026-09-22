export default function Contact() {
  return (
    <section id="contact" className="contact-section section-space" aria-labelledby="contact-title">
      <div className="section-wrap">
        <p className="eyebrow reveal"><span className="status-dot"></span>LAYER 05 · OUTPUT</p>
        <h2 id="contact-title" className="contact-title split-heading reveal">Let's build something<br />that <span className="accent">sees</span>.</h2>
        <div className="contact-grid">
          <div className="terminal reveal" aria-label="Contact details">
            <div className="term-bar"><i></i><i></i><i></i><span>saad@portfolio ~ % contact --all</span></div>
            <pre id="terminal-out" className="term-out"></pre>
          </div>
          <ul className="contact-links reveal">
            <li><span>Email</span><a href="mailto:saadnajib97@hotmail.com" data-label="email">saadnajib97@hotmail.com</a><button className="copy" type="button" data-copy="saadnajib97@hotmail.com" aria-label="Copy email">copy</button></li>
            <li><span>Phone</span><a href="tel:+4915237641530" data-label="call">+49 152 3764 1530</a><button className="copy" type="button" data-copy="+4915237641530" aria-label="Copy phone number">copy</button></li>
            <li><span>LinkedIn</span><a href="https://de.linkedin.com/in/muhammad-saad-najib" target="_blank" rel="noopener noreferrer" data-label="linkedin">/in/muhammad-saad-najib</a></li>
            <li><span>GitHub</span><a href="https://github.com/saadnajib" target="_blank" rel="noopener noreferrer" data-label="github">@saadnajib</a></li>
            <li><span>Instagram</span><a href="https://www.instagram.com/saad__najib?stkn=aHJ1bnh1a2tlYzd6&amp;utm_source=qr" target="_blank" rel="noopener noreferrer" data-label="instagram">@saad__najib</a></li>
            <li><span>Facebook</span><a href="https://www.facebook.com/share/1HinXNmikk/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" data-label="facebook">Muhammad Saad Najib</a></li>
            <li><span>Paper</span><a href="https://kjcis.kiet.edu.pk/index.php/kjcis/article/view/159/73" target="_blank" rel="noopener noreferrer" data-label="read paper">Image colorization · KJCIS 2021</a><a className="copy" href="https://kjcis.kiet.edu.pk/index.php/kjcis" target="_blank" rel="noopener noreferrer" data-label="journal">journal</a></li>
            <li><span>Location</span><em>Kaiserslautern, Germany · open to relocation</em></li>
          </ul>
        </div>
        <a className="button primary magnetic contact-cta reveal" href="mailto:saadnajib97@hotmail.com?subject=Hello%20Saad" data-label="say hello"><span>Say hello</span><i aria-hidden="true">↗</i></a>
      </div>
    </section>
  );
}
