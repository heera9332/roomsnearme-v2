import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: { useAsTitle: 'name' },
  access: {
    read: () => true,            // everyone can read tenants
    create: ({ req }) => req.user?.platformRoles?.includes('platform_admin'),
    update: ({ req }) => req.user?.platformRoles?.includes('platform_admin'),
    delete: ({ req }) => req.user?.platformRoles?.includes('platform_admin'),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'status', type: 'select', defaultValue: 'active', options: ['active', 'inactive'] },
  ],
  timestamps: true,
}
