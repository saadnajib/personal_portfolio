export default function ResumeViewer() {
  return (
    <dialog className="viewer" id="resume-dialog" aria-label="Résumé viewer">
      <div className="viewer-bar"><span>Muhammad_Saad_Najib_CV.pdf</span><div><a className="button ghost small" href="./Muhammad_Saad_Najib_CV.pdf" download="Muhammad_Saad_Najib_CV.pdf">Download</a><button className="button ghost small" type="button" id="resume-close">Close ✕</button></div></div>
      <iframe id="resume-frame" title="Résumé PDF" loading="lazy"></iframe>
    </dialog>
  );
}
