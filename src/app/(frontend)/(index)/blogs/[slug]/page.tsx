import "../blog-style.css";
import Content from '@/components/content'
import { Post } from '@/payload-types'
import { queryPostBySlug } from '@/utils/api' 
import Image from 'next/image'
import { notFound } from 'next/navigation'

// (Optional) Next.js 13+ SEO metadata:
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post: Post | null = await queryPostBySlug({ slug: params.slug })
  if (!post) return {}

  return {
    title: post.title || 'Blog - roomnearme',
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: [post.featuredImage?.url || '/placeholder.jpg'],
      url: `https://roomsnearme.in/blogs/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: [post.featuredImage?.url || '/placeholder.jpg'],
    },
  }
}

interface Args {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Args) {
  const { slug } = params
  const post: Post | null = await queryPostBySlug({ slug })

  if (!post) return notFound()

  return (
    <div className="mt-16 min-h-screen max-w-7xl mx-auto pt-4 md:pt-4 p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.featuredImage?.url && (
        <section>
          <Image
            src={post.featuredImage.url}
            width={1000}
            height={600}
            alt={post.title}
            className="w-full max-h-[400px] object-cover object-center rounded-xl mb-6 shadow-md"
            priority
          />
        </section>
      )}

      <div className="prose prose-lg max-w-none text-gray-800">
        {/* You may use a rich text renderer here, e.g. @payloadcms/richtext-lexical */}
        {typeof post.content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : null}
      </div>

      {/* Optionally, add published date, author, etc */}
      <div className="mt-8 text-sm text-gray-500">
        Published: {post.createdAt && new Date(post.createdAt).toLocaleDateString()}
      </div>

      {/* post contents */}
      <div className='my-6'>
        <Content {...post} />
      </div>
    </div>
  )
}
