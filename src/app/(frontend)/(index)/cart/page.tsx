'use client'
import './cart.css'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function getDaysDiff(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 1
  const d1 = new Date(checkIn)
  const d2 = new Date(checkOut)
  const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 1
}

function formatDate(dateStr: string | Date) {
  if (!dateStr) return ''
  return new Date(dateStr).toISOString().split('T')[0]
}

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const router = useRouter()

  const [dates, setDates] = useState<{ [id: string]: { checkIn: string; checkOut: string } }>({})

  const handleDateChange = (id: string, key: 'checkIn' | 'checkOut', value: string) => {
    setDates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }))
  }

  function perDayPrice(item: any) {
    return Math.round(item.price / 30)
  }

  function itemTotal(item: any) {
    const stateDate = dates[item.id] || {}
    const checkIn = stateDate.checkIn || item.checkInDate
    const checkOut = stateDate.checkOut || item.checkOutDate
    const days = getDaysDiff(checkIn, checkOut)
    return perDayPrice(item) * days
  }

  const total = items.reduce((sum, item) => sum + itemTotal(item), 0)

  if (!items.length) {
    return (
      <div className="max-w-7xl mx-auto mt-16 p-6">
        <h2 className="text-2xl font-bold">Cart</h2>
        <p className="text-gray-700 my-4">Your cart is empty.</p>
        <Link href="/rooms" className="text-blue-600 underline">
          Continue to explore rooms
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 xl:px-0">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max whitespace-nowrap mb-4 border responsive-table">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Room</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Check‑In</th>
              <th className="p-2 text-left">Check‑Out</th>
              <th className="p-2 text-left">Price/Day</th>
              <th className="p-2 text-left">Days</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const state = dates[item.id] || {}
              const checkIn = state.checkIn || formatDate(item.checkInDate)
              const checkOut = state.checkOut || formatDate(item.checkOutDate)
              const days = getDaysDiff(checkIn, checkOut)

              return (
                <tr key={item.id} className="border-t">
                  <td data-label="Room" className="p-2">
                    <Link href={`/rooms/${item.id}`} className="text-blue-700">
                      {item.title}
                    </Link>
                  </td>
                  <td data-label="Image" className="p-2">
                    <Image
                      src={item.featuredImage?.url || '/assets/images/placeholder.png'}
                      alt={item.title}
                      width={80}
                      height={60}
                    />
                  </td>
                  <td data-label="Check‑In" className="p-2">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => handleDateChange(item.id, 'checkIn', e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  </td>
                  <td data-label="Check‑Out" className="p-2">
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => handleDateChange(item.id, 'checkOut', e.target.value)}
                      className="border rounded px-2 py-1"
                    />
                  </td>
                  <td data-label="Price/Day" className="p-2">
                    ₹{perDayPrice(item)}
                  </td>
                  <td data-label="Days" className="p-2">
                    {days}
                  </td>
                  <td data-label="Total" className="p-2 font-bold">
                    ₹{itemTotal(item)}
                  </td>
                  <td data-label="" className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-2">
        <span className="text-xl font-bold">Total: ₹{total}</span>
        <button
          className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
          onClick={() => router.push('/checkout')}
        >
          Process to checkout
        </button>
      </div>

      <button className="text-gray-600 hover:underline" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}
