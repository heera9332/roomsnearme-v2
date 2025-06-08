import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  admin: {
    useAsTitle: 'reviewText',
    defaultColumns: ['room', 'user', 'rating', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms',
      required: true,
      label: 'Reviewed Room',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Reviewer',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      label: 'Rating (1-5)',
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
      label: 'Your Review',
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Review Images (optional)',
    },
    {
      name: 'likes',
      type: 'array',
      label: 'Likes',
      admin: { readOnly: true },
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'likedAt',
          type: 'date',
          defaultValue: () => new Date().toISOString(),
        },
      ],
    },
    {
      name: 'comments',
      type: 'array',
      label: 'Comments on Review',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          required: true,
        },
        {
          name: 'comment',
          type: 'textarea',
          required: true,
        },
        {
          name: 'createdAt',
          type: 'date',
          defaultValue: () => new Date().toISOString(),
          admin: { readOnly: true },
        },
      ],
    },
  ],
  timestamps: true,
}
