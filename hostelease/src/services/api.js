// API layer. With VITE_USE_MOCK=true (default) data lives in memory so the UI fully works.
// Set VITE_USE_MOCK=false to talk to the Node + Express backend through fetch.
import * as sample from "../data/sampleData";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const TOKEN_KEY = "hostelease_token";

export const auth = {
  get token() {
    return localStorage.getItem(TOKEN_KEY);
  },
  save(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

// Shared fetch wrapper: adds JWT header, parses JSON, handles errors.
async function request(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    // JWT middleware rejected the token
    auth.clear();
    window.dispatchEvent(new Event("hostelease:unauthorized"));
  }
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message ||
        `Request failed (${res.status})`
    );
  return res.json();
}

// In-memory store used only in mock mode
const db = {
  rooms: [...sample.rooms],
  complaints: [...sample.complaints],
  notices: [...sample.notices],
  visitors: [...sample.visitors],
};
const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));
const mock =
  (fn) =>
  async (...args) => {
    await wait();
    return fn(...args);
  };
const pick = (real, fake) => (USE_MOCK ? mock(fake) : real);

export const authApi = {
  // Backend: POST /api/auth/login -> { token } (password checked with bcrypt.compare)
  login: pick(
    (creds) => request("/auth/login", { method: "POST", body: creds }),
    () => ({ token: "demo-jwt-token" })
  ),
};

export const roomsApi = {
  getAll: pick(
    () => request("/rooms"),
    () => [...db.rooms]
  ),
  create: pick(
    (d) => request("/rooms", { method: "POST", body: d }),
    (d) => {
      const room = { ...d, _id: "r" + Date.now() };
      db.rooms.push(room);
      return room;
    }
  ),
  update: pick(
    (id, d) => request(`/rooms/${id}`, { method: "PUT", body: d }),
    (id, d) => {
      db.rooms = db.rooms.map((r) => (r._id === id ? { ...r, ...d } : r));
      return d;
    }
  ),
  remove: pick(
    (id) => request(`/rooms/${id}`, { method: "DELETE" }),
    (id) => {
      db.rooms = db.rooms.filter((r) => r._id !== id);
      return { id };
    }
  ),
};

export const complaintsApi = {
  getAll: pick(
    () => request("/complaints"),
    () => [...db.complaints]
  ),
  updateStatus: pick(
    (id, status) =>
      request(`/complaints/${id}`, { method: "PUT", body: { status } }),
    (id, status) => {
      db.complaints = db.complaints.map((c) =>
        c._id === id ? { ...c, status } : c
      );
      return { id, status };
    }
  ),
};

export const noticesApi = {
  getAll: pick(
    () => request("/notices"),
    () => [...db.notices]
  ),

  create: pick(
    (d) => request("/notices", { method: "POST", body: d }),
    (d) => {
      const notice = {
        ...d,
        _id: "n" + Date.now(),
      };

      db.notices.push(notice);
      return notice;
    }
  ),

  update: pick(
    (id, d) => request(`/notices/${id}`, { method: "PUT", body: d }),
    (id, d) => {
      db.notices = db.notices.map((n) => (n._id === id ? { ...n, ...d } : n));

      return db.notices.find((n) => n._id === id);
    }
  ),
};
export const visitorsApi = {
  getAll: pick(
    () => request("/visitors"),
    () => [...db.visitors]
  ),
};
export const profileApi = {
  get: pick(
    () => request("/users/me"),
    () => sample.profile
  ),
};
