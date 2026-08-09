/**
 * API base for the landing-page backend (MongoDB access-requests).
 * Default: same-origin /api (prod). Override with VITE_API_URL for local dev proxy target.
 */
export function getApiBase() {
  const raw = import.meta.env.VITE_API_URL
  if (!raw || raw === 'same-origin') return '/api'
  const trimmed = String(raw).replace(/\/+$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}
