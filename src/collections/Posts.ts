import { isAdmin } from '@/access'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  access: {
    read: () => true,
    create: ({ req }) => isAdmin({ req }),
    update: ({ req }) => isAdmin({ req }),
    delete: ({ req }) => isAdmin({ req }),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      localized: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt',
      localized: true
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      localized: true
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Author',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      label: 'Published Date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Likes',
      type: 'number',
      name: 'likes',
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
