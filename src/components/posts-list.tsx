import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Post } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="max-w-7xl mx-auto py-4">
      {posts.map((post) => (
        <Card key={post.id} className="border col-span-1 flex flex-col justify-start gap-0">
          <CardContent>
            <Image
              className="max-h-[172px] object-cover w-full mb-2"
              src={post.featuredImage?.url || '/placeholder.jpg'}
              width={1000}
              height={1000}
              alt={post.title}
            />
            {post.excerpt || (typeof post.content === 'string' ? post.content : '')}
          </CardContent>
          <CardFooter className="flex flex-col">
            <h2 className="w-full text-xl font-semibold">{post.title}</h2>
            <div className="w-full">
              <Link
                href={`/blogs/${post.slug || post.id}`}
                className="mt-2 block w-full bg-gray-900 text-white px-4 py-2 hover:underline"
              >
                View
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </ul>
  )
}
