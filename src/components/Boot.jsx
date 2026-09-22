export default function Boot() {
  return (
    <div className="boot" id="boot" aria-hidden="true">
      <div className="boot-inner">
        <div className="boot-logo">MSN<span>.</span></div>
        <ol className="boot-log" id="boot-log">
          <li>mounting portfolio.sys</li>
          <li>loading weights ······· 163 layers</li>
          <li>calibrating camera</li>
          <li>detecting subject → <b>Muhammad Saad Najib</b></li>
          <li>confidence 0.998 · rendering</li>
        </ol>
        <div className="boot-bar"><i id="boot-bar"></i></div>
        <span className="boot-pct" id="boot-pct">0%</span>
      </div>
    </div>
  );
}
