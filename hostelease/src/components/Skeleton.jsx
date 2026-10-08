// Shimmering placeholder shown while data loads
export default function Skeleton({ count = 3, height = 110, columns = 'cards' }) {
  return (
    <div className={`skeleton-grid ${columns}`}>
      {Array.from({ length: count }).map((_, i) => <div key={i} className="skeleton" style={{ height }} />)}
    </div>
  );
}
