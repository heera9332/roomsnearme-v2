import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Viewport } from 'next'
import { queryPosts } from '@/utils/api'
import { Post } from '@/payload-types' 

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata = {
  title: 'Blogs | roomnearme',
  description: 'Browse the latest blogs on roomnearme. Get updates on tech, lifestyle, and more.',
  keywords: 'blogs, tech, lifestyle, roomnearme',
}

const Blogs = async () => {
  const posts: Post[] = await queryPosts({})

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
                <Link href="/blogs?cat=tech">Tech</Link>
              </li>
              <li>
                <Link href="/blogs?cat=life-style">Lifestyle</Link>
              </li>
              <li>
                <Link href="/blogs?cat=student-life#">Students</Link>
              </li>
            </ul>
          </aside>

          {/* Main content */}
          <main className="w-full md:flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4">Blogs</h1>
            <ul className="grid grid-cols-4 gap-2">
              {posts.map((blog: Post) => (
                <Card
                  key={blog.slug}
                  className="border col-span-4 md:col-span-1 flex flex-col justify-start gap-0 "
                >
                  <CardContent>
                    <Image
                      className="max-h-[172px] object-cover w-full mb-2"
                      src={blog?.featuredImage?.url}
                      width={1000}
                      height={1000}
                      alt={blog.title}
                    />
                    <div className="post-excerpts">{blog.excerpt}</div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <div className="w-full">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="mt-2 block text-[] w-full bg-gray-900 text-white px-4 py-2 hover:underline"
                      >
                        <h2 className="w-full text-xl font-semibold">{blog.title}</h2>
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
  )
}

export default Blogs
