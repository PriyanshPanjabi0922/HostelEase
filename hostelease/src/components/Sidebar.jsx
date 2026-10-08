import Icon from './Icon';

export const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'complaints', label: 'Complaints' },
  { id: 'notices', label: 'Notices' },
  { id: 'profile', label: 'Profile' },
];

export default function Sidebar({ page, onNavigate, onLogout, collapsed, mobileOpen, onCloseMobile }) {
  return (
    <>
      <div className={`scrim ${mobileOpen ? 'show' : ''}`} onClick={onCloseMobile} />
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="brand">
          <span className="brand-logo"><Icon name="building" size={22} /></span>
          <span className="brand-name">Hostel<b>Ease</b></span>
        </div>
        <nav>
          {NAV.map((n) => (
            <button key={n.id} title={n.label} className={`nav-item ${page === n.id ? 'active' : ''}`}
              onClick={() => onNavigate(n.id)}>
              <Icon name={n.id} /><span>{n.label}</span>
            </button>
          ))}
        </nav>
        <button className="nav-item logout" title="Logout" onClick={onLogout}>
          <Icon name="logout" /><span>Logout</span>
        </button>
      </aside>
    </>
  );
}
