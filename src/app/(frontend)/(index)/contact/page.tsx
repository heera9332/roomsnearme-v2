"use client";
import { axios } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";
// Use Loader2 instead of Loader if that's the correct export from lucide-react.
import { Loader2 } from "lucide-react";

function Rooms() {
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Form Data:", formData);

    try {
      setLoading(true);
      const response = await axios.post(`/api/forms`, formData);
      const data = response.data;
      if (data) {
        toast.success("Form submitted");
      }
    } catch (error: any) {
      toast.error("Can't submit the form");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({ ...formData, roomId: search?.get("roomId") });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20 min-h-screen">
      <h1 className="font-semibold text-2xl mb-4 md:text-left">Contact</h1>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="md:mx-4 md:mx-auto p-4 bg-white shadow-md rounded-md mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone
          </label>
          <input
            required
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="checkIn"
            className="block text-gray-700 font-medium mb-2"
          >
            Check-in Date
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="checkOut"
            className="block text-gray-700 font-medium mb-2"
          >
            Check-out Date
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="guests"
            className="block text-gray-700 font-medium mb-2"
          >
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="text-center flex justify-center cursor-pointer px-4 py-2 bg-primary text-white font-medium rounded hover:bg-blue-800 transition"
        >
          {loading ? <Loader2 /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export const RoomsPage = () => {
  return (
    <Suspense fallback={<Loader2 />}>
      <Rooms />
    </Suspense>
  );
};

export default RoomsPage;
