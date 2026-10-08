import Icon from './Icon';
import Dropdown from './Dropdown';

export default function Topbar({ title, user, onMenu, onNavigate, onLogout }) {
  const initials = user.name.split(' ').map((w) => w[0]).join('');
  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onMenu} aria-label="Toggle sidebar"><Icon name="menu" /></button>
      <h2>{title}</h2>
      <Dropdown className="align-right" items={[
        { label: 'My profile', onClick: () => onNavigate('profile') },
        { label: 'Logout', onClick: onLogout },
      ]}>
        <span className="avatar sm">{initials}</span>
        <span className="user-meta"><strong>{user.name}</strong><small>{user.role}</small></span>
        <Icon name="chevron" size={16} />
      </Dropdown>
    </header>
  );
}
