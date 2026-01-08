// src/components/RequireAdmin.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Async guard for admin routes.
 * - Uses httpOnly cookie (via /api/auth/me) and withCredentials.
 * - Optional fallback: if localStorage has adminToken (legacy), tries Authorization header.
 */
export default function RequireAdmin({ children }) {
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'unauth'

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        // First, try cookie-based session (preferred)
        const resp = await axios.get(`${API_BASE}/api/auth/me`, {
          withCredentials: true,
          timeout: 8000
        });

        if (!mounted) return;
        if (resp?.data?.success && resp.data?.data?.user?.role === 'admin') {
          setStatus('ok');
          return;
        }

        // If /me returned ok but not admin, treat as unauth
        setStatus('unauth');
      } catch (err) {
        // Fallback: if you have legacy token stored in localStorage (during rollout),
        // try verifying it by calling /api/auth/me with Authorization header.
        const legacy = localStorage.getItem('adminToken');
        if (legacy) {
          try {
            const resp2 = await axios.get(`${API_BASE}/api/auth/me`, {
              headers: { Authorization: `Bearer ${legacy}` },
              timeout: 8000
            });
            if (!mounted) return;
            if (resp2?.data?.success && resp2.data?.data?.user?.role === 'admin') {
              setStatus('ok');
              return;
            }
          } catch (err2) {
            // fallthrough to unauth
          }
        }

        if (mounted) setStatus('unauth');
      }
    }

    checkSession();
    return () => { mounted = false; };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Checking session…</div>
      </div>
    );
  }

  if (status === 'unauth') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
