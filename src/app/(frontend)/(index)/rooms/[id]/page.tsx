'use client'

import { useState, useEffect, use } from 'react'
import { axios } from '@/lib/axios'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { CalendarPlus, MessageCircleQuestion, MapPin } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { Room } from '@/payload-types'
import RoomGallery from '@/components/room-gallary'
import Content from '@/components/content'
import { getUniquePhotos } from '@/lib/utils'
import { RoomReviews } from '@/components/room-reviews'
import { WriteReview } from '@/components/room-review-form'
import RelatedRooms from '@/components/related-rooms'

// @ts-ignore
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
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)

  const addToCart = useCartStore((state) => state.addToCart)
  const router = useRouter()

  useEffect(() => {
    async function fetchRoomById() {
      try {
        const res = await axios.get(`/api/rooms/${id}`)
        setRoom(res.data)
      } catch {
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

  function handleAddToCart() {
    if (!room) return

    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates.')
      return
    }
    addToCart({
      id: room.id,
      title: room.title,
      price: room.pricePerMonth,
      quantity,
      vendor: room.vendor,
      featuredImage: room.featuredImage,
      checkInDate,
      checkOutDate,
    })
    router.push('/checkout')
  }

  const mergedPhotos = getUniquePhotos([...(room.photos || []), room.featuredImage])

  return (
    <div className="mt-16 p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{room.title}</h1>
      <div className="grid grid-cols-12 gap-4">
        {/* Main content */}
        <div className="col-span-12 md:col-span-9">
          {!room.photos?.length && (
            <Image
              width={960}
              height={720}
              src={room.featuredImage?.url || 'https://placehold.co/960x720'}
              alt={room.featuredImage?.alt || 'Room Image'}
              className="w-full max-h-[512px] object-cover shadow-sm rounded-lg mb-6"
            />
          )}
          {mergedPhotos.length > 1 && <RoomGallery photos={mergedPhotos} />}

          <Card className="mb-4 border p-4 block mt-4">
            <h2 className="font-bold text-2xl">About</h2>
            <Content {...room} />
          </Card>

          <Card className="grid grid-cols-2 gap-4 text-sm text-gray-700 p-4">
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
          </Card>

          <Card className="p-4 mt-4">
            <p>
              <strong>Amenities:</strong>
              {room.amenities?.length ? (
                room.amenities.map((am) => (
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
            </p>
          </Card>

          {/* Responsive Google Map Card */}
          <Card className="border p-4 shadow-sm block text-center my-4">
            <h2 className="flex gap-2 text-xl text-left font-bold mb-4 items-center">
              <MapPin size={20} />
              <span>Location</span>
            </h2>

            <div className="w-full overflow-hidden rounded-lg">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src={(room?.googleMapEmbed?.match(/src="([^"]+)"/) || [])[1] || ''}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <p className="mt-2">
              <Link
                href={room.googleMapLink || '#'}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </Link>
            </p>
          </Card>

          <RoomReviews />

          <WriteReview />

          <RelatedRooms room={room} />
        </div>

        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 mt-4 md:mt-0">
          {/* Availability Card */}
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
                disabled={loading}
              >
                {loading ? 'Processing' : 'Add to Cart & Checkout'}
              </button>
            </div>
          </Card>

          {/* Help Card */}
          <Card className="border p-4 shadow-sm block text-center mb-4">
            <h2 className="flex gap-2 text-xl text-left font-bold mb-4 items-center">
              <MessageCircleQuestion size={20} /> <span>Help</span>
            </h2>
            <p>
              <Link
                href={`https://wa.me/918085589371?text=${encodeURIComponent(
                  `Hi, I am booking this room - https://roomsnearme.in/rooms/${room.id}, want some help`,
                )}`}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here
              </Link>{' '}
              to message us on WhatsApp
            </p>
            <p>Contact us - <Link href={'tel:+918085589371'}>91 8085589371</Link></p>
          </Card>
        </div>
      </div>
    </div>
  )
}
