'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppStore } from '@/store/app-store'
import { useSearchParams, useRouter } from 'next/navigation'
import { Room } from '@/payload-types'
import { Search, MapPin, IndianRupee } from 'lucide-react'

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

  // States synced with URL
  const [search, setSearch] = useState(searchParams.get('s') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice')) || 0)
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 9999999)

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 12

  // Update URL params
  const updateParams = (params: Record<string, any>) => {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([k, v]) => {
      if (v) sp.set(k, v)
      else sp.delete(k)
    })
    router.push(`/rooms?${sp.toString()}`)
  }

  // Refetch on URL change
  useEffect(() => {
    loadRooms({
      s: searchParams.get('s') || '',
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 12,
      city: searchParams.get('city') || '',
      minPrice: Number(searchParams.get('minPrice')) || 0,
      maxPrice: Number(searchParams.get('maxPrice')) || 99999,
    })
  }, [searchParams, loadRooms])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParams({ s: search, city, minPrice, maxPrice, page: 1, limit })
  }

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage })
  }

  const totalRooms = useAppStore((s) => s.totalRooms) || 100
  const totalPages = Math.ceil(totalRooms / limit)

  return (
    <div>
      {showSearch && (
        <form
          className="mb-6 bg-gray-50 border rounded-md p-4 md:p-6 space-y-4"
          onSubmit={handleSearch}
        >
          {/* --- Row 1: Search + City + Button --- */}
          <div className="flex flex-col justify-center md:flex-row gap-3">
            <div className="flex items-center border rounded px-2 bg-white w-full md:w-1/3">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title..."
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded px-2 bg-white w-full md:w-1/3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="City"
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="bg-[#003b95] text-white px-4 py-2 h-10 rounded w-full md:w-auto"
            >
              Search
            </Button>
          </div>

          {/* --- Divider --- */}
          <div className="border-t my-2"></div>

          {/* --- Row 2: Price Range --- */}
          <div className="flex flex-col justify-center md:flex-row gap-3 mt-4">
            <div className="flex items-center border rounded px-2 bg-white w-full md:w-1/6">
              <IndianRupee className="h-4 w-4 text-gray-400" />
              <input
                type="number"
                placeholder="Min Price"
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              />
            </div>

            <div className="flex items-center border rounded px-2 bg-white w-full md:w-1/6">
              <IndianRupee className="h-4 w-4 text-gray-400" />
              <input
                type="number"
                placeholder="Max Price"
                className="flex-1 bg-transparent px-2 py-2 outline-none"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value) || 99999)}
              />
            </div>
          </div>
        </form>
      )}

      {/* --- Rooms Grid --- */}
      <h2 className="text-2xl font-semibold mb-6">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
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
                    <p title={`${room.area || ''} - ${room.city || ''}`}>
                      <strong>Area: </strong>
                      {(() => {
                        const combined = `${room.area || ''} - ${room.city || ''}`
                        return combined.length > 32 ? combined.slice(0, 32) + '...' : combined
                      })()}
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
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
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
      ) : null}
    </div>
  )
}

export default RoomsList
