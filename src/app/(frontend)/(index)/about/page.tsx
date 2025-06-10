import { Phone } from "lucide-react";
import React from "react";

function Rooms() {
  return (
    <div className="max-w-7xl mx-auto mt-16 min-h-screen p-4">
      <h1 className="font-semibold text-2xl">About us</h1>

      <section className="my-4">
        <div className="my-2">
          <h3 className="font-semibold text-xl">About Rooms Near Me</h3>
          <p>
            Welcome to Rooms Near Me – your trusted online destination for
            finding the perfect room near your desired location. We believe that
            finding a comfortable, convenient, and affordable living space
            should be simple and stress-free.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold">Our Story</h3>
          <p>
            Founded with a passion for connecting people with quality living
            spaces, Rooms Near Me was created to simplify the room rental
            experience. Our journey began when we recognized the challenges
            people face when searching for a reliable, well-located room. With
            our platform, we set out to bridge the gap between room seekers and
            property owners, ensuring that every listing is verified and meets
            high standards of comfort and convenience.
          </p>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
          <div className="my-2">
            <ul className="flex flex-col gap-2 list-disc ml-6">
              <li>
                <strong>Verified Listings:</strong> We work directly with
                property owners to ensure that you have access to genuine,
                high-quality rooms.
              </li>
              <li>
                <strong>Tailored Searches:</strong> Filter your search by
                location, amenities, and price, making it easy to find a room
                that fits your lifestyle.
              </li>
              <li>
                <strong>Dedicated Support:</strong> Our team is always here to
                assist you, from your first search to settling into your new
                home.
              </li>
            </ul>
          </div>
        </div>

        <div className="my-2">
          <h3 className="text-xl font-semibold mb-2">How we works?</h3>
          <ul className="ml-4 flex flex-col gap-2 list-disc">
            <li>
              <strong>Search room</strong> - Find your room for rent that near
              you and fill the form.
            </li>
            <li>
              <strong>We will get back a call</strong>
            </li>
            <li>
              <strong>Share room location</strong>
            </li>
            <li>
              <strong>No advance payment</strong>
            </li>
            <li>
              <strong>No cancellation fee</strong>
            </li>
          </ul>
        </div>

        <div className="my-2">
          <h2 className="text-xl font-semibold mb2">Contact now</h2>
          <div className="inline-block">
            <div className="mt-2 bg-primary text-white rounded-md px-4 py-2 flex gap-2 cursor-pointer items-center justify-center">
              <Phone size={20} />
              <span>Contact Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rooms;
