import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Viewport } from 'next'
import { queryPosts } from '@/utils/api'
import { Post } from '@/payload-types'
import { PostsSearch } from '@/components/posts-search'
import { Suspense } from 'react'
import Loader from '@/components/loader'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata = {
  title: 'Blogs | roomsnearme',
  description: 'Browse the latest blogs on roomsnearme. Get updates on tech, lifestyle, and more.',
  keywords: 'blogs, tech, lifestyle, rooms, student life',
}

const Blogs = async () => {
  const posts: Post[] = await queryPosts({})

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-gray-100 rounded-lg p-4 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>
              <Link href="/blogs" className="hover:underline">
                All Blogs
              </Link>
            </li>
            <li>
              <Link href="/blogs?cat=tech" className="hover:underline">
                Tech
              </Link>
            </li>
            <li>
              <Link href="/blogs?cat=life-style" className="hover:underline">
                Lifestyle
              </Link>
            </li>
            <li>
              <Link href="/blogs?cat=student-life" className="hover:underline">
                Student Life
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

          <PostsSearch />

          {posts.length === 0 ? (
            <p className="text-gray-600">No blogs found.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((blog: Post) => (
                <Card
                  key={blog.slug}
                  className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow duration-200 py-0"
                >
                  <CardContent className="p-0">
                    <Link href={`/blogs/${blog.slug}`}>
                      <Image
                        src={blog?.featuredImage?.url || 'https://placehold.co/600x400'}
                        alt={blog.title}
                        width={600}
                        height={400}
                        className="w-full h-[180px] object-cover"
                      />
                    </Link>
                    <div className="p-4 pb-0">
                      <h2 className="text-lg font-semibold mb-2 text-gray-900">{blog.title}</h2>
                      <p className="text-sm text-gray-700 line-clamp-3">{blog.excerpt}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Blogs />
    </Suspense>
  )
}
