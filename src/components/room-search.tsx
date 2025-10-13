"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const cities = [
  "Sagar",
  "Bhopal",
  "Bina",
  "Jabalpur",
  "Indore",
  "Damoh",
  "Panna",
  "Chattarpur",
  "Teekamgarh",
  "Niwari",
  "Jhhasi",
];

export const RoomSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("s", searchQuery);
    if (selectedCity) queryParams.set("city", selectedCity);

    router.push(`/rooms?${queryParams.toString()}`);
  };

  return (
    <section className="relative w-full h-[550px] md:h-[720px] bg-[url('')] flex items-center justify-center bg-white">
      <Image src={'/api/media/file/hero-img.jpg'} width={1000} height={1000} alt="rooms near me" className="absolute top-0 pointer-events-none object-cover w-full h-full"/>
      <div className="bg-[#003b95] bg-opacity-50 p-4 md:p-6 rounded-lg text-center m-4 relative z-10">
        <h1 className="!text-white text-4xl font-bold mb-4">
          Find Your Perfect Stay
        </h1>
        <p className="text-white mb-6">
          Discover the best rooms and accommodations nearby.
        </p>
        <form
          className="flex gap-2 flex-wrap justify-center"
          onSubmit={handleSubmit}
        >
          {/* City Input */}
          <Input
            list="city-list"
            type="text"
            placeholder="Enter city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 rounded-md focus:outline-none border text-white"
          />
          <datalist id="city-list">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>

          {/* Search Text */}
          <Input
            type="text"
            placeholder="Search by keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-md focus:outline-none border text-white"
          />

          <Button
            type="submit"
            className="bg-white text-[#003b95] px-6 py-3 rounded-md transition cursor-pointer hover:border hover:text-white"
          >
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};
