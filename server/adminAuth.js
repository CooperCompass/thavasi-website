import crypto from 'crypto'

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'system@coopercompass.com').toLowerCase()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'coopercompass@1234#2026@admin'
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'thavasi-landing-admin-secret-change-me'

function timingSafeEqualStr(a, b) {
  const ba = Buffer.from(String(a))
  const bb = Buffer.from(String(b))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export function verifyAdminCredentials(email, password) {
  const e = String(email || '').trim().toLowerCase()
  const p = String(password || '')
  return timingSafeEqualStr(e, ADMIN_EMAIL) && timingSafeEqualStr(p, ADMIN_PASSWORD)
}

export function issueAdminToken() {
  const exp = Date.now() + 24 * 60 * 60 * 1000
  const payload = `${ADMIN_EMAIL}:${exp}`
  const sig = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

export function verifyAdminToken(token) {
  try {
    const raw = Buffer.from(String(token || ''), 'base64url').toString('utf8')
    const parts = raw.split(':')
    if (parts.length !== 3) return false
    const [email, expStr, sig] = parts
    const exp = Number(expStr)
    if (!email || !exp || Date.now() > exp) return false
    const payload = `${email}:${exp}`
    const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('hex')
    if (!timingSafeEqualStr(sig, expected)) return false
    return email.toLowerCase() === ADMIN_EMAIL
  } catch {
    return false
  }
}

export function adminAuthMiddleware(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!verifyAdminToken(token)) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  next()
}
