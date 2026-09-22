export default function Ambient() {
  return (
    <>
      <canvas id="field" className="field" aria-hidden="true"></canvas>
      <div className="noise" aria-hidden="true"></div>
      <div className="cursor" id="cursor" aria-hidden="true">
        <i className="cursor-ring"></i><i className="cursor-dot"></i>
        <span className="cursor-label" id="cursor-label"></span>
        <span className="cursor-coord" id="cursor-coord">x 0000 · y 0000</span>
      </div>
      <div className="scroll-progress" aria-hidden="true"><i id="scroll-progress"></i></div>
    </>
  );
}
