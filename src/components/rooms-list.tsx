"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { axios } from "@/lib/axios";

// Optionally, add type for room
// type Room = { id: string; featuredImage?: { url?: string }; title?: string; content?: any; pricePerMonth?: number };

export function RoomsList() {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<null | []>(null); // null = not loaded, [] = loaded, but empty

  const getRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/rooms");
      setRooms(response.data.docs || []);
    } catch (error) {
      setRooms([]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const isLoading = loading || rooms === null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Recent added rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            ))
          : rooms && rooms.length > 0
          ? rooms.map((room) => (
              <div key={room.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Link href={`/rooms/${room.id}`}>
                  <Image
                    src={room?.featuredImage?.url || "https://placehold.co/400x300"}
                    alt={room?.title || "Room"}
                    className="w-full h-48 object-cover"
                    width={400}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {room?.title?.slice(0, 24)}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      <RichText data={room?.content} />
                    </p>
                    <p className="text-[#003b95] mt-2 font-bold">
                      ₹{room?.pricePerMonth}/month
                    </p>
                    <Link href={`/contact?roomId=${room.id}`}>
                      <Button className="cursor-pointer bg-[#003b95] text-white mt-3 px-4 py-2 rounded-md transition hover:bg-[#003b95]">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </Link>
              </div>
            ))
          : (
              <p className="col-span-full text-center text-gray-500">
                No rooms available.
              </p>
            )}
      </div>
    </div>
  );
}

export default RoomsList;
