import React from 'react'

const packages = [
  {
    name: 'Free Plan',
    price: 'Free',
    validity: '30 Days',
    oldPrice: null,
    features: [
      { label: 'ID Verified Tenants', included: true },
      { label: 'Unlimited Bookings', included: true },
      { label: 'Expert Photoshoot', included: false },
      { label: 'Expert Video Shoot', included: false },
      { label: 'Verified Property Tag', included: true },
      { label: 'Verified Owner Tag', included: true },
      { label: 'Rooms Listing Limit', value: 'Unlimited' },
      { label: 'Featured Listing', included: true },
      { label: 'Digitally Promoted', included: true },
      { label: '24x7 Customer Support', included: true },
    ],
  },
  {
    name: 'Standard Plan',
    price: '₹599/-',
    validity: '90 Days',
    oldPrice: '₹799/-',
    features: [
      { label: 'ID Verified Tenants', included: true },
      { label: 'Unlimited Bookings', included: true },
      { label: 'Expert Photoshoot', included: true },
      { label: 'Expert Video Shoot', included: false },
      { label: 'Verified Property Tag', included: true },
      { label: 'Verified Owner Tag', included: true },
      { label: 'Rooms Listing Limit', value: 'Unlimited' },
      { label: 'Featured Listing', included: true },
      { label: 'Digitally Promoted', included: true },
      { label: '24x7 Customer Support', included: true },
    ],
  },
  {
    name: 'Premium Plan',
    price: '₹999/-',
    validity: '180 Days',
    oldPrice: '₹1499/-',
    features: [
      { label: 'ID Verified Tenants', included: true },
      { label: 'Unlimited Bookings', included: true },
      { label: 'Expert Photoshoot', included: true },
      { label: 'Expert Video Shoot', included: true },
      { label: 'Verified Property Tag', included: true },
      { label: 'Verified Owner Tag', included: true },
      { label: 'Rooms Listing Limit', value: 'Unlimited' },
      { label: 'Featured Listing', included: true },
      { label: 'Digitally Promoted', included: true },
      { label: '24x7 Customer Support', included: true },
    ],
  },
]

export default function Packages() {
  return (
    <div className="bg-[#F5F7FA] py-12 min-h-screen font-sans">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#003580] mb-2 tracking-tight">
        Choose Your Package
      </h2>
      <p className="text-center text-gray-800 mb-8 text-lg">
        Simple, flexible plans for room landlords
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        {packages.map((pkg, idx) => (
          <div
            key={pkg.name}
            className={`
              relative bg-white rounded-2xl shadow-xl p-7 flex flex-col w-full max-w-xs
              border transition-all duration-200
              ${idx === 2 ? 'border-2 border-[#003580] scale-105' : 'border border-gray-200'}
            `}
          >
            {idx === 2 && (
              <div className="absolute top-4 right-4 bg-[#003580] text-white rounded px-3 py-1 text-xs font-bold tracking-wide z-10">
                Best Value
              </div>
            )}
            <h3 className="text-xl font-bold text-[#003580] mb-2">{pkg.name}</h3>
            <div className="flex items-end gap-2 mb-2">
              {pkg.oldPrice && (
                <span className="line-through text-gray-400 text-base">{pkg.oldPrice}</span>
              )}
              <span className="text-2xl font-extrabold text-[#003580]">{pkg.price}</span>
            </div>
            <div className="inline-block bg-[#003580] text-[#FBBF24] rounded px-3 py-1 font-semibold text-sm mb-4">
              {pkg.validity} Validity
            </div>
            <ul className="mb-6 flex-1">
              {pkg.features.map((feat, i) => (
                <li
                  key={feat.label + i}
                  className={`
                    flex items-center gap-2 text-base mb-2
                    ${feat.included === false ? 'text-gray-300 line-through' : 'text-gray-800 font-medium'}
                  `}
                >
                  {feat.included === true && (
                    <span className="text-[#003580] text-lg font-bold">✔</span>
                  )}
                  {feat.included === false && (
                    <span className="text-gray-200 text-lg font-bold">—</span>
                  )}
                  <span>
                    {feat.label}
                    {feat.value ? `: ${feat.value}` : ''}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="
                mt-auto bg-[#003580] hover:bg-[#032d5a] text-white font-bold py-2 rounded-lg text-base transition
                focus:outline-none focus:ring-2 focus:ring-[#003580] focus:ring-offset-2
              "
            >
              {pkg.name === 'Free Plan' ? 'Get Started Free' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
