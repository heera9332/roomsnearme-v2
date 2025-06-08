import type { CollectionConfig } from 'payload';
import { isAdmin, isVendor, isLoggedIn } from '@/access'; // Custom access control functions

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingCode',
    defaultColumns: ['bookingCode', 'user', 'vendor', 'status'],
  },
  access: {
    read: isLoggedIn,
    create: isLoggedIn,
    update: ({ req }) => isAdmin(req) || isVendor(req),
    delete: isAdmin,
  },
  fields: [
    {
      name: 'bookingCode',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: () => `BK-${Date.now()}`,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Booked By',
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Vendor',
    },
    {
      name: 'room',
      type: 'relationship',
      relationTo: 'rooms', // or 'services' or 'products'
      required: true,
    },
    {
      name: 'bookingDate',
      type: 'date',
      required: true,
    },
    {
      name: 'bookingTime',
      type: 'text',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'unpaid',
    },
  ],
  timestamps: true,
};
