'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'
import '@/app/(frontend)/globals.css'
import { Copy } from 'lucide-react'
import Link from 'next/link'
import Loader from '@/components/loader'
import { Skeleton } from '@/components/ui/skeleton'

type Booking = {
  amount: number
  bookingCode: string
  billing?: any
}

const UPI_ID = '8085589371@ybl' // Set your UPI ID here

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const bookingCode = searchParams.get('booking-code')

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!bookingCode) {
      setError('Booking code not found in URL.')
      setLoading(false)
      return
    }

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/api/bookings?where[bookingCode][equals]=${bookingCode}`)
        const data = res.data
        if (data && data.docs && data.docs.length > 0) {
          setBooking(data.docs[0])
        } else {
          setError('No booking found for this code.')
        }
      } catch {
        setError('Error fetching booking details.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingCode])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center text-lg flex justify-center">
        <Skeleton className="max-w-md border border-gray-100 p-8 h-[420px] min-w-[320px]" />
      </div>
    )
  }

  if (error) {
    return <div className="max-w-7xl mx-auto py-12 text-center text-red-600">{error}</div>
  }

  if (!booking) return null

  const upiString = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
    booking.billing?.first_name || 'Customer',
  )}&am=${booking.amount}&tn=Booking%20${booking.bookingCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiString)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-5 text-blue-800 text-center">Payment</h1>

        <div className="flex justify-between mb-4 border-b pb-4">
          <div className="text-gray-600">Booking Code:</div>
          <div className="font-mono font-semibold text-blue-700">{booking.bookingCode}</div>
        </div>

        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="text-gray-500 text-sm">Amount to Pay</div>
          <div className="text-3xl font-bold text-green-700 mb-1">₹{booking.amount}</div>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="mb-2">
            <QRCodeSVG value={upiString} size={200} />
          </div>
          <div className="text-gray-600 text-xs mb-3">Scan to pay via UPI</div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs bg-gray-100 p-1 rounded border">{upiString}</span>
            <button
              title="Copy UPI payment string"
              aria-label="Copy"
              onClick={handleCopy}
              className="ml-1 text-gray-700 hover:text-green-700"
            >
              <Copy size={18} />
            </button>
            {copied && <span className="text-green-600 text-xs ml-2">Copied!</span>}
          </div>
        </div>

        <div className="text-gray-700 text-sm mb-1 text-center">
          <span className="font-semibold">UPI ID:</span> <span className="font-mono">{UPI_ID}</span>
        </div>

        <div className="text-gray-500 text-xs text-center mb-3">
          After payment, please note your transaction reference for faster confirmation.
        </div>

        <div className="text-center mt-4">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
