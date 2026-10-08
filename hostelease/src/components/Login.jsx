import { useState } from 'react';
import Icon from './Icon';
import { authApi, auth } from '../services/api';

// Sign-in screen. In real mode it calls POST /api/auth/login and stores the JWT.
export default function Login({ onLogin }) {
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('password');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('');
    try { const { token } = await authApi.login({ email, password }); auth.save(token); onLogin(); }
    catch (err) { setError(err.message); setBusy(false); }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={submit}>
        <span className="brand-logo big"><Icon name="building" size={30} /></span>
        <h1>Hostel<b>Ease</b></h1>
        <p>Sign in to manage rooms, complaints and notices.</p>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn primary full" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}
