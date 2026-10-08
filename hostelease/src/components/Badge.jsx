// Colored pill for status/priority text, e.g. "In Progress" -> class "badge in-progress"
export default function Badge({ text }) {
  return <span className={`badge ${text.toLowerCase().replace(/\s+/g, '-')}`}>{text}</span>;
}
