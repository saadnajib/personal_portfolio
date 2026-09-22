import { useLang } from '../i18n.jsx';

export default function ResumeViewer() {
  const { t } = useLang();
  return (
    <dialog className="viewer" id="resume-dialog" aria-label={t.resume.viewerAria}>
      <div className="viewer-bar"><span>Muhammad_Saad_Najib_CV.pdf</span><div><a className="button ghost small" href="./Muhammad_Saad_Najib_CV.pdf" download="Muhammad_Saad_Najib_CV.pdf">{t.resume.viewerDownload}</a><button className="button ghost small" type="button" id="resume-close">{t.resume.viewerClose}</button></div></div>
      <iframe id="resume-frame" title="Résumé PDF" loading="lazy"></iframe>
    </dialog>
  );
}
