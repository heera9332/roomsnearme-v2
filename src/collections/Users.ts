import { isAdmin } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    loginWithUsername: true,
  },
  access: {
    // Allow anyone to sign up (if you want public signup; otherwise restrict as needed)
    create: () => true,

    // Admins can read any user. Users can only read their own profile.
    read: ({ req, id }) => {
      if (isAdmin({ req })) return true
      if (req.user && id) return req.user.id === id // Only allow self
      return false
    },

    // Admins can update any user. Users can only update their own profile.
    update: ({ req, id }) => {
      if (isAdmin({ req })) return true
      if (req.user && id) return req.user.id === id // Only allow self
      return false
    },

    // Only admins can delete users.
    delete: isAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'username'],
    useAsTitle: 'name',
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'username',
      type: 'text',
      label: 'Mobile',
      unique: true,
      required: true,
    },
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      options: ['customer', 'vendor', 'admin'],
      defaultValue: 'customer',
      hasMany: true,
    },
    {
      name: 'billing',
      type: 'group',
      label: 'Billing Information',
      fields: [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'company', label: 'Company Name', type: 'text' },
        { name: 'address_1', label: 'Address Line 1', type: 'text' },
        { name: 'address_2', label: 'Address Line 2', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'state', label: 'State/Province', type: 'text' },
        { name: 'postcode', label: 'Postal Code', type: 'text' },
        { name: 'country', label: 'Country', type: 'text' },
        { name: 'email', label: 'Billing Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      label: 'Shipping Information',
      fields: [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'company', label: 'Company Name', type: 'text' },
        { name: 'address_1', label: 'Address Line 1', type: 'text' },
        { name: 'address_2', label: 'Address Line 2', type: 'text' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'state', label: 'State/Province', type: 'text' },
        { name: 'postcode', label: 'Postal Code', type: 'text' },
        { name: 'country', label: 'Country', type: 'text' },
      ],
    },
  ],
}
