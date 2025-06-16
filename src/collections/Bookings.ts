import type { CollectionConfig } from 'payload'
import { isAdmin, isVendor, isLoggedIn } from '@/access'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingCode',
    defaultColumns: ['bookingCode', 'user', 'vendor', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
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
      label: 'Booked By',
      required: false,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'room',
          type: 'relationship',
          relationTo: 'rooms',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'checkInDate',
          type: 'date',
          required: true,
        },
        {
          name: 'checkOutDate',
          type: 'date',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'meta',
          type: 'json',
        },
      ],
    },
    {
      name: 'billing',
      type: 'group',
      fields: [
        { name: 'first_name', type: 'text' },
        { name: 'last_name', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'address_1', type: 'text' },
        { name: 'address_2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postcode', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      fields: [
        { name: 'first_name', type: 'text' },
        { name: 'last_name', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'address_1', type: 'text' },
        { name: 'address_2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postcode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'taxAmount',
      type: 'number',
    },
    {
      name: 'totalAmount',
      type: 'number',
    },
    {
      name: 'paymentMethod',
      type: 'text',
    },
    {
      name: 'paymentMethodTitle',
      type: 'text',
    },
    {
      name: 'transactionId',
      type: 'number',
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Vendor',
      admin: {
        position: 'sidebar',
      },
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'array',
      fields: [{ name: 'note', type: 'textarea' }],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // Only act on create
        if (operation !== 'create') return data

        const payload = await getPayload({ config: configPromise })
        try {
          let userId = data.user
          const billing = data.billing || {}

          const bookingEmail = billing?.email || data?.email
          const username = billing?.phone || data?.phone || data?.username

          if (!userId && bookingEmail && username) {
            const users = await payload.find({
              collection: 'users',
              where: {
                email: { equals: bookingEmail },
              },
              limit: 1,
            })

            if (users.docs?.length) {
              userId = users.docs[0].id
            } else {
              const newUser = await payload.create({
                collection: 'users',
                data: {
                  email: bookingEmail,
                  username,
                  password: username,
                  name:
                    billing?.first_name || billing?.last_name
                      ? `${billing.first_name || ''} ${billing.last_name || ''}`.trim()
                      : username,
                  roles: ['customer'],
                },
                disableVerificationEmail: true,
              })
              userId = newUser.id
            }
          }

          if (userId) {
            data.user = userId
          }
        } catch (err) {
          // Payload v3: throw error to abort save with custom message
          throw new Error(
            'Error processing user creation for booking: ' +
              (err instanceof Error ? err.message : String(err)),
          )
        }

        return data
      },
    ],
  },
  timestamps: true,
}
