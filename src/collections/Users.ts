import { isAdmin } from '@/access'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // loginWithUsername: true,
  },
  access: {
    // Allow anyone to sign up (if you want public signup; otherwise restrict as needed)
    // create: () => true,

    // // Admins can read any user. Users can only read their own profile.
    // read: ({ req, id }) => {
    //   if (isAdmin({ req })) return true
    //   if (req.user && id) return req.user.id === id // Only allow self
    //   return false
    // },

    // // Admins can update any user. Users can only update their own profile.
    // update: ({ req, id }) => {
    //   if (isAdmin({ req })) return true
    //   if (req.user && id) return req.user.id === id // Only allow self
    //   return false
    // },

    // Only admins can delete users.
    // delete: isAdmin,
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
      label: 'Username',
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
    // {
    //   name: 'billing',
    //   type: 'group',
    //   label: 'Billing Information',
    //   access: { create: () => true },
    //   fields: [
    //     { name: 'billing_first_name', label: 'First Name', type: 'text' },
    //     { name: 'billing_last_name', label: 'Last Name', type: 'text' },
    //     { name: 'billing_company', label: 'Company Name', type: 'text' },
    //     { name: 'billing_address_1', label: 'Address Line 1', type: 'text' },
    //     { name: 'billing_address_2', label: 'Address Line 2', type: 'text' },
    //     { name: 'billing_city', label: 'City', type: 'text' },
    //     { name: 'billing_state', label: 'State/Province', type: 'text' },
    //     { name: 'billing_postcode', label: 'Postal Code', type: 'text' },
    //     { name: 'billing_country', label: 'Country', type: 'text' },
    //     { name: 'billing_email', label: 'Billing Email', type: 'email' },
    //     { name: 'billing_phone', label: 'Phone Number', type: 'text' },
    //   ],
    // },
    // {
    //   name: 'shipping',
    //   type: 'group',
    //   label: 'Shipping Information',
    //   access: { create: () => true },
    //   fields: [
    //     { name: 'shipping_first_name', label: 'First Name', type: 'text' },
    //     { name: 'shipping_last_name', label: 'Last Name', type: 'text' },
    //     { name: 'shipping_company', label: 'Company Name', type: 'text' },
    //     { name: 'shipping_address_1', label: 'Address Line 1', type: 'text' },
    //     { name: 'shipping_address_2', label: 'Address Line 2', type: 'text' },
    //     { name: 'shipping_city', label: 'City', type: 'text' },
    //     { name: 'shipping_state', label: 'State/Province', type: 'text' },
    //     { name: 'shipping_postcode', label: 'Postal Code', type: 'text' },
    //     { name: 'shipping_country', label: 'Country', type: 'text' },
    //   ],
    // },
  ],
}
