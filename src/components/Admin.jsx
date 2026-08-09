import { useEffect, useState } from 'react'
import { getApiBase } from '../lib/apiBase'

const TOKEN_KEY = 'thavasi-admin-token'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function AdminLogin({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setEmail('')
    setPassword('')
    setError(null)
    setLoading(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${getApiBase()}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Login failed.')
      localStorage.setItem(TOKEN_KEY, data.token)
      onSuccess()
    } catch (err) {
      setError(err?.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div className="modal-box admin-login-box" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h3 id="admin-login-title">Admin login</h3>
        <p className="modal-sub">Cooper Compass staff only.</p>
        <form className="ea-form admin-login-form" onSubmit={submit}>
          <div className="field full">
            <label>Email</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="field full">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {error && <div className="ea-error">{error}</div>}
          <div className="ea-submit">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AdminPanel({ onLogout }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${getApiBase()}/admin/access-requests`, {
          headers: { Authorization: `Bearer ${getAdminToken()}` },
        })
        if (res.status === 401) {
          clearAdminToken()
          onLogout()
          return
        }
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.error || 'Failed to load.')
        if (!cancelled) setRows(data.requests || [])
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [onLogout])

  const logout = () => {
    clearAdminToken()
    onLogout()
  }

  return (
    <div className="admin-panel">
      <div className="wrap admin-panel-inner">
        <div className="admin-panel-head">
          <div>
            <div className="eyebrow">ADMIN</div>
            <h2>Early access requests</h2>
            <p>{rows.length} submission{rows.length === 1 ? '' : 's'}</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            Sign out
          </button>
        </div>

        {loading && <p className="admin-muted">Loading…</p>}
        {error && <p className="ea-error">{error}</p>}

        {!loading && !error && rows.length === 0 && (
          <p className="admin-muted">No requests yet.</p>
        )}

        {!loading && rows.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitted</th>
                  <th>Name</th>
                  <th>Firm</th>
                  <th>Role</th>
                  <th>City</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>{r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}</td>
                    <td>{r.fullName}</td>
                    <td>{r.firmName}</td>
                    <td>{r.designation}</td>
                    <td>{r.city}</td>
                    <td>
                      <a href={`mailto:${r.email}`}>{r.email}</a>
                    </td>
                    <td>
                      <span className="admin-status">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
