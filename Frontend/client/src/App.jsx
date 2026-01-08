// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Landing from './pages/LandingPage';
import RequireAdmin from './components/RequireAdmin';

/* -----------------------
   Helper: API base URL
   ----------------------- */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* -----------------------
   Login Page (cookie auth)
   ----------------------- */
function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // On mount, try to restore session (server-side cookie)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await axios.get(`${API_BASE}/api/auth/me`, { withCredentials: true, timeout: 5000 });
        if (!mounted) return;
        if (resp?.data?.success && resp?.data?.data?.user?.role === 'admin') {
          navigate('/admin', { replace: true });
        }
      } catch (_) {
        // not logged in — nothing to do
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      // NOTE: withCredentials true is crucial so browser accepts httpOnly cookie
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true, timeout: 10000 }
      );

      if (res?.data?.success !== true) {
        throw new Error(res?.data?.error || 'Login failed');
      }

      // No token to store in localStorage — cookie was set by server
      navigate('/admin', { replace: true });
    } catch (err) {
      console.error('Login error', err?.response || err.message);
      setError(err?.response?.data?.error || 'Invalid credentials or server error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Wstitch — Admin Login</h1>

        {error && <div role="alert" className="text-red-600 mb-3 text-sm">{error}</div>}

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 mb-4 w-full px-3 py-2 border rounded"
          placeholder="admin@wstitch.com"
          disabled={busy}
        />

        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 mb-6 w-full px-3 py-2 border rounded"
          placeholder="Your password"
          disabled={busy}
        />

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-brand-gold text-white py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

/* -----------------------
   Admin Dashboard component (cookie-based)
   ----------------------- */
function AdminDashboardInner() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // logout should call server to clear cookie
  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout request failed', err?.response?.data || err.message);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchLeads = async () => {
      setLoading(true);
      try {
        // use cookie auth (withCredentials)
        const res = await axios.get(`${API_BASE}/api/admin/leads`, { withCredentials: true, timeout: 8000 });
        if (!mounted) return;
        setLeads(res.data?.data || []);
      } catch (err) {
        console.error('Fetch leads error', err?.response || err.message);
        // unauthorized or forbidden -> redirect to login
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          navigate('/login', { replace: true });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchLeads();

    return () => { mounted = false; };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-brand-gold flex items-center justify-center text-white font-bold">W</div>
          <div>
            <div className="font-semibold">Wstitch Admin</div>
            <div className="text-xs text-gray-500">Manage leads</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
        </div>
      </header>

      <main className="p-8">
        <h1 className="text-2xl font-bold mb-6">Leads</h1>

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <div className="grid gap-4">
            {leads.length === 0 && <div className="text-gray-600">No leads yet.</div>}
            {leads.map((l) => (
              <div key={l._id} className="border p-4 rounded bg-white">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-lg font-semibold">{l.name}</div>
                    <div className="text-sm text-gray-600">{l.email} • {l.phone}</div>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(l.createdAt).toLocaleString()}</div>
                </div>
                {l.message && <p className="mt-3 text-gray-700 whitespace-pre-wrap">{l.message}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* -----------------------
   App wrapper + Routes
   ----------------------- */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboardInner />
            </RequireAdmin>
          }
        />
        {/* fallback -> go to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
