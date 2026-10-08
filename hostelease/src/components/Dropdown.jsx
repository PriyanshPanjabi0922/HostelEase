import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

// Button + animated menu. items: [{ label, onClick, active? }]
export default function Dropdown({ label, items, className = '', children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const away = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, []);

  return (
    <div className={`dropdown ${className}`} ref={ref}>
      <button className="dropdown-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>
        {children || <>{label}<Icon name="chevron" size={16} /></>}
      </button>
      <div className={`dropdown-menu ${open ? 'open' : ''}`}>
        {items.map((it) => (
          <button key={it.label} className={it.active ? 'active' : ''}
            onClick={() => { it.onClick(); setOpen(false); }}>
            {it.label}{it.active && <Icon name="check" size={15} />}
          </button>
        ))}
      </div>
    </div>
  );
}
