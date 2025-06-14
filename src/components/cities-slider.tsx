'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const citties = [
  {
    name: 'Sagar',
    roomsLink: '/blogs/rooms-in-sagar',
    cityImages:
      'https://media.roomsnearme.in/wp-content/uploads/2025/03/Cantt_Mall_In_Sagar_City.png',
  },
  {
    name: 'Damoh',
    roomsLink: '/blogs/rooms-in-damoh',
    cityImages: 'https://media.roomsnearme.in/wp-content/uploads/2025/03/DamohGhantaghar2.jpg',
  },
  {
    name: 'Chhattarpur',
    cityImages:
      'https://media.roomsnearme.in/wp-content/uploads/2025/03/Khajuraho.KandariyaMahadeva-scaled.jpg',
  },
  {
    name: 'Teekamkamgarh',
    cityImages:
      'https://media.roomsnearme.in/wp-content/uploads/2025/03/Interior_View_of_Janaki_Temple_Janakpur-September_22_2016-IMG_7454.jpg',
  },
  {
    name: 'Panna',
    cityImages: 'https://media.roomsnearme.in/wp-content/uploads/2025/03/Parnami_temple_panna.jpg',
  },
  {
    name: 'Niwari',
    cityImages:
      'https://media.roomsnearme.in/wp-content/uploads/2025/03/Chhatris-Cenotaphs_on_the_bank_of_Betwa_RiverOrcha_Madhya_Pradesh.jpg',
  },
  {
    name: 'Jhhasi',
    cityImages: 'https://media.roomsnearme.in/wp-content/uploads/2025/03/Ram_Raja_Temple.jpg',
  },
]

function CitiesSlider() {
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="w-full relative">
      <h2 className="text-2xl font-semibold mb-6">Rooms In Cities</h2>

      {/* Custom Navigation Buttons */}
      <div
        ref={prevRef}
        className="mt-6 absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
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
        className="mt-6 absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
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
        loop
        freeMode
        slidesPerView={1}
        spaceBetween={10}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
      >
        {citties.map((city, index) => (
          <SwiperSlide key={index}>
            <Link href={`rooms?city=${city.name}`}>
              <div className="relative overflow-hidden shadow-md rounded-lg">
                <Image
                  width={1000}
                  height={1000}
                  src={city.cityImages}
                  alt={city.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                  {city.name}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CitiesSlider
