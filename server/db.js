import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'thavasi_landing'
const COLLECTION = 'access_requests'

/** @type {import('mongodb').Collection | null} */
let collection = null
/** @type {MongoClient | null} */
let client = null

export async function connectDb() {
  if (collection) return collection

  client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  collection = db.collection(COLLECTION)

  await collection.createIndex({ createdAt: -1 })
  await collection.createIndex({ email: 1, createdAt: -1 })

  return collection
}

export function getAccessRequestsCollection() {
  if (!collection) throw new Error('MongoDB not connected')
  return collection
}

export async function closeDb() {
  if (client) {
    await client.close()
    client = null
    collection = null
  }
}
