'use client'
import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

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
}

export default function RelatedRooms({ room }) {
  const city = room.city
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold my-4">Rooms in {city}</h2>

      <div
        ref={prevRef}
        className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      <div
        ref={nextRef}
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <Swiper
        className="py-4"
        loop
        freeMode
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
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
          : rooms.map((room) => (
              <SwiperSlide key={room.id} className="py-4">
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
                        <p title={room.area || ''}>
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
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  )
}
