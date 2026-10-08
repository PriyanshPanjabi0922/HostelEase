import { useCallback } from 'react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';
import useFetch from '../services/useFetch';
import { roomsApi, complaintsApi, noticesApi, visitorsApi } from '../services/api';

export default function Dashboard({ onNavigate, user }) {
  const load = useCallback(async () => {
    const [rooms, complaints, notices, visitors] = await Promise.all([
      roomsApi.getAll(), complaintsApi.getAll(), noticesApi.getAll(), visitorsApi.getAll(),
    ]);
    return { rooms, complaints, notices, visitors };
  }, []);
  const { data, loading, error } = useFetch(load);

  if (loading) return <><div className="hero-skel skeleton" /><Skeleton count={6} /></>;
  if (error) return <p className="form-error">Could not load dashboard: {error}</p>;

  const { rooms, complaints, notices, visitors } = data;
  const totalBeds = rooms.reduce((s, r) => s + r.capacity, 0);
  const usedBeds = rooms.reduce((s, r) => s + r.occupied, 0);
  const pct = totalBeds ? Math.round((usedBeds / totalBeds) * 100) : 0;
  const open = complaints.filter((c) => c.status !== 'Resolved').length;

  return (
    <>
      <section className="hero">
        <div>
          <h1>Welcome to HostelEase</h1>
          <p>Hi {user.name.split(' ')[0]}, {open} complaint{open !== 1 && 's'} need attention and {totalBeds - usedBeds} beds are free today.</p>
        </div>
        <div className="hero-meter">
          <div className="ring" style={{ '--pct': pct }}><span>{pct}%</span></div>
          <small>Bed occupancy</small>
        </div>
      </section>

      <section className="stat-grid">
        <StatCard label="Total Rooms" value={rooms.length} icon="building" tone="blue" note={`${totalBeds} beds in total`} onClick={() => onNavigate('rooms')} />
        <StatCard label="Available Rooms" value={rooms.filter((r) => r.status === 'Available').length} icon="check" tone="teal" note="Ready for allotment" onClick={() => onNavigate('rooms')} />
        <StatCard label="Occupied Rooms" value={rooms.filter((r) => r.status === 'Occupied').length} icon="rooms" tone="indigo" note={`${usedBeds} beds in use`} onClick={() => onNavigate('rooms')} />
        <StatCard label="Complaints" value={complaints.length} icon="complaints" tone="amber" note={`${open} still open`} onClick={() => onNavigate('complaints')} />
        <StatCard label="Notices" value={notices.length} icon="notices" tone="violet" note="Published this month" onClick={() => onNavigate('notices')} />
        <StatCard label="Visitors" value={visitors.length} icon="visitors" tone="rose" note="Logged this week" onClick={() => {}} />
      </section>

      <section className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Recent complaints</h3><button className="link-btn" onClick={() => onNavigate('complaints')}>View all</button></div>
          {complaints.slice(0, 4).map((c) => (
            <div className="row-item" key={c._id}>
              <div><strong>{c.type}</strong><small>{c.student} · Room {c.room}</small></div>
              <Badge text={c.status} />
            </div>
          ))}
        </div>
        <div className="panel">
          <div className="panel-head"><h3>Recent visitors</h3></div>
          {visitors.map((v) => (
            <div className="row-item" key={v._id}>
              <div><strong>{v.name}</strong><small>Visiting {v.visiting}</small></div>
              <small>{v.date}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
