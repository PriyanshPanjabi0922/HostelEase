import { useEffect, useState } from 'react';
import Icon from './Icon';

// Modal with animated open + close. onClose runs after the exit animation.
export default function Modal({ title, onClose, children }) {
  const [closing, setClosing] = useState(false);
  const close = () => { setClosing(true); setTimeout(onClose, 200); };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className={`modal-overlay ${closing ? 'closing' : ''}`} onMouseDown={close}>
      <div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={close} aria-label="Close"><Icon name="close" /></button>
        </div>
        {typeof children === 'function' ? children(close) : children}
      </div>
    </div>
  );
}
