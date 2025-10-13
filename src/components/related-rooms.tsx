'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { axios } from '@/lib/axios'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

interface Room {
  id: string
  title: string
  pricePerMonth: number
  featuredImage?: { url: string }
  area?: string
  city?: string
}

export default function RelatedRooms({ room }: { room: Room }) {
  const city = room.city
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)
  const [nav, setNav] = useState<{ prev: HTMLDivElement | null; next: HTMLDivElement | null }>({
    prev: null,
    next: null,
  })
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)

  // Bind refs after mount so Swiper sees real DOM elements
  useEffect(() => {
    setNav({ prev: prevRef.current, next: nextRef.current })
  }, [])

  useEffect(() => {
    if (!city) return
    setLoading(true)
    axios
      .get('/api/rooms', {
        params: {
          'where[city][equals]': city,
          sort: '-createdAt',
          limit: 10,
        },
      })
      .then((res) => setRooms(res.data.docs))
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load rooms')
      })
      .finally(() => setLoading(false))
  }, [city])

  const slides = useMemo(() => {
    if (loading) {
      return Array.from({ length: 4 }).map((_, i) => (
        <SwiperSlide key={`sk-${i}`} className="py-4 !h-auto">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </SwiperSlide>
      ))
    }
    return rooms.map((rm) => (
      <SwiperSlide key={rm.id} className="py-4 !h-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Link href={`/rooms/${rm.id}`}>
            <Image
              src={rm?.featuredImage?.url || '/images/placeholder.avif'}
              alt={rm?.title || 'Room'}
              className="w-full h-48 object-cover"
              width={400}
              height={300}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold" title={rm?.title}>
                {rm?.title?.slice(0, 24)}
              </h3>
              <div className="text-gray-600 mt-2">
                <p title={rm.area || ''}>
                  <strong>Area: </strong>
                  {rm?.area && rm?.area?.length >= 32 ? rm?.area?.slice(0, 32) + '...' : rm?.area}
                </p>
              </div>
              <p className="text-[#003b95] mt-2 font-bold">₹{rm?.pricePerMonth}/month</p>
              <Button className="bg-[#003b95] text-white mt-3 px-4 py-2 rounded-md">View info.</Button>
            </div>
          </Link>
        </div>
      </SwiperSlide>
    ))
  }, [loading, rooms])

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold my-4">Rooms in {city}</h2>

      {/* Nav buttons */}
      <div
        ref={prevRef}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 hidden sm:flex items-center justify-center"
        aria-label="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M15 19L8 12l7-7" />
        </svg>
      </div>
      <div
        ref={nextRef}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100 hidden sm:flex items-center justify-center"
        aria-label="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <Swiper
        className="py-4"
        loop
        freeMode
        slidesPerView={1}
        spaceBetween={10}
        modules={[Navigation, Pagination]} // <-- IMPORTANT
        navigation={{
          prevEl: nav.prev,
          nextEl: nav.next,
        }}
        onInit={(swiper) => {
          // ensure refs are bound even if they were null at first render
          // @ts-ignore
          swiper.params.navigation.prevEl = nav.prev
          // @ts-ignore
          swiper.params.navigation.nextEl = nav.next
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {slides}
      </Swiper>
    </div>
  )
}
