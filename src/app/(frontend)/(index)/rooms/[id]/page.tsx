'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useState, useEffect, use } from 'react'
import { axios } from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { CalendarPlus, MessageCircleQuestion } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { Room } from '@/payload-types'

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateStr).toLocaleDateString('en-US', options)
}

interface Args {
  params: Promise<{ id: string }>
  searchParams?: Record<any, any>[]
}

export default function RoomSinglePage({ params }: Args) {
  const { id } = use(params)
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [vendor, setVendor] = useState('')

  // Date state
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)

  const addToCart = useCartStore((state) => state.addToCart)
  const router = useRouter()

  useEffect(() => {
    async function fetchRoomById() {
      try {
        const res = await axios.get(`/api/rooms/${id}`)
        setRoom(res?.data) // adjust if API is different
        setVendor((_prev) => res?.data?.vendor)
      } catch (error) {
        setRoom(null)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchRoomById()
  }, [id])

  if (loading) {
    return (
      <div className="mt-16 p-4">
        <Loader />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="mt-16 p-4">
        <h1 className="text-3xl font-semibold">Room not found</h1>
      </div>
    )
  }

  // Handler for Add to Cart button
  function handleAddToCart() {
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates.')
      return
    }
    addToCart({
      id: room?.id,
      title: room?.title,
      price: room?.pricePerMonth,
      quantity,
      vendor: room?.vendor,
      featuredImage: room?.featuredImage,
      checkInDate,
      checkOutDate,
    })
    router.push('/checkout')
  }

  return (
    <div className="mt-16 p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{room?.title}</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-9">
          <Image
            width={960}
            height={720}
            src={room.featuredImage?.url || 'https://placehold.co/960x720'}
            alt={room.featuredImage?.alt || 'Room Image'}
            className="w-full h-1/2 object-cover rounded-lg mb-6"
          />

          <div className="mb-4">
            <RichText data={room?.content} />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-2">
            <div className="text-[16px]">
              <strong>Status:</strong> {room.status}
            </div>
            <div className="text-[16px]">
              <strong>Price:</strong> ₹{room.pricePerMonth}/month
            </div>
            <div className="text-[16px]">
              <strong>Type:</strong> {room.type}
            </div>
            <div className="text-[16px]">
              <strong>Furnishing:</strong> {room.furnishing || 'N/A'}
            </div>
            <div className="text-[16px]">
              <strong>Available From:</strong> {formatDate(room.availableFrom)}
            </div>
            <div className="text-[16px]">
              <strong>Max Allowed Members:</strong> {room.maxAllowedMembers}
            </div>
            <div className="text-[16px]">
              <strong>Area:</strong> {room.area || 'N/A'}
            </div>
            <div className="text-[16px]">
              <strong>City:</strong> {room.city || 'N/A'}
            </div>
            <div className="text-[16px]">
              <strong>State:</strong> {room.state || 'N/A'}
            </div>
            <div className="text-[16px]">
              <strong>Created At:</strong> {formatDate(room.createdAt)}
            </div>
            <div className="text-[16px]">
              <strong>Updated At:</strong> {formatDate(room.updatedAt)}
            </div>
          </div>

          <div className="mt-4">
            <strong>Amenities:</strong>
            {room.amenities?.length ? (
              room.amenities.map((am: any) => (
                <span
                  key={am.id}
                  className="text-sm text-green-700 mx-1 px-2 py-1 rounded-md bg-green-100"
                >
                  {am.amenity}
                </span>
              ))
            ) : (
              <span> None</span>
            )}
          </div>
        </div>
        {/* SIDEBAR with calendars and add-to-cart */}
        <div className="col-span-12 md:col-span-3">
          <Card className="border p-4 shadow-sm block text-center mb-4">
            <h2 className="text-xl text-left font-bold mb-4 flex gap-2 items-center">
              <CalendarPlus size={20} />
              <span>Check Availability</span>
            </h2>
            <div className="mb-4">
              <div>
                <label className="block font-medium mb-2">Check-in Date:</label>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">Check-out Date:</label>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={room.maxAllowedMembers || 10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border rounded px-2 py-1 ml-2"
                  readOnly
                />
              </div>
              <button
                className="cursor-pointer mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition w-full"
                onClick={handleAddToCart}
              >
                Add to Cart & Checkout
              </button>
            </div>
          </Card>

          {/* ...other sidebar cards unchanged... */}
          <Card className="border p-4 shadow-sm block text-center mb-4">
            <h2 className="flex gap-2 text-xl text-left font-bold mb-4 items-center">
              <MessageCircleQuestion size={20} /> <span>Help</span>
            </h2>
            <div>
              <p>
                <Link
                  href={`https://wa.me/918085589371?text=${encodeURIComponent(
                    `Hi, I am booking this room - https://roomsnearme.in/rooms/${room.id}, want some help`,
                  )}`}
                  className="px-2 text-blue-600 cursor-pointer"
                >
                  Click here
                </Link>
                to message us on WhatsApp
              </p>
            </div>
          </Card>

          <Card className="border p-4 shadow-sm block text-center mb-4">
            <h2 className="flex gap-2 text-xl text-left font-bold mb-4 items-center">
              <MessageCircleQuestion size={20} /> <span>Google Map</span>
            </h2>
            <div>
              <p>
                <Link
                  href={room?.googleMapLink || '#'}
                  className="px-2 text-blue-600 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here
                </Link>
                to view on Google Maps
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
