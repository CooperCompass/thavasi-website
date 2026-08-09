/**
 * Backend API base URL. Matches clearmateai-v1 getApiBase():
 * VITE_API_URL is the bare origin; we always append /api.
 */
export function getApiBase() {
  const raw = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')
  return raw.endsWith('/api') ? raw : `${raw}/api`
}
