import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'shashwat_holistic'

let cachedClient = null

// MongoDB connection
async function getDb() {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not configured')
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }

  return cachedClient.db(DB_NAME)
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// OPTIONS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}

// JSON response helper
function json(data, init = {}) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...(init.headers || {}),
    },
  })
}

// ======================================================
// GET API
// ======================================================

export async function GET(request, { params }) {
  try {
    // Next.js 15/16: params is async
    const { path = [] } = await params

    const pathString = path.join('/')

    // -----------------------------
    // Health Check
    // -----------------------------

    if (pathString === '' || pathString === 'health') {
      return json({
        ok: true,
        service: 'Shashwat Holistic Health API',
        time: new Date().toISOString(),
      })
    }

    // -----------------------------
    // Get Appointments
    // -----------------------------

    if (pathString === 'appointments') {
      const db = await getDb()

      const items = await db
        .collection('appointments')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray()

      return json({
        appointments: items.map(({ _id, ...rest }) => rest),
      })
    }

    // -----------------------------
    // Get Testimonials
    // -----------------------------

    if (pathString === 'testimonials') {
      const db = await getDb()

      const items = await db
        .collection('testimonials')
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      return json({
        testimonials: items.map(({ _id, ...rest }) => rest),
      })
    }

    // -----------------------------
    // Route Not Found
    // -----------------------------

    return json(
      {
        error: 'Not found',
      },
      {
        status: 404,
      }
    )
  } catch (e) {
    console.error('GET API Error:', e)

    return json(
      {
        error: e.message || 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}

// ======================================================
// POST API
// ======================================================

export async function POST(request, { params }) {
  try {
    // Next.js 15/16: params is async
    const { path = [] } = await params

    const pathString = path.join('/')

    // Parse request body
    const body = await request.json()

    // ==================================================
    // APPOINTMENTS
    // ==================================================

    if (pathString === 'appointments') {
      const {
        name,
        phone,
        email,
        therapy,
        date,
        time,
        message,
      } = body

      // Validation
      if (!name || !phone) {
        return json(
          {
            error: 'Name and phone are required',
          },
          {
            status: 400,
          }
        )
      }

      const db = await getDb()

      // Appointment document
      const doc = {
        id: uuidv4(),

        name: String(name).trim(),

        phone: String(phone).trim(),

        email: email
          ? String(email).trim()
          : '',

        therapy: therapy
          ? String(therapy).trim()
          : 'General Consultation',

        date: date
          ? String(date).trim()
          : '',

        time: time
          ? String(time).trim()
          : '',

        message: message
          ? String(message).trim()
          : '',

        status: 'new',

        createdAt: new Date().toISOString(),
      }

      // Save appointment
      await db
        .collection('appointments')
        .insertOne(doc)

      return json({
        ok: true,
        message: 'Appointment submitted successfully',
        appointment: doc,
      })
    }

    // ==================================================
    // CONTACT
    // ==================================================

    if (pathString === 'contact') {
      const {
        name,
        email,
        phone,
        message,
      } = body

      // Validation
      if (!name || !message) {
        return json(
          {
            error: 'Name and message are required',
          },
          {
            status: 400,
          }
        )
      }

      const db = await getDb()

      // Contact document
      const doc = {
        id: uuidv4(),

        name: String(name).trim(),

        email: email
          ? String(email).trim()
          : '',

        phone: phone
          ? String(phone).trim()
          : '',

        message: String(message).trim(),

        createdAt: new Date().toISOString(),
      }

      // Save contact
      await db
        .collection('contacts')
        .insertOne(doc)

      return json({
        ok: true,
        message: 'Message submitted successfully',
        contact: doc,
      })
    }

    // ==================================================
    // Route Not Found
    // ==================================================

    return json(
      {
        error: 'Not found',
      },
      {
        status: 404,
      }
    )
  } catch (e) {
    console.error('POST API Error:', e)

    return json(
      {
        error: e.message || 'Internal server error',
      },
      {
        status: 500,
      }
    )
  }
}