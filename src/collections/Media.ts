import { isAdmin, isVendor } from '@/access'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    update: ({ req }) => isAdmin({ req }) || isVendor({ req }),
    delete: ({ req }) => isAdmin({ req }),
    create: ({ req }) => isAdmin({ req }) || isVendor({ req }),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      defaultValue: 'rooms near me',
    },
  ],
  // upload: true,
}
