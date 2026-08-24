import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Landing-site server.
 *
 * This process holds NO database. Early-access enquiries used to be written to a local
 * MongoDB and read back through a bespoke admin login here; both are gone. Submissions
 * are now forwarded to the Thavasi Scrutiny API, which owns the data in PostgreSQL, and
 * they are reviewed in that app's admin UI.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 3001)
const LANDING_URL = process.env.LANDING_URL || 'http://localhost:5173'
const DIST = path.join(__dirname, '..', 'dist')

// Container-to-container over the shared docker network; the app's nginx proxies /api
// to its FastAPI backend. No TLS needed — this traffic never leaves the host.
const SCRUTINY_API_URL = (
  process.env.SCRUTINY_API_URL || 'http://thavasi-scrutiny-web/api/v1'
).replace(/\/+$/, '')
const UPSTREAM_TIMEOUT_MS = Number(process.env.SCRUTINY_TIMEOUT_MS || 8000)

const app = express()

const allowedOrigins = [LANDING_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'].filter(
  Boolean,
)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(null, false)
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json({ limit: '32kb' }))

const str = (value, max) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/access-requests', async (req, res) => {
  const fullName = str(req.body?.fullName, 120)
  const email = str(req.body?.email, 200)
  const firmName = str(req.body?.firmName, 160)
  const designation = str(req.body?.designation, 120)
  const city = str(req.body?.city, 120)

  // Validate here too: a clear message beats a round-trip for an obviously bad form.
  if (!fullName || !email || !email.includes('@')) {
    res.status(400).json({ error: 'Full name and a valid email are required.' })
    return
  }
  if (!firmName || !designation || !city) {
    res.status(400).json({ error: 'All fields are required.' })
    return
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    const upstream = await fetch(`${SCRUTINY_API_URL}/access-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // preserved for spam triage on the app side
        'User-Agent': (req.headers['user-agent'] || 'thavasi-website').toString().slice(0, 500),
      },
      body: JSON.stringify({
        full_name: fullName,
        firm_name: firmName,
        designation,
        city,
        email,
      }),
      signal: controller.signal,
    })

    if (upstream.status === 201) {
      const body = await upstream.json()
      res.status(201).json({ ok: true, id: body.id })
      return
    }
    if (upstream.status === 429) {
      res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' })
      return
    }
    if (upstream.status === 422) {
      res.status(400).json({ error: 'Please check the details and try again.' })
      return
    }
    console.error('Access request upstream returned', upstream.status)
    res.status(502).json({ error: 'Failed to submit. Please try again.' })
  } catch (err) {
    const reason = err?.name === 'AbortError' ? 'timeout' : err?.message
    console.error('Access request upstream unreachable:', reason)
    res.status(502).json({ error: 'Failed to submit. Please try again.' })
  } finally {
    clearTimeout(timer)
  }
})

app.use(express.static(DIST))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(DIST, 'index.html'), (err) => {
    if (err) next(err)
  })
})

const server = app.listen(PORT, () => {
  console.log(`Thavasi website listening on :${PORT}`)
  console.log(`Access requests forwarded to ${SCRUTINY_API_URL}/access-requests`)
})

const shutdown = () => {
  server.close()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
