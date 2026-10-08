import { useState } from 'react';

// Add / Edit room form (rendered inside Modal)
export default function RoomForm({ initial, onSubmit, onCancel, saving }) {
  const [f, setF] = useState(initial || { number: '', floor: 1, capacity: 2, occupied: 0, status: 'Available' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const data = { ...f, floor: +f.floor, capacity: +f.capacity, occupied: +f.occupied };
    if (!data.number.trim()) return setError('Enter a room number.');
    if (data.capacity < 1) return setError('Capacity must be at least 1.');
    if (data.occupied < 0 || data.occupied > data.capacity) return setError('Occupied beds must be between 0 and the capacity.');
    onSubmit(data);
  };

  return (
    <form className="form" onSubmit={submit}>
      <label>Room number<input value={f.number} onChange={set('number')} placeholder="e.g. A-104" autoFocus /></label>
      <div className="form-row">
        <label>Floor<input type="number" min="0" value={f.floor} onChange={set('floor')} /></label>
        <label>Capacity<input type="number" min="1" value={f.capacity} onChange={set('capacity')} /></label>
        <label>Occupied beds<input type="number" min="0" value={f.occupied} onChange={set('occupied')} /></label>
      </div>
      <label>Status
        <select value={f.status} onChange={set('status')}>
          <option>Available</option><option>Occupied</option><option>Maintenance</option>
        </select>
      </label>
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions">
        <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
        <button className="btn primary" disabled={saving}>{saving ? 'Saving...' : 'Save room'}</button>
      </div>
    </form>
  );
}
