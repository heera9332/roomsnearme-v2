import type { CollectionConfig } from 'payload'
import { isAdmin, isVendor } from '@/access'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'city', 'type', 'pricePerMonth'],
  },
  access: {
    read: () => true,
    create: ({ req }) => {
      return isAdmin({ req }) || isVendor({ req })
    },
    update: ({ req }) => {
      return isAdmin({ req }) || isVendor({ req })
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Room Title',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Posted By',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Room Type',
      options: [
        { label: '1 RK', value: '1rk' },
        { label: '1 BHK', value: '1bhk' },
        { label: '2 BHK', value: '2bhk' },
        { label: '3 BHK', value: '3bhk' },
        { label: 'PG (Male)', value: 'pg_male' },
        { label: 'PG (Female)', value: 'pg_female' },
        { label: 'Hostel', value: 'hostel' },
        { label: 'Shared Room', value: 'shared' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'other',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pricePerMonth',
      type: 'number',
      required: true,
      label: 'Rent per Month (₹)',
    },
    {
      name: 'availableFrom',
      type: 'date',
      label: 'Available From',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'city',
      type: 'select',
      options: [
        { label: 'Sagar', value: 'sagar' },
        { label: 'Damoh', value: 'damoh' },
        { label: 'Bhopal', value: 'bhopal' },
        { label: 'Indore', value: 'indore' },
        { label: 'Bina', value: 'bina' },
        { label: 'Jabalpur', value: 'jabalpur' },
      ],
      required: true,
    },
    {
      name: 'state',
      type: 'select',
      required: true,
      options: [
        { label: 'MP', value: 'mp' },
        { label: 'UP', value: 'up' },
      ],
    },
    {
      name: 'area',
      type: 'text',
      label: 'Locality / Area',
    },
    {
      name: 'furnishing',
      type: 'select',
      label: 'Furnishing',
      options: [
        { label: 'Unfurnished', value: 'unfurnished' },
        { label: 'Semi-Furnished', value: 'semi' },
        { label: 'Fully Furnished', value: 'furnished' },
      ],
    },
    {
      name: 'maxAllowedMembers',
      type: 'number',
      required: false,
      label: 'Maximum Allowed Occupants',
    },
    {
      name: 'googleMapLink',
      type: 'text',
      required: false,
      label: 'Google Maps Link',
    },
    {
      name: 'googleMapEmbed',
      type: 'textarea',
      required: false,
      label: 'Google Maps Embed Code',
      admin: {
        description: 'Paste iframe embed code from Google Maps',
      },
    },
    {
      name: 'amenities',
      type: 'array',
      label: 'Amenities',
      fields: [
        {
          name: 'amenity',
          type: 'text',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Booked', value: 'booked' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'reviews',
      relationTo: 'reviews',
      type: 'relationship',
    },
  ],
  versions: {
    drafts: true,
  },
  timestamps: true,
}
