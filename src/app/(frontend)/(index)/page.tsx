import '@/app/(frontend)/globals.css'
import { Suspense } from 'react'
import CitiesSlider from '@/components/cities-slider'
import { RoomSearch } from '@/components/room-search'
import RoomsList from '@/components/rooms-list'
import Loader from '@/components/loader'
import Packages from '@/components/packages'
import SectionAboutUs from '@/components/section-about-us'
import CTA from '@/components/cta'
async function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <RoomSearch />

      {/* Featured Listings */}
      <section className="max-w-7xl md:mx-auto p-4 md:p-6">
        <RoomsList />
      </section>

      <section className="max-w-7xl md:mx-auto p-4 px-6 md:py-10">
        <CitiesSlider />
      </section>

      {/* Call to Action */}
      <CTA />

      <SectionAboutUs />

      <section className="py-12 text-center flex flex-col gap-2">
        <Packages />
      </section>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  )
}
