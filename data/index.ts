// ------------------------ IMPORT USERS -----------------
// // src/endpoints/import-users.ts
// import type { PayloadRequest } from 'payload'
// import fs from 'fs/promises'
// import path from 'path'

// // --- helpers ---------------------------------------------------------------

// const normalizePhone = (val?: string | null) =>
//   (val || '')
//     .replace(/[^\d]/g, '')
//     .replace(/^91(?=\d{10}$)/, '') // strip leading 91 for Indian mobiles if present
//     .slice(-10) || undefined

// const buildUsername = (u: any): string => {
//   const phone = normalizePhone(u.contact)
//   if (phone) return phone
//   if (typeof u.email === 'string' && u.email.includes('@')) {
//     return u.email.split('@')[0].toLowerCase()
//   }
//   // fallback: names + random
//   const base = [u.fName, u.lName].filter(Boolean).join('').toLowerCase() || 'user'
//   return `${base}-${Math.random().toString(36).slice(2, 8)}`
// }

// const buildName = (u: any) =>
//   [u.fName, u.lName].filter(Boolean).join(' ').trim() || undefined

// const makePassword = () =>
//   // 16 chars, mixed; you’ll likely force reset later
//   Math.random().toString(36).slice(2) +
//   Math.random().toString(36).toUpperCase().slice(2)

// // robust-ish email guard; Payload auth adds an email field when using loginWithUsername.allowEmailLogin
// const sanitizeEmail = (email: any) => {
//   if (typeof email !== 'string') return undefined
//   const e = email.trim()
//   return e && /\S+@\S+\.\S+/.test(e) ? e : undefined
// }

// const toNullable = (v: any) => (v === null || v === undefined || v === '' ? undefined : v)

// // --- route -----------------------------------------------------------------

// export const importUsersEndpoint = {
//   path: '/imports/users',
//   method: 'get',
//   handler: async (req: PayloadRequest) => {
//     // Admin gate
//     if (!req.user?.roles?.includes('admin')) {
//       return new Response(
//         JSON.stringify({ ok: false, error: 'Forbidden: admin only' }),
//         { status: 403, headers: { 'content-type': 'application/json' } }
//       )
//     }

//     const filePath = path.join(process.cwd(), 'data', 'users.json')

//     let json: any[]
//     try {
//       const raw = await fs.readFile(filePath, 'utf-8')
//       json = JSON.parse(raw)
//       if (!Array.isArray(json)) throw new Error('users.json must be an array')
//     } catch (e: any) {
//       return new Response(
//         JSON.stringify({ ok: false, error: `Failed to read users.json: ${e.message || e}` }),
//         { status: 500, headers: { 'content-type': 'application/json' } }
//       )
//     }

//     const created: any[] = []
//     const updated: any[] = []
//     const skipped: any[] = []
//     const errors: any[] = []

//     for (const row of json) {
//       try {
//         // Build core fields
//         const username = buildUsername(row)
//         const name = buildName(row)
//         const email = sanitizeEmail(row.email)
//         const roles =
//           (row?.plan && String(row.plan).trim()) || (Number(row?.roomCount) || 0) > 0
//             ? ['vendor']
//             : ['customer']

//         // Check if user exists by username
//         const existingRes = await req.payload.find({
//           collection: 'users',
//           limit: 1,
//           where: { username: { equals: username } },
//         })
//         const existing = existingRes.docs[0]

//         // Common data mapping (only fields that exist in your Users schema)
//         const baseData: any = {
//           name: toNullable(name),
//           username, // required by your schema
//           // email is allowed by auth, but not defined in fields[]: Payload adds it internally
//           email: `${row.contact}@gmail.com`,
//           roles,
//           oldId: row.id,
//           upi: undefined, // none in source
//           billing: {
//             billingFirstName: toNullable(row.fName),
//             billingLastName: toNullable(row.lName),
//             billingAddress1: toNullable(row.address),
//             billingAddress2: undefined,
//             billingCity: toNullable(row.city),
//             billingState: toNullable(row.state),
//             billingPostcode: toNullable(row.pincode),
//             billingCountry: undefined,
//             billingEmail: toNullable(email),
//             billingPhone: toNullable(normalizePhone(row.contact)),
//           },
//           shipping: {
//             shippingFirstName: toNullable(row.fName),
//             shippingLastName: toNullable(row.lName),
//             shippingCompany: undefined,
//             shippingAddress1: toNullable(row.address),
//             shippingAddress2: undefined,
//             shippingCity: toNullable(row.city),
//             shippingState: toNullable(row.state),
//             shippingPostcode: toNullable(row.pincode),
//             shippingCountry: undefined,
//           },
//         }

//         // Upsert
//         if (existing) {
//           // Update lightweight fields only (don’t overwrite usernames)
//           const updatedDoc = await req.payload.update({
//             collection: 'users',
//             id: existing.id,
//             data: baseData,
//           })
//           updated.push({ id: updatedDoc.id, username })
//         } else {
//           const password = makePassword()
//           const createdDoc = await req.payload.create({
//             collection: 'users',
//             data: {
//               ...baseData,
//               password, // required by auth
//             },
//           })
//           created.push({ id: createdDoc.id, username })
//         }
//       } catch (err: any) {
//         errors.push({ source: row?.id || row?.contact || row?.email, error: err.message || String(err) })
//       }
//     }

//     return new Response(
//       JSON.stringify({
//         ok: true,
//         counts: { created: created.length, updated: updated.length, skipped: skipped.length, errors: errors.length },
//         created,
//         updated,
//         skipped,
//         errors,
//       }),
//       { status: 200, headers: { 'content-type': 'application/json' } }
//     )
//   },
// }

import type { PayloadRequest } from 'payload'
import fs from 'fs/promises'
import path from 'path'

// ---------------- helpers ----------------

const toNum = (v: any): number | undefined => {
  const n = parseInt(String(v).replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : undefined
}

const parseDate = (input?: string | null) => {
  if (!input) return undefined
  const d = new Date(input)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

const norm = (s?: string | null) => (s ?? '').trim()

const mapType = (roomType: string): string => {
  const t = roomType.toLowerCase()
  if (t.includes('1 rk')) return '1rk'
  if (t.includes('1 bhk')) return '1bhk'
  if (t.includes('2 bhk')) return '2bhk'
  if (t.includes('3 bhk')) return '3bhk'
  if (t.includes('hostel')) return 'hostel'
  if (t.includes('pg') && t.includes('male')) return 'pg_male'
  if (t.includes('pg') && t.includes('female')) return 'pg_female'
  if (t.includes('shared')) return 'shared'
  return 'other'
}

const mapCity = (cityRaw?: string): 'sagar' | 'damoh' | 'jabalpur' | 'indore' | 'bhopal' | undefined => {
  const c = (cityRaw || '').toLowerCase()
  if (c.includes('sagar')) return 'sagar'
  if (c.includes('damoh')) return 'damoh'
  if (c.includes('jabalpur')) return 'jabalpur'
  if (c.includes('indore')) return 'indore'
  if (c.includes('bhopal')) return 'bhopal'
  return undefined
}

const mapState = (cityRaw?: string): 'mp' | 'up' | undefined => {
  const c = (cityRaw || '').toLowerCase()
  if (c.includes('madhya pradesh') || c.includes('sagar') || c.includes('damoh')) return 'mp'
  if (c.includes('uttar pradesh')) return 'up'
  return undefined
}

const buildTitle = (roomType: string, area?: string, city?: string) => {
  const parts = [norm(roomType)]
  if (area) parts.push(`in ${norm(area)}`)
  else if (city) parts.push(`in ${norm(city).split(',')[0]}`)
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

const yes = (v: any) => String(v).toLowerCase().startsWith('y')

// ---------------- endpoint ----------------

export const importRoomsEndpoint = {
  path: '/imports/rooms',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    // Admin gate
    if (!req.user?.roles?.includes('admin')) {
      return new Response(JSON.stringify({ ok: false, error: 'Forbidden: admin only' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Read file
    const filePath = path.join(process.cwd(), 'data', 'rooms.json')
    let rows: any[]
    try {
      const raw = await fs.readFile(filePath, 'utf-8')
      rows = JSON.parse(raw)
      if (!Array.isArray(rows)) throw new Error('rooms.json must be an array')
    } catch (e: any) {
      return new Response(JSON.stringify({ ok: false, error: `Failed to read rooms.json: ${e.message || e}` }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    const created: any[] = []
    const updated: any[] = []
    const errors: any[] = []

    // Preload media by filename across all rows (optional: batched)
    // We'll lazy-load per row to keep it simple and safe.

    for (const row of rows) {
      try {
        const legacyId = row.id
        const landlordLegacyId = row.landlordId

        // 1) Find vendor by Users.oldId == landlordId
        const userRes = await req.payload.find({
          collection: 'users',
          limit: 1,
          where: { oldId: { equals: String(landlordLegacyId) } }, // assumes you have Users.oldId
        })
        const vendor = userRes.docs[0]
        if (!vendor) {
          errors.push({
            legacyId,
            error: `No user found with oldId=${landlordLegacyId}`,
          })
          continue
        }

        // 2) Try resolve tenant from user (supports either `tenant` or `memberships[0].tenant`)
        let tenantId: string | undefined
        if (vendor.oldId) tenantId = String(vendor.oldId)

        // 3) Map legacy fields to your Rooms schema
        const title = buildTitle(row.roomType, row.area, row.city)
        const type = mapType(row.roomType || '')
        const pricePerMonth = toNum(row.price)
        const availableFrom = parseDate(row.uploadDate)
        const city = mapCity(row.city)
        const state = mapState(row.city)
        const area = norm(row.area)

        // Amenities array -> { amenity: string }[]
        const amenities: { amenity: string }[] = []
        if (yes(row.bathroomAttach)) amenities.push({ amenity: 'Attached Bathroom' })
        if (yes(row.kitchenAvailable)) amenities.push({ amenity: 'Kitchen Available' })
        if (yes(row.waterBillInclude)) amenities.push({ amenity: 'Water Bill Included' })
        if (yes(row.electricBillInclude)) amenities.push({ amenity: 'Electricity Bill Included' })

        // 5) Dedup rule: vendor + title + pricePerMonth
        const existingRes = await req.payload.find({
          collection: 'rooms',
          limit: 1,
          where: {
            and: [
              { vendor: { equals: vendor.id } },
              { title: { equals: title } },
              ...(pricePerMonth ? [{ pricePerMonth: { equals: pricePerMonth } }] : []),
            ],
          },
        })
        const existing = existingRes.docs[0]

        // Build data payload for Rooms create/update
        const data: any = {
          vendor: vendor.id,
          title,
          content: norm(row.remark) || undefined,
          type,
          pricePerMonth,
          availableFrom,
          city,
          state,
          area,
          maxAllowedMembers: toNum(row.capacity),
          furnishing: undefined, // unknown in source
          googleMapLink: undefined,
          googleMapEmbed: undefined,
          amenities,
          status: ['active', 'inactive', 'booked'].includes(String(row.status).toLowerCase())
            ? String(row.status).toLowerCase()
            : 'active',
        }

        // attach tenant if Rooms schema has it and we found it
        if (tenantId) data.tenant = tenantId

        if (existing) {
          const doc = await req.payload.update({
            collection: 'rooms',
            id: existing.id,
            data,
          })
          updated.push({ id: doc.id, legacyId })
        } else {
          const doc = await req.payload.create({
            collection: 'rooms',
            data,
          })
          created.push({ id: doc.id, legacyId })
        }
      } catch (err: any) {
        errors.push({
          source: row?.id,
          error: err?.message || String(err),
        })
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        counts: { created: created.length, updated: updated.length, errors: errors.length },
        created,
        updated,
        errors,
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    )
  },
}
