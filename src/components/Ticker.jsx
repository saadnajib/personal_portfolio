import { Fragment } from 'react';

const items = [
  'Machine Learning', 'Computer Vision', 'Deep Learning', 'Face Recognition',
  'Image Colorization', '3D Human Understanding', 'PyTorch', 'OpenCV', 'Data Analysis',
];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map(pass =>
          items.map(item => (
            <Fragment key={`${pass}-${item}`}>
              <span>{item}</span><b>◆</b>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
