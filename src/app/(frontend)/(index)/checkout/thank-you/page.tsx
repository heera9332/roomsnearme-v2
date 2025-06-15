'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { axios } from '@/lib/axios'
import '@/app/(frontend)/globals.css'
import Link from 'next/link'
import { Coins, Home, Printer } from 'lucide-react'
import Loader from '@/components/loader'
import { Booking } from '@/payload-types'

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const bookingCode = searchParams.get('booking-code')

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingCode) {
        setError('Booking code not found in URL.')
        setLoading(false)
        return
      }

      try {
        const res = await axios.get(`/api/bookings?where[bookingCode][equals]=${bookingCode}`)
        const data = res.data
        if (data && data.docs && data.docs.length > 0) {
          setBooking(data.docs[0])
        } else {
          setError('No booking found for this code.')
        }
      } catch (err) {
        setError('An error occurred while fetching the booking.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingCode])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center text-lg">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div className="max-w-7xl mx-auto py-12 text-center text-red-600">{error}</div>
  }

  if (!booking) return null

  // Format items
  const items = (booking.items || []).map((item: any, idx: number) => (
    <div key={idx} className="border rounded-md p-4 mb-4">
      <div>
        <b>Room:</b>{' '}
        {typeof item.room === 'object'
          ? item.room.title || item.room.name || item.room.id
          : item.room}
      </div>
      <div>
        <b>Check In:</b> {item.checkInDate && new Date(item.checkInDate).toLocaleDateString()}
      </div>
      <div>
        <b>Check Out:</b> {item.checkOutDate && new Date(item.checkOutDate).toLocaleDateString()}
      </div>
      <div>
        <b>Qty:</b> {item.quantity}
      </div>
      <div>
        <b>Price:</b> ₹{item.price}/month
      </div>
    </div>
  ))

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div>
        <div className="bg-green-100 border border-green-300 rounded p-6 mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">Thank You for Your Booking!</h1>
          <div className="text-lg">
            Your booking (<b>{booking.bookingCode}</b>) was successful.
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Booking Details</h2>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <b>Status:</b> {booking.status}
            </div>
            <div>
              <b>Payment:</b> {booking.paymentStatus}
            </div>
            <div>
              <b>Amount Paid:</b> ₹{booking.totalAmount}
            </div>
            {booking?.notes && (
              <div>
                <b>Notes:</b>{' '}
                <ul>
                  {booking?.notes.map((item) => {
                    return <li key={item.id}>{item?.note}</li>
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Booked room</h2>
          {items}
        </div>

        {booking.billing && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Billing Details</h2>
            <div>
              <div>
                <b>Name:</b> {booking.billing.first_name} {booking.billing.last_name}
              </div>
              <div>
                <b>Email:</b> {booking.billing.email}
              </div>
              <div>
                <b>Phone:</b> {booking.billing.phone}
              </div>
              <div>
                <b>Address:</b>{' '}
                {[
                  booking.billing.address_1,
                  booking.billing.address_2,
                  booking.billing.city,
                  booking.billing.state,
                  booking.billing.postcode,
                  booking.billing.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          </div>
        )}

        {booking.shipping && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">Shipping Details</h2>
            <div>
              <div>
                <b>Name:</b> {booking.shipping.first_name} {booking.shipping.last_name}
              </div>
              <div>
                <b>Address:</b>{' '}
                {[
                  booking.shipping.address_1,
                  booking.shipping.address_2,
                  booking.shipping.city,
                  booking.shipping.state,
                  booking.shipping.postcode,
                  booking.shipping.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          </div>
        )}

        <hr />
        <div className="text-center flex gap-2 items-center mt-4">
          <button
            onClick={() => window.print()}
            className="flex gap-2 items-center cursor-pointer  px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            <Printer size={16} />
            Print This Page
          </button>
          <Link
            href="/"
            className="flex gap-2 items-center   px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            href={`/checkout/payment?booking-code=${bookingCode}`}
            className="flex gap-2 items-center px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <Coins size={16} />
            Pay Now
          </Link>
        </div>
      </div>
    </div>
  )
}
