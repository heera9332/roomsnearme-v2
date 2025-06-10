import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "Blogs | roomnearme",
  description:
    "Browse the latest blogs on roomnearme. Get updates on tech, lifestyle, and more.",
  keywords: "blogs, tech, lifestyle, roomnearme",
};

interface Blog {
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  featuredImage: string;
}

const blogs: Blog[] = [
  {
    title: "Rooms in sagar",
    slug: "rooms-in-sagar",
    content: "View affordable rooms in sagar, best place for students",
    createdAt: "15/03/2025",
    featuredImage:
      "https://media.roomsnearme.in/wp-content/uploads/2025/03/Cantt_Mall_In_Sagar_City.png",
  },
  {
    title: "Rooms in Damoh",
    slug: "rooms-in-damoh",
    content: "View affordable rooms in damoh, best place for students",
    createdAt: "15/03/2025",
    featuredImage:
      "https://media.roomsnearme.in/wp-content/uploads/2025/03/DamohGhantaghar2.jpg",
  },
];

const Blogs = async () => {
  return (
    <>
      <div className="">
        <div className="min-h-[64vh] mt-16 flex flex-col md:flex-row p-[16px] md:p-0">
          {/* Sidebar */}
          <aside className="w-full md:w-1/6 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Blogs Category</h2>
            <ul>
              <li>
                <Link href="/blogs">All Blogs</Link>
              </li>
              <li>
                <Link href="#">Tech</Link>
              </li>
              <li>
                <Link href="#">Lifestyle</Link>
              </li>
              <li>
                <Link href="#">Students</Link>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </aside>

          {/* Main content */}
          <main className="w-full md:flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4">Blogs</h1>
            <ul className="grid grid-cols-4 gap-2">
              {blogs.map((blog: Blog) => (
                <Card
                  key={blog.slug}
                  className="border col-span-4 md:col-span-1 flex flex-col justify-start gap-0 "
                >
                  <CardContent>
                    <Image
                      className="max-h-[172px] object-cover w-full mb-2"
                      src={blog.featuredImage}
                      width={1000}
                      height={1000}
                      alt={blog.title}
                    />
                    {blog.content}
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <h2 className="w-full text-xl font-semibold">
                      {blog.title}
                    </h2>
                    <div className="w-full">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="mt-2 block text-[] w-full bg-gray-900 text-white px-4 py-2 hover:underline"
                      >
                        View
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default Blogs;
