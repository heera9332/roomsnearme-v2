import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Attachment } from '@/types'
import Image from 'next/image'
import { Media } from '@/payload-types'

const bookingBlue = 'bg-[#003580]'

export default function RoomGallery({ photos }: { photos: Media[] }) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null)


  return (
    <div className="w-full mx-auto">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        navigation
        keyboard
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Thumbs, Keyboard]}
        className="rounded-xl shadow-lg mb-4"
      >
        {photos.map((photo: Media) => (
          <SwiperSlide key={photo.id}>
            <Image
              width={960}
              height={720}
              src={photo?.url ?? ''}
              alt={photo.alt}
              className="w-full h-64 md:h-[620px] object-cover rounded-xl"
              style={{ background: '#eee' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={Math.min(photos.length, 6)}
        watchSlidesProgress
        modules={[Thumbs]}
        className="rounded-md"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <Image
              width={1000}
              height={1000}
              src={photo.url}
              alt={photo.alt}
              className={`h-16 md:h-20 w-full object-cover rounded-md border-2 border-transparent cursor-pointer transition-all`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
