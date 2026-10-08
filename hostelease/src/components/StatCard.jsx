import Icon from './Icon';

export default function StatCard({ label, value, icon, tone, note, onClick }) {
  return (
    <button className={`stat-card tone-${tone}`} onClick={onClick}>
      <span className="stat-icon"><Icon name={icon} size={24} /></span>
      <span className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        <span className="stat-note">{note}</span>
      </span>
    </button>
  );
}
