// lib/axios.ts
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  // how long to keep a GET response in ms:
  maxAge: 5 * 60 * 1000,          // 5 minutes :contentReference[oaicite:0]{index=0}
  // you can also configure what to exclude, a custom store, etc.
})

// 2️⃣ Create axios instance using that cache adapter
export const API_ENDPOINT = process.env.NEXT_PUBLIC_URL

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  // tell axios to use the cache adapter:
  adapter: cache.adapter           // :contentReference[oaicite:1]{index=1}
})

export { axiosInstance as axios }
