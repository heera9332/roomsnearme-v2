'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppStore } from '@/store/app-store'
import { useSearchParams, useRouter } from 'next/navigation'
import { Room } from '@/payload-types'
import Content from '@/components/content'

interface RoomsListProps {
  showSearch?: boolean
  showPagination?: boolean
}

export function RoomsList({ showSearch = false, showPagination = false }: RoomsListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rooms = useAppStore((s) => s.rooms)
  const loadRooms = useAppStore((s) => s.loadRooms)
  const loading = useAppStore((s) => s.loadingRooms)

  // Controlled search/city states for inputs
  const [search, setSearch] = useState(searchParams.get('s') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')

  // Read page/limit from search params
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  // Sync filters with URL
  const updateParams = (params: Record<string, any>) => {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v)
      else sp.delete(k)
    })
    router.push(`/rooms?${sp.toString()}`)
  }

  // When URL params change, fetch
  useEffect(() => {
    loadRooms({
      s: searchParams.get('s') || '',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      city: searchParams.get('city') || '',
    })
  }, [searchParams, loadRooms])

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParams({ s: search, city, page: 1 }) // Reset to page 1
  }

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
  }

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage })
  }

  // You should get `total` from your API for real apps
  // Let's assume each API call also returns a total (update your store accordingly)
  // Here, we'll use a hardcoded value for demonstration:
  const totalRooms = useAppStore((s) => s.totalRooms) || 100 // <-- update to actual
  const totalPages = Math.ceil(totalRooms / limit)

  return (
    <div>
      {showSearch && (
        <form
          className="mb-4 flex flex-col md:flex-row gap-3 border bg-gray-50 py-10 justify-center px-4 xl:px-0 rounded-md"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search by title..."
            className="bg-white border rounded px-3 py-2 w-full md:w-64 h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="bg-white border rounded px-3 py-2 w-full md:w-40 h-10"
            value={city}
            onChange={handleCityChange}
          />
          <Button type="submit" className="bg-[#003b95] text-white px-4 py-2 h-10 rounded">
            Search
          </Button>
        </form>
      )}

      <h2 className="text-2xl font-semibold mb-6">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ))
        ) : rooms && rooms.length > 0 ? (
          rooms.map((room: Room) => (
            <div key={room.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <Link href={`/rooms/${room.id}`}>
                <Image
                  src={room?.featuredImage?.url || 'https://placehold.co/400x300'}
                  alt={room?.title || 'Room'}
                  className="w-full h-48 object-cover hover:scale-[100.2%]"
                  width={400}
                  height={300}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold" title={room?.title}>
                    {room?.title?.slice(0, 24)}
                  </h3>
                  <div className="text-gray-600 mt-2">
                    <p title={room.area || ""}>
                      <strong>Area: </strong>
                      {room?.area && room?.area?.length >= 32
                        ? room?.area?.slice(0, 32) + '...'
                        : room?.area}
                    </p>
                  </div>
                  <p className="text-[#003b95] mt-2 font-bold">₹{room?.pricePerMonth}/month</p>
                  <Button className="cursor-pointer bg-[#003b95] text-white mt-3 px-4 py-2 rounded-md transition hover:bg-[#003b95]">
                    View info.
                  </Button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No rooms available.</p>
        )}
      </div>

      {/* Pagination */}
      {showPagination && rooms.length ? (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            className="px-3 py-1"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? 'default' : 'outline'}
              className="px-3 py-1"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            className="px-3 py-1"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default RoomsList
