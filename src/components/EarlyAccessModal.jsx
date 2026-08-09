import { useEffect, useState } from 'react'
import { getApiBase } from '../lib/apiBase'
import { ArrowIcon } from './ui'

const INITIAL = {
  fullName: '',
  firmName: '',
  designation: '',
  city: '',
  email: '',
}

export function EarlyAccessModal({ open, onClose }) {
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!open) return
    setForm(INITIAL)
    setSubmitted(false)
    setLoading(false)
    setError(null)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !form.fullName.trim() ||
      !form.firmName.trim() ||
      !form.designation.trim() ||
      !form.city.trim() ||
      !form.email.includes('@')
    ) {
      setError('All fields are required, with a valid email address.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${getApiBase()}/access-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          firmName: form.firmName.trim(),
          designation: form.designation.trim(),
          city: form.city.trim(),
          email: form.email.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Submission failed.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err?.message || 'Could not submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="ea-modal-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h3 id="ea-modal-title">Request early access</h3>
        <p className="modal-sub">
          All fields marked <span className="req-star">*</span> are required.
        </p>
        {!submitted ? (
          <form className="ea-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>
                Full name <span className="req-star">*</span>
              </label>
              <input
                required
                placeholder="Your name"
                value={form.fullName}
                onChange={update('fullName')}
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="field">
              <label>
                Firm name <span className="req-star">*</span>
              </label>
              <input
                required
                placeholder="Company / firm"
                value={form.firmName}
                onChange={update('firmName')}
                disabled={loading}
              />
            </div>
            <div className="field">
              <label>
                Designation <span className="req-star">*</span>
              </label>
              <input
                required
                placeholder="e.g. Operations Manager"
                value={form.designation}
                onChange={update('designation')}
                disabled={loading}
              />
            </div>
            <div className="field">
              <label>
                City <span className="req-star">*</span>
              </label>
              <input
                required
                placeholder="City"
                value={form.city}
                onChange={update('city')}
                disabled={loading}
              />
            </div>
            <div className="field full">
              <label>
                Work email <span className="req-star">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={update('email')}
                disabled={loading}
              />
            </div>
            {error && <div className="ea-error">{error}</div>}
            <div className="ea-submit">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit request'} {!loading && <ArrowIcon />}
              </button>
            </div>
          </form>
        ) : (
          <div className="ea-confirm">
            Thank you. We&apos;ll review your request and get in touch.
          </div>
        )}
      </div>
    </div>
  )
}
