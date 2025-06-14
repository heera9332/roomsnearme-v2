import '@/app/(frontend)/globals.css'
import CitiesSlider from '@/components/cities-slider'
import { RoomSearch } from '@/components/room-search'
// import CitiesSlider from "@/components/cities-slider";
// import BrowseByPropertyType from "@/components/property-types";
import RoomsList from '@/components/rooms-list'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <RoomSearch />

      {/* Featured Listings */}
      <section className="max-w-7xl md:mx-auto p-4 md:p-6">
        <RoomsList />
      </section>

      <section className="max-w-7xl md:mx-auto p-4 md:px-6 md:py-10">
        <CitiesSlider />
      </section>

      <section className="max-w-7xl md:mx-auto p-4 md:px-6 md:py-10 my-4">
        {/* <BrowseByPropertyType /> */}
      </section>

      {/* Call to Action */}
      <section className="bg-[#003b95] text-white py-12 text-center flex flex-col gap-2">
        <div className="cta-content">
          <h2 className="text-2xl font-semibold mb-2">Ready to Book Your Stay?</h2>
          <p className="mb-6 text-white">
            Get the best deals on nearby stays – book instantly and stress-free.
          </p>
        </div>
        <div className="text-center">
          <Link
            href={'/rooms'}
            className="inline-block bg-white text-[#003b95] mt-4 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="max-w-7xl md:mx-auto p-4 md:px-6 md:py-10 my-4">
        <h2 className="text-2xl font-semibold mb-2">About us</h2>

        <div className="my-2">
          <h3 className="font-semibold text-xl">About Rooms Near Me</h3>
          <p>
            Welcome to Rooms Near Me – your trusted online destination for finding the perfect room
            near your desired location. We believe that finding a comfortable, convenient, and
            affordable living space should be simple and stress-free.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold">Our Story</h3>
          <p>
            Founded with a passion for connecting people with quality living spaces, Rooms Near Me
            was created to simplify the room rental experience. Our journey began when we recognized
            the challenges people face when searching for a reliable, well-located room. With our
            platform, we set out to bridge the gap between room seekers and property owners,
            ensuring that every listing is verified and meets high standards of comfort and
            convenience.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold">Why Choose Us?</h3>
          <div className="my-2">
            <ul className="flex flex-col gap-2 list-disc ml-6">
              <li>
                <strong>Verified Listings:</strong> We work directly with property owners to ensure
                that you have access to genuine, high-quality rooms.
              </li>
              <li>
                <strong>Tailored Searches:</strong> Filter your search by location, amenities, and
                price, making it easy to find a room that fits your lifestyle.
              </li>
              <li>
                <strong>Dedicated Support:</strong> Our team is always here to assist you, from your
                first search to settling into your new home.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
