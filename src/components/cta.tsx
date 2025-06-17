import Link from 'next/link'

const CTA = () => {
  return (
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
  )
}

export default CTA
