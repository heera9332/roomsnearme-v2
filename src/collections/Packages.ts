import type { CollectionConfig } from 'payload'
import slugify from 'slugify'
import { hasTenantRole, isPlatformAdmin, isTenantMember } from '@/access'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['tenant', 'name', 'price', 'discountPrice', 'durationDays', 'isPopular', 'status'],
  },
  access: {
    read: ({ req }) => {
      if (isPlatformAdmin({ req })) return true
      // Tenant members can read packages of their tenants
      return { tenant: { in: userTenantIds(req) } }
    },
    create: ({ req }) => isPlatformAdmin({ req }),
    update: ({ req, data, id }) => {
      if (isPlatformAdmin({ req })) return true
      // Allow tenant_admins of that tenant
      const tenantId = data?.tenant || req.payload.findByID({ collection: 'packages', id }).then((d: any) => d.tenant)
      return hasTenantRole(req, String(tenantId), 'tenant_admin')
    },
    delete: ({ req, id }) => isPlatformAdmin({ req }),
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'name', type: 'text', required: true, label: 'Plan Name' },
    { name: 'slug', type: 'text', required: true, unique: false, admin: { description: 'Unique within tenant' } },
    { name: 'tagline', type: 'text' },

    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', min: 0, required: true },
        { name: 'discountPrice', type: 'number', min: 0 },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'INR',
          options: [{ label: 'INR', value: 'INR' }, { label: 'USD', value: 'USD' }],
        },
      ],
    },

    { name: 'durationDays', type: 'number', required: true, defaultValue: 30, label: 'Validity (Days)' },

    {
      name: 'features',
      type: 'array',
      label: 'Features',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'included', type: 'checkbox', defaultValue: false },
      ],
    },

    { name: 'listingLimit', type: 'text', label: 'Room Listing Limit', defaultValue: 'Unlimited' },

    {
      type: 'row',
      fields: [
        { name: 'featuredListings', type: 'number', min: 0, defaultValue: 0 },
        { name: 'highlightListings', type: 'number', min: 0, defaultValue: 0 },
        { name: 'boostsPerListing', type: 'number', min: 0, defaultValue: 0 },
        { name: 'maxPhotosPerListing', type: 'number', min: 0, defaultValue: 10 },
      ],
    },

    {
      type: 'row',
      fields: [
        { name: 'isPopular', type: 'checkbox', defaultValue: false },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: ['active', 'inactive', 'archived'],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data?.name && !data?.slug) data.slug = slugify(data.name, { lower: true, strict: true })
        return data
      },
    ],
    afterValidate: [
      // ensure (tenant, slug) unique pair
      async ({ req, data, originalDoc }) => {
        const tenant = data?.tenant || originalDoc?.tenant
        const slug = data?.slug || originalDoc?.slug
        if (!tenant || !slug) return
        const existing = await req.payload.find({
          collection: 'packages',
          limit: 1,
          where: {
            and: [
              { tenant: { equals: String(tenant) } },
              { slug: { equals: slug } },
              { id: { not_equals: originalDoc?.id } },
            ],
          },
        })
        if (existing.docs.length) {
          throw new Error('Slug must be unique per tenant')
        }
      },
    ],
  },
  timestamps: true,
}
