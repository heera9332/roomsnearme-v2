const SectionAboutUs = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl bg-white md:mx-auto p-4 md:px-6 md:py-20 py-4">
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
      </div>
    </section>
  )
}

export default SectionAboutUs
