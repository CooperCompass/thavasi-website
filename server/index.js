import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { closeDb, connectDb, getAccessRequestsCollection } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 3001)
const LANDING_URL = process.env.LANDING_URL || 'http://localhost:5173'
const DIST = path.join(__dirname, '..', 'dist')

const app = express()

const allowedOrigins = [
  LANDING_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean)

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
  try {
    const fullName = str(req.body?.fullName, 120)
    const email = str(req.body?.email, 200)
    const firmName = str(req.body?.firmName, 160)
    const designation = str(req.body?.designation, 120)
    const city = str(req.body?.city, 120)

    if (!fullName || !email || !email.includes('@')) {
      res.status(400).json({ error: 'Full name and a valid email are required.' })
      return
    }
    if (!firmName || !designation || !city) {
      res.status(400).json({ error: 'All fields are required.' })
      return
    }

    const doc = {
      fullName,
      firmName,
      designation,
      city,
      email,
      status: 'new',
      userAgent: (req.headers['user-agent'] || '').toString().slice(0, 500) || null,
      createdAt: new Date(),
    }

    const col = getAccessRequestsCollection()
    const result = await col.insertOne(doc)

    res.status(201).json({ ok: true, id: result.insertedId })
  } catch (err) {
    console.error('Failed to save access request:', err)
    res.status(500).json({ error: 'Failed to submit. Please try again.' })
  }
})

app.use(express.static(DIST))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(DIST, 'index.html'), (err) => {
    if (err) next(err)
  })
})

await connectDb()
console.log('MongoDB connected — collection: access_requests')

const server = app.listen(PORT, () => {
  console.log(`Thavasi website listening on :${PORT}`)
})

const shutdown = async () => {
  server.close()
  await closeDb()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
